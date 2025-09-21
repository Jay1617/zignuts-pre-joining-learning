import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUser, FiMail, FiCalendar, FiBook, FiAward } from "react-icons/fi";

const AllAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/authors",
          { withCredentials: true }
        );
        setAuthors(data.author);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading authors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Authors</h1>
            <p className="text-xl text-purple-100">
              Meet the talented writers who bring you amazing content
            </p>
          </div>
        </div>
      </section>

      {/* Authors Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {authors && authors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {authors.map((author) => (
                  <div key={author._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6">
                      {/* Author Avatar */}
                      <div className="flex items-center mb-6">
                        <div className="relative">
                          <img
                            src={author.avatar?.url || '/user.jpg'}
                            alt={author.name}
                            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <FiUser className="text-white text-xs" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-bold text-gray-800">{author.name}</h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <FiAward className="mr-1" />
                            <span className="capitalize">{author.role}</span>
                          </div>
                        </div>
                      </div>

                      {/* Author Info */}
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <FiMail className="mr-3 text-gray-400" />
                          <span className="text-sm">{author.email}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FiCalendar className="mr-3 text-gray-400" />
                          <span className="text-sm">Joined {formatDate(author.createdOn)}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-blue-600">12</div>
                            <div className="text-sm text-gray-500">Blogs</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-600">1.2K</div>
                            <div className="text-sm text-gray-500">Readers</div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-6">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-gray-400 text-6xl mb-4">👥</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Authors Found</h3>
                <p className="text-gray-600">
                  There are no authors to display at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Become an Author?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join our community of writers and share your stories with the world
          </p>
          <a
            href="/register"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
};

export default AllAuthors;