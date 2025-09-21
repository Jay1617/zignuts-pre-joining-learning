import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FiUpload, FiX, FiSave } from "react-icons/fi";

const CreateEditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    published: false,
    publishDate: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchingBlog, setFetchingBlog] = useState(false);
  const [files, setFiles] = useState({
    thumbnail: null,
    featuredImage: null,
    existingThumbnail: null,
    existingFeaturedImage: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/admin/categories",
          { withCredentials: true }
        );
        setCategories(data.categories);
        setError(null);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories. Please try again.");
      }
    };

    fetchCategories();

    if (isEdit) {
      fetchBlog();
    }
  }, [id, isEdit]);

  const fetchBlog = async () => {
    setFetchingBlog(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/blog/singleblog/${id}`,
        { withCredentials: true }
      );
      const blog = data.blog;
      setFormData({
        title: blog.title || "",
        description: blog.description || "",
        content: blog.content || "",
        category: blog.category?._id || blog.category || "",
        published: blog.published || false,
        publishDate: blog.publishDate ? new Date(blog.publishDate).toISOString().split('T')[0] : "",
      });
      
      // Set existing images if they exist
      if (blog.thumbnail?.url) {
        setFiles(prev => ({
          ...prev,
          existingThumbnail: blog.thumbnail.url
        }));
      }
      if (blog.featuredImage?.url) {
        setFiles(prev => ({
          ...prev,
          existingFeaturedImage: blog.featuredImage.url
        }));
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      const errorMessage = error.response?.data?.message || "Failed to fetch blog. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setFetchingBlog(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles(prev => ({
      ...prev,
      [name]: files[0] || null
    }));
  };

  const removeFile = (fileType) => {
    setFiles(prev => ({
      ...prev,
      [fileType]: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      
      // Add form data
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      // Add files only if new files are selected
      if (files.thumbnail) {
        submitData.append('thumbnail', files.thumbnail);
      }
      if (files.featuredImage) {
        submitData.append('featuredImage', files.featuredImage);
      }
      
      // For updates, if no new files are provided, the existing files will be kept
      // The backend will handle this appropriately

      const url = isEdit 
        ? `http://localhost:4000/api/v1/admin/blog/${id}`
        : 'http://localhost:4000/api/v1/admin/blog';

      const method = isEdit ? 'put' : 'post';

      await axios[method](url, submitData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(isEdit ? "Blog updated successfully!" : "Blog created successfully!");
      navigate("/dashboard/blogs");
    } catch (error) {
      console.error("Error saving blog:", error);
      setError("Failed to save blog. Please try again.");
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while fetching blog data
  if (isEdit && fetchingBlog) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Blog" : "Create New Blog"}
        </h1>
        <p className="text-gray-600">
          {isEdit ? "Update your blog post" : "Create a new blog post for your readers"}
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="text-red-500 text-xl mr-3">⚠️</div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              {isEdit && (
                <button
                  onClick={fetchBlog}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Try again
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="blog-title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                id="blog-title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter blog title"
                aria-describedby="title-help"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="blog-description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="blog-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter blog description"
                aria-describedby="description-help"
              />
            </div>

            <div className="md:col-span-1">
              <label htmlFor="blog-category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="blog-category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-describedby="category-help"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-1">
              <label htmlFor="blog-publish-date" className="block text-sm font-medium text-gray-700 mb-2">
                Publish Date
              </label>
              <input
                id="blog-publish-date"
                type="date"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-describedby="publish-date-help"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content</h2>
          
          <div>
            <label htmlFor="blog-content" className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              id="blog-content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={15}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Write your blog content here..."
              aria-describedby="content-help"
            />
            <p id="content-help" className="text-sm text-gray-500 mt-2">
              You can use HTML tags for formatting
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Images</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail Image *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {files.thumbnail ? (
                  <div className="space-y-2">
                    <img
                      src={URL.createObjectURL(files.thumbnail)}
                      alt="Thumbnail preview"
                      className="w-full h-32 object-cover rounded-lg mx-auto"
                    />
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm text-gray-600">{files.thumbnail.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile('thumbnail')}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiX className="text-lg" />
                      </button>
                    </div>
                  </div>
                ) : files.existingThumbnail ? (
                  <div className="space-y-2">
                    <img
                      src={files.existingThumbnail}
                      alt="Current thumbnail"
                      className="w-full h-32 object-cover rounded-lg mx-auto"
                    />
                    <p className="text-sm text-gray-600">Current thumbnail</p>
                    <input
                      type="file"
                      name="thumbnail"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    <label
                      htmlFor="thumbnail-upload"
                      className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Replace Thumbnail
                    </label>
                  </div>
                ) : (
                  <div>
                    <FiUpload className="text-4xl text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Click to upload thumbnail</p>
                    <input
                      type="file"
                      name="thumbnail"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    <label
                      htmlFor="thumbnail-upload"
                      className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {files.featuredImage ? (
                  <div className="space-y-2">
                    <img
                      src={URL.createObjectURL(files.featuredImage)}
                      alt="Featured image preview"
                      className="w-full h-32 object-cover rounded-lg mx-auto"
                    />
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm text-gray-600">{files.featuredImage.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile('featuredImage')}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiX className="text-lg" />
                      </button>
                    </div>
                  </div>
                ) : files.existingFeaturedImage ? (
                  <div className="space-y-2">
                    <img
                      src={files.existingFeaturedImage}
                      alt="Current featured image"
                      className="w-full h-32 object-cover rounded-lg mx-auto"
                    />
                    <p className="text-sm text-gray-600">Current featured image</p>
                    <input
                      type="file"
                      name="featuredImage"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="featured-upload"
                    />
                    <label
                      htmlFor="featured-upload"
                      className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Replace Featured Image
                    </label>
                  </div>
                ) : (
                  <div>
                    <FiUpload className="text-4xl text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Click to upload featured image</p>
                    <input
                      type="file"
                      name="featuredImage"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="featured-upload"
                    />
                    <label
                      htmlFor="featured-upload"
                      className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Publishing</h2>
          
          <div className="flex items-center">
            <input
              id="blog-published"
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="blog-published" className="ml-2 text-sm text-gray-700">
              Publish this blog post
            </label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/blogs")}
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
            {loading ? "Saving..." : isEdit ? "Update Blog" : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditBlog;


