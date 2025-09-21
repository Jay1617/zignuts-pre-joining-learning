import React from "react";
import { FiUsers, FiTarget, FiZap, FiHeart, FiCode, FiTrendingUp } from "react-icons/fi";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About BlogNest
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Your ultimate destination for insightful and engaging content, 
              meticulously crafted by a dedicated team of developers and visionaries.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mr-4">
                  <FiTarget className="text-2xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                At BlogNest, our mission is to foster a vibrant community of writers and readers. 
                We strive to create a space where compelling stories, thought-provoking articles, 
                and valuable insights come to life.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Whether you're an avid reader or a passionate writer, BlogNest is here to help you 
                connect with like-minded individuals and discover content that resonates with you.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-100 text-green-600 rounded-lg mr-4">
                  <FiHeart className="text-2xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Philosophy</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that what you read and write matters. Words can divide or empower us, 
                inspire or discourage us. In a world where the most sensational and surface-level 
                stories often win, we're building a system that rewards depth, nuance, and time 
                well spent. A space for thoughtful conversation more than drive-by takes, and 
                substance over packaging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">What Sets Us Apart</h2>
              <p className="text-xl text-gray-600">
                Discover the features that make BlogNest unique
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mr-4">
                    <FiUsers className="text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">User-Centric Design</h3>
                </div>
                <p className="text-gray-600">
                  Our platform is built with the user in mind, offering a seamless and enjoyable 
                  experience. From easy navigation to a clean, responsive design, we ensure that 
                  BlogNest is accessible and engaging on all devices.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-lg mr-4">
                    <FiZap className="text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Future-Ready Features</h3>
                </div>
                <p className="text-gray-600">
                  We're excited to introduce advanced features, including a machine learning-powered 
                  review system. This upcoming addition will enhance your experience by providing 
                  personalized recommendations and valuable feedback.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg mr-4">
                    <FiCode className="text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Collaborative Development</h3>
                </div>
                <p className="text-gray-600">
                  BlogNest is the result of hard work and collaboration. Our team is passionate 
                  about pushing boundaries and constantly improving the platform to meet the 
                  evolving needs of our users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start your blogging journey with BlogNest today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/blogs"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Explore Blogs
              </a>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;