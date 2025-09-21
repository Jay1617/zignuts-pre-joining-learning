import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FiCalendar, FiUser, FiArrowLeft, FiShare2, FiHeart } from "react-icons/fi";

const SingleBlog = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const getSingleBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/public/blog/${slug}`
        );
        setBlog(data.blog);
        
        // Fetch related blogs
        if (data.blog.category) {
          const relatedResponse = await axios.get(
            `http://localhost:4000/api/v1/public/related?blogId=${data.blog._id}&categoryId=${data.blog.category._id}`
          );
          setRelatedBlogs(relatedResponse.data.blogs);
        }
        
        setLoading(false);
      } catch (error) {
        setError("Blog not found");
        setLoading(false);
      }
    };
    getSingleBlog();
  }, [slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-8">The blog you're looking for doesn't exist.</p>
          <Link
            to="/blogs"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/blogs"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <FiArrowLeft className="mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>

      {/* Blog Content */}
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Blog Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {blog.category?.name || 'Uncategorized'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {blog.description}
            </p>
            
            {/* Author Info */}
            <div className="flex items-center justify-between py-6 border-t border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <img
                  src={blog.authorAvatar || '/user.jpg'}
                  alt={blog.authorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">{blog.authorName}</p>
                  <p className="text-gray-600">Author</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-gray-500">
                <div className="flex items-center">
                  <FiCalendar className="mr-2" />
                  <span>{formatDate(blog.publishDate)}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {blog.featuredImage?.url && (
            <div className="mb-8">
              <img
                src={blog.featuredImage.url}
                alt={blog.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">Tags:</span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                {blog.category?.name || 'General'}
              </span>
            </div>
          </div>
        </div>
      </article>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Related Blogs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedBlogs.map((relatedBlog) => (
                  <article key={relatedBlog._id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={relatedBlog.thumbnail?.url || '/placeholder-blog.jpg'}
                        alt={relatedBlog.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {relatedBlog.category?.name || 'Uncategorized'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                        <Link to={`/blog/${relatedBlog.slug}`} className="hover:text-blue-600 transition-colors">
                          {relatedBlog.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {relatedBlog.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <FiUser className="mr-1" />
                          <span>{relatedBlog.authorName}</span>
                        </div>
                        <div className="flex items-center">
                          <FiCalendar className="mr-1" />
                          <span>{formatDate(relatedBlog.publishDate)}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SingleBlog;