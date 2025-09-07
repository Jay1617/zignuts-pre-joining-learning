// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = { id: number; name: string; email: string };

type AuthState = {
  user: User | null;
  token: string | null;
};

const LS_KEY = "ecom_auth";

const initialState: AuthState = { user: null, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (typeof window !== "undefined") {
        localStorage.setItem(LS_KEY, JSON.stringify(state));
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem(LS_KEY);
      }
    },
    updateProfile(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        if (typeof window !== "undefined") {
          localStorage.setItem(LS_KEY, JSON.stringify(state));
        }
      }
    },
    restoreState(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    }
  }
});

export const { loginSuccess, logout, updateProfile, restoreState } = authSlice.actions;
export default authSlice.reducer;
