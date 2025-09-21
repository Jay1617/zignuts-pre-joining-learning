import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FiHome, 
  FiFileText, 
  FiTag, 
  FiMenu, 
  FiX,
  FiLogOut,
  FiUser
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { useContext } from "react";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setIsAuthenticated, setUser } = useContext(Context);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser({});
    navigate("/");
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: FiHome },
    { name: "Blogs", href: "/dashboard/blogs", icon: FiFileText },
    { name: "Categories", href: "/dashboard/categories", icon: FiTag },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
              aria-label="Close sidebar"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* User info */}
          <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FiUser className="text-blue-600 text-lg" />
              </div>
              <div className="ml-3 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || 'Admin'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || 'admin@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation - Flexible area */}
          <nav className="flex-1 px-3 py-6 overflow-y-auto" role="navigation" aria-label="Admin navigation">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isActive(item.href)
                        ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    <Icon className="mr-3 text-lg flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Logout button - Fixed at bottom */}
          <div className="p-6 border-t border-gray-200 flex-shrink-0">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Logout from admin panel"
            >
              <FiLogOut className="mr-3 text-lg flex-shrink-0" aria-hidden="true" />
              <span className="truncate">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1 mr-4"
                aria-label="Open sidebar"
              >
                <FiMenu className="text-xl" />
              </button>
            </div>

            {/* Optional: Add user info or actions here */}
            <div className="flex items-center space-x-4">
              {/* You can add additional header actions here */}
            </div>
          </div>
        </div>

        {/* Page content - Scrollable */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;