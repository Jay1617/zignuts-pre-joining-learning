// app/dashboard/page.tsx
"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import ProtectedClient from "../../components/ProtectedClient";
import { logout, updateProfile } from "../../store/slices/authSlice";
import { useState } from "react";
import { User, Edit3, Save, X, LogOut, Mail, Phone, MapPin } from "lucide-react";

export default function DashboardPage() {
  return (
    <ProtectedClient>
      <DashboardContent />
    </ProtectedClient>
  );
}

function DashboardContent() {
  const user = useSelector((s: RootState) => s.auth.user)!;
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    dispatch(updateProfile({ name }));
    setEditing(false);
  };

  const handleCancel = () => {
    setName(user.name);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Profile Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Profile Information</span>
                </h2>
              </div>

              <div className="space-y-6">
                {/* Name Field */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Full Name</p>
                      {editing ? (
                        <input 
                          value={name} 
                          onChange={e => setName(e.target.value)} 
                          className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{user.name}</p>
                      )}
                    </div>
                  </div>
                  
                  {editing ? (
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={handleSave} 
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors duration-200"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={handleCancel} 
                        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setEditing(true)} 
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Email Field */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email Address</p>
                    <p className="text-gray-900 font-medium">{user.email}</p>
                  </div>
                </div>

                {/* Additional Fields (Mock) */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone Number</p>
                    <p className="text-gray-900 font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Address</p>
                    <p className="text-gray-900 font-medium">123 Main St, City, State 12345</p>
                  </div>
                </div>
              </div>
            {/* Logout Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <button 
                onClick={() => dispatch(logout())} 
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Removed mock sections and change password to keep dashboard minimal