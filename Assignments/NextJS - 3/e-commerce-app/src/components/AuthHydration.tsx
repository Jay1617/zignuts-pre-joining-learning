// src/components/AuthHydration.tsx
"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreState } from "../store/slices/authSlice";

const LS_KEY = "ecom_auth";

export default function AuthHydration() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const authState = JSON.parse(raw);
        dispatch(restoreState(authState));
      }
    } catch (error) {
      console.error("Failed to restore auth state:", error);
    }
  }, [dispatch]);

  return null; // This component doesn't render anything
}
