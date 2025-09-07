// app/layout.tsx
"use client";
import "./globals.css";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { store } from "../store/store";
import { queryClient } from "../lib/queryClient";
import Header from "../components/Header";
import AuthHydration from "../components/AuthHydration";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <AuthHydration />
            <Header />
            <main className="container mx-auto p-4">{children}</main>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
