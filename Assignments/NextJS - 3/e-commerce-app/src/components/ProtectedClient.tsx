// src/components/ProtectedClient.tsx
"use client";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";
import { Shield, AlertCircle, ArrowRight } from "lucide-react";

export default function ProtectedClient({ children }: { children: ReactNode }) {
  const user = useSelector((s: RootState) => s.auth.user);
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showUnauthorized, setShowUnauthorized] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsRedirecting(true);
      const timer = setTimeout(() => {
        setShowUnauthorized(true);
        router.push("/login");
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [user, router]);

  if (!user && !isRedirecting) {
    return null;
  }

  if (!user && isRedirecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {!showUnauthorized ? (
            // Loading State
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Verifying Access
              </h2>
              <p className="text-gray-600 mb-6">
                Please wait while we check your authentication...
              </p>
              <div className="flex justify-center">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          ) : (
            // Unauthorized State
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Access Restricted
              </h2>
              <p className="text-gray-600 mb-6">
                You need to be logged in to access this page. Redirecting you to login...
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Authentication Required</span>
                </div>
              </div>
              <button
                onClick={() => router.push("/login")}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Go to Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}