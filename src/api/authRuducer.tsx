import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  role: string | null;
  user: any;
}


const initialState: AuthState = {
  token: localStorage.getItem("authToken"),
  isAuthenticated: !!localStorage.getItem("authToken"),
  role: localStorage.getItem("role"),
  user: (() => {
    const user = localStorage.getItem("user");
    try {
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
      return null;
    }}
  )
  
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Set the authentication token and log the user in.
     * 
     * @param {string} token The authentication token.
     */
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("authToken", action.payload);
      localStorage.setItem("role", action.payload);
    },
   
    /**
     * Log the user out.
     * 
     * Removes the authentication token from state and localStorage, and sets
     * isAuthenticated to false.
     */
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("authToken");
    },

    setUser: (state, action: PayloadAction<{ user: AuthState["user"] }>) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
  },
});

export const { setToken, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
