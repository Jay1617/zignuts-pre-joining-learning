import React, { useContext } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { Context } from "../../main";
import { 
  AdminLayout, 
  AdminDashboard, 
  AdminBlogs, 
  CreateEditBlog, 
  AdminCategories, 
  CreateEditCategory 
} from "../admin";

const Dashboard = () => {
  const { isAuthenticated, user, isLoading } = useContext(Context);

  // Show loading while authentication is being checked
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/blogs" element={<AdminBlogs />} />
        <Route path="/blogs/new" element={<CreateEditBlog />} />
        <Route path="/blogs/edit/:id" element={<CreateEditBlog />} />
        <Route path="/categories" element={<AdminCategories />} />
        <Route path="/categories/new" element={<CreateEditCategory />} />
        <Route path="/categories/edit/:id" element={<CreateEditCategory />} />
      </Routes>
    </AdminLayout>
  );
};

export default Dashboard;