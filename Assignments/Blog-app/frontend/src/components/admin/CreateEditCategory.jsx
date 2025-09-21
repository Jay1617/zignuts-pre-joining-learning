import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FiSave, FiTag } from "react-icons/fi";

const CreateEditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      fetchCategory();
    }
  }, [id, isEdit]);

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/admin/category/${id}`,
        { withCredentials: true }
      );
      setFormData({
        name: data.category.name || "",
      });
    } catch (error) {
      console.error("Error fetching category:", error);
      setError("Failed to fetch category. Please try again.");
      toast.error("Failed to fetch category");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEdit 
        ? `http://localhost:4000/api/v1/admin/category/${id}`
        : 'http://localhost:4000/api/v1/admin/category';

      const method = isEdit ? 'put' : 'post';

      await axios[method](url, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success(isEdit ? "Category updated successfully!" : "Category created successfully!");
      navigate("/dashboard/categories");
    } catch (error) {
      console.error("Error saving category:", error);
      setError("Failed to save category. Please try again.");
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Category" : "Create New Category"}
        </h1>
        <p className="text-gray-600">
          {isEdit ? "Update category information" : "Create a new category for your blogs"}
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="text-red-500 text-xl mr-3">⚠️</div>
            <div>
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="category-name" className="block text-sm font-medium text-gray-700 mb-2">
              Category Name *
            </label>
            <input
              id="category-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter category name"
              aria-describedby="category-name-help"
            />
            <p id="category-name-help" className="text-sm text-gray-500 mt-2">
              The slug will be automatically generated from the name
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/dashboard/categories")}
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <FiSave className="mr-2" />
              )}
              {loading ? "Saving..." : isEdit ? "Update Category" : "Create Category"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEditCategory;


