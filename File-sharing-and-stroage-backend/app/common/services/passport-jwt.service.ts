import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import createError from "http-errors";
import * as userService from "../../user/user.service";
import { type Request } from "express";
import { type IUser } from "../../user/user.dto";
import { refreshAccessToken } from "../../user/user.controller";

/**
 * Compares a plain text password with a hashed password to check if they match.
 * @param {string} value - The plain text password to validate.
 * @param {string} password - The hashed password to compare against.
 * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, otherwise false.
 */

const isValidPassword = async function (value: string, password: string) {
  const compare = await bcrypt.compare(value, password);
  return compare;
};

export const initPassport = (): void => {
  passport.use(
    new Strategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token: { user: Request["user"] }, done) => {
        try {
          done(null, token.user);
        } catch (error) {
          done(error);
        }
      },
    ),
  );

  // user login
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await userService.getUserByEmail(email);
          if (user == null) {
            done(createError(401, "User not found!"), false);
            return;
          }

          if (!user.active) {
            done(createError(401, "User is inactive"), false);
            return;
          }

          // if (user.blocked) {
          //   done(createError(401, "User is blocked, Contact to admin"), false);
          //   return;
          // }

          const validate = await isValidPassword(password, user.password);
          if (!validate) {
            done(createError(401, "Invalid email or password"), false);
            return;
          }
          const { password: _p, ...result } = user;
          done(null, result, { message: "Logged in Successfully" });
        } catch (error: any) {
          done(createError(500, error.message));
        }
      },
    ),
  );
};

export const createUserTokens = (user: Omit<IUser, "password">) => {
  const jwtSecret = process.env.JWT_SECRET ?? "";
  const token = jwt.sign(user, jwtSecret);
  return { accessToken: token, refreshToken: refreshAccessToken };
};

export const decodeToken = (token: string) => {
  // const jwtSecret = process.env.JWT_SECRET ?? "";
  const decode = jwt.decode(token);
  return decode as IUser;
};
