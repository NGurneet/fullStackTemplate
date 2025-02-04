// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { AppDataSource } from "../config/database";
// import { user } from "./user.schema";
// import { sendResetEmail } from "../utils/email.utils";

// const userRepository = AppDataSource.getRepository(User);

// export const forgotPassword = async (email: string): Promise<string> => {
//   const user = await userRepository.findOne({ where: { email } });
//   if (!user) throw new Error("User not found");

//   // Generate reset token (valid for 1 hour)
//   const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
//     expiresIn: "1h",
//   });

//   // Save token & expiry in the database
//   user.resetToken = resetToken;
//   user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
//   await userRepository.save(user);

//   // Send reset email
//   await sendResetEmail(email, resetToken);

//   return "Password reset link sent";
// };
