import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, Link } from "react-router-dom";
import { Context } from "../../main";
import { FiUpload, FiSave, FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";

const UpdateBlog = () => {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [intro, setIntro] = useState("");
  const [paraOneTitle, setParaOneTitle] = useState("");
  const [paraOneImage, setParaOneImage] = useState("");
  const [paraOneDescription, setParaOneDescription] = useState("");
  const [paraTwoTitle, setParaTwoTitle] = useState("");
  const [paraTwoImage, setParaTwoImage] = useState("");
  const [paraTwoDescription, setParaTwoDescription] = useState("");
  const [paraThreeTitle, setParaThreeTitle] = useState("");
  const [paraThreeImage, setParaThreeImage] = useState("");
  const [paraThreeDescription, setParaThreeDescription] = useState("");
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [paraOneImagePreview, setParaOneImagePreview] = useState("");
  const [paraTwoImagePreview, setParaTwoImagePreview] = useState("");
  const [paraThreeImagePreview, setParaThreeImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/blog/singleblog/${id}`,
          { withCredentials: true }
        );
        setTitle(data.blog.title);
        setIntro(data.blog.intro);
        setCategory(data.blog.category);
        setPublished(data.blog.published);
        setMainImage(data.blog.mainImage.url);
        setParaOneTitle(data.blog.paraOneTitle);
        setParaOneDescription(data.blog.paraOneDescription);
        data.blog.paraOneImage && setParaOneImage(data.blog.paraOneImage.url);
        setParaTwoTitle(data.blog.paraTwoTitle);
        setParaTwoDescription(data.blog.paraTwoDescription);
        data.blog.paraTwoImage && setParaTwoImage(data.blog.paraTwoImage.url);
        setParaThreeTitle(data.blog.paraThreeTitle);
        setParaThreeDescription(data.blog.paraThreeDescription);
        data.blog.paraThreeImage &&
          setParaThreeImage(data.blog.paraThreeImage.url);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch blog data");
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedBlog = new FormData();
    updatedBlog.append("title", title);
    updatedBlog.append("intro", intro);
    updatedBlog.append("category", category);
    updatedBlog.append("published", published);
    updatedBlog.append("mainImage", mainImage);
    
    if (paraOneTitle && paraOneTitle.length !== 0) {
      updatedBlog.append("paraOneTitle", paraOneTitle);
    } else {
      updatedBlog.append("paraOneTitle", "");
    }
    if (paraOneDescription && paraOneDescription.length !== 0) {
      updatedBlog.append("paraOneDescription", paraOneDescription);
    } else {
      updatedBlog.append("paraOneDescription", "");
    }
    if (paraOneImage) {
      updatedBlog.append("paraOneImage", paraOneImage);
    }
    if (paraTwoTitle && paraTwoTitle.length !== 0) {
      updatedBlog.append("paraTwoTitle", paraTwoTitle);
    } else {
      updatedBlog.append("paraTwoTitle", "");
    }
    if (paraTwoDescription && paraTwoDescription.length !== 0) {
      updatedBlog.append("paraTwoDescription", paraTwoDescription);
    } else {
      updatedBlog.append("paraTwoDescription", "");
    }
    if (paraTwoImage) {
      updatedBlog.append("paraTwoImage", paraTwoImage);
    }
    if (paraThreeTitle && paraThreeTitle.length !== 0) {
      updatedBlog.append("paraThreeTitle", paraThreeTitle);
    } else {
      updatedBlog.append("paraThreeTitle", "");
    }
    if (paraThreeDescription && paraThreeDescription.length !== 0) {
      updatedBlog.append("paraThreeDescription", paraThreeDescription);
    } else {
      updatedBlog.append("paraThreeDescription", "");
    }
    if (paraThreeImage) {
      updatedBlog.append("paraThreeImage", paraThreeImage);
    }

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/blog/update/${id}`,
        updatedBlog,
        { withCredentials: true }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const mainImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setMainImagePreview(reader.result);
      setMainImage(file);
    };
  };
  
  const paraOneImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaOneImagePreview(reader.result);
      setParaOneImage(file);
    };
  };
  
  const paraTwoImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaTwoImagePreview(reader.result);
      setParaTwoImage(file);
    };
  };
  
  const paraThreeImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaThreeImagePreview(reader.result);
      setParaThreeImage(file);
    };
  };

  const ImageUploadSection = ({ 
    label, 
    currentImage, 
    previewImage, 
    onImageChange, 
    placeholder = "/imgPL.webp" 
  }) => (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative group">
        <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-blue-400 transition-colors">
          <img
            src={previewImage || currentImage || placeholder}
            alt={label}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <FiUpload className="text-white text-2xl" />
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard/blogs"
                className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FiArrowLeft className="mr-2" />
                Back to Blogs
              </Link>
              <div className="h-6 border-l border-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-800">Update Blog</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                {published ? (
                  <>
                    <FiEye className="text-green-500" />
                    <span>Published</span>
                  </>
                ) : (
                  <>
                    <FiEyeOff className="text-gray-400" />
                    <span>Draft</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleUpdate} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Blog Category</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Technology">Technology</option>
                  <option value="Sports">Sports</option>
                  <option value="Travel">Travel</option>
                  <option value="Business">Business</option>
                  <option value="Economy">Economy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Publication Status
                </label>
                <select
                  value={published === null ? "" : published}
                  onChange={(e) => setPublished(e.target.value === "true")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={true}>Published</option>
                  <option value={false}>Draft</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Blog Title
              </label>
              <input
                type="text"
                placeholder="Enter your blog title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                required
              />
            </div>
          </div>

          {/* Main Image */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <ImageUploadSection
              label="Featured Image"
              currentImage={mainImage}
              previewImage={mainImagePreview}
              onImageChange={mainImagePreviewHandler}
            />
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Introduction</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Blog Introduction
              </label>
              <textarea
                rows="8"
                placeholder="Write your blog introduction here... (Minimum 250 characters required)"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
              <div className="mt-2 text-sm text-gray-500">
                {intro.length}/250 characters minimum
              </div>
            </div>
          </div>

          {/* Paragraph Sections */}
          {[
            {
              title: paraOneTitle,
              setTitle: setParaOneTitle,
              description: paraOneDescription,
              setDescription: setParaOneDescription,
              image: paraOneImage,
              preview: paraOneImagePreview,
              handler: paraOneImagePreviewHandler,
              sectionNumber: "First"
            },
            {
              title: paraTwoTitle,
              setTitle: setParaTwoTitle,
              description: paraTwoDescription,
              setDescription: setParaTwoDescription,
              image: paraTwoImage,
              preview: paraTwoImagePreview,
              handler: paraTwoImagePreviewHandler,
              sectionNumber: "Second"
            },
            {
              title: paraThreeTitle,
              setTitle: setParaThreeTitle,
              description: paraThreeDescription,
              setDescription: setParaThreeDescription,
              image: paraThreeImage,
              preview: paraThreeImagePreview,
              handler: paraThreeImagePreviewHandler,
              sectionNumber: "Third"
            }
          ].map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                {section.sectionNumber} Paragraph (Optional)
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    placeholder={`${section.sectionNumber} paragraph title`}
                    value={section.title || ""}
                    onChange={(e) => section.setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <ImageUploadSection
                  label={`${section.sectionNumber} Paragraph Image`}
                  currentImage={section.image}
                  previewImage={section.preview}
                  onImageChange={section.handler}
                />

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Section Content
                  </label>
                  <textarea
                    rows="6"
                    placeholder={`${section.sectionNumber} paragraph content goes here...`}
                    value={section.description || ""}
                    onChange={(e) => section.setDescription(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <Link
              to="/dashboard/blogs"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Update Blog
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;