import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiEdit, FiTrash2, FiPlus, FiEye, FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/admin/blogs",
          { withCredentials: true }
        );
        setBlogs(data.blogs);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(
          `http://localhost:4000/api/v1/admin/blog/${blogId}`,
          { withCredentials: true }
        );
        setBlogs(blogs.filter(blog => blog._id !== blogId));
        toast.success("Blog deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete blog");
      }
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Blogs</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">All Blogs</h1>
        <Link
          to="/dashboard/blogs/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center"
        >
          <FiPlus className="mr-2" />
          Add New Blog
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="relative">
          <label htmlFor="blog-search" className="sr-only">Search blogs</label>
          <input
            id="blog-search"
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search blogs by title or description"
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" aria-hidden="true" />
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200" role="table" aria-label="Blogs list">
            <thead className="bg-gray-50">
              <tr role="row">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell" scope="col">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell" scope="col">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell" scope="col">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBlogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50" role="row">
                  <td className="px-3 sm:px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={blog.thumbnail?.url || '/placeholder-blog.jpg'}
                        alt={blog.title}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg mr-3 sm:mr-4"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                          {blog.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-2 hidden sm:block">
                          {blog.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {blog.category?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      blog.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="flex items-center">
                      <img
                        src={blog.authorAvatar || '/user.jpg'}
                        alt={blog.authorName}
                        className="w-8 h-8 rounded-full object-cover mr-3"
                      />
                      <span className="text-sm text-gray-900">{blog.authorName}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                    {formatDate(blog.createdOn)}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-1 sm:space-x-2">
                      <Link
                        to={`/blog/${blog.slug}`}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-900 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                        title="View Blog"
                        aria-label={`View blog: ${blog.title}`}
                      >
                        <FiEye className="text-lg" aria-hidden="true" />
                      </Link>
                      <Link
                        to={`/dashboard/blogs/edit/${blog._id}`}
                        className="text-green-600 hover:text-green-900 p-1 focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                        title="Edit Blog"
                        aria-label={`Edit blog: ${blog.title}`}
                      >
                        <FiEdit className="text-lg" aria-hidden="true" />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-600 hover:text-red-900 p-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                        title="Delete Blog"
                        aria-label={`Delete blog: ${blog.title}`}
                      >
                        <FiTrash2 className="text-lg" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? "Try adjusting your search criteria" : "Get started by creating your first blog"}
            </p>
            {!searchTerm && (
              <Link
                to="/dashboard/blogs/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiPlus className="mr-2" />
                Create Your First Blog
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;


