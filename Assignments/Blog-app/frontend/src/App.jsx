  //App.jsx
  import React, { useContext, useEffect } from "react";
  import "./App.css";
  import { BrowserRouter, Route, Routes } from "react-router-dom";
  import Home from "../src/components/pages/Home";
  import About from "../src/components/pages/About";
  import Blogs from "../src/components/pages/Blogs";
  import SingleBlog from "../src/components/pages/SingleBlog";
  import Navbar from "../src/components/layout/Navbar";
  import Footer from "../src/components/layout/Footer";
  import { Toaster } from "react-hot-toast";
  import Dashboard from "./components/pages/Dashboard";
  import Register from "./components/pages/Register";
  import Login from "./components/pages/Login";
  import { Context } from "./main";
  import axios from "axios";

  const App = () => {
    const { setUser, isAuthenticated, setIsAuthenticated, user, setBlogs, isLoading, setIsLoading } =
      useContext(Context);
      useEffect(() => {
        let isMounted = true;
        
        const fetchUser = async () => {
          try {
            // Add timeout to prevent hanging
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            const { data } = await axios.get(
              "http://localhost:4000/api/v1/user/myprofile",
              { 
                withCredentials: true,
                signal: controller.signal
              }
            );
            
            clearTimeout(timeoutId);
            
            if (isMounted) {
              setUser(data.user);
              setIsAuthenticated(true);
            }
          } catch (error) {
            console.log("Authentication check failed:", error);
            if (isMounted) {
              setIsAuthenticated(false);
              setUser({});
            }
          } finally {
            if (isMounted) {
              setIsLoading(false);
            }
          }
        };
      
        const fetchBlogs = async () => {
          try {
            const { data } = await axios.get(
              "http://localhost:4000/api/v1/public/latest?limit=6"
            );
            if (isMounted) {
              setBlogs(data.blogs);
            }
          } catch (error) {
            if (isMounted) {
              setBlogs([]);
            }
          }
        };
      
        fetchUser();
        fetchBlogs();
        
        return () => {
          isMounted = false;
        };
      }, []);
      
    // Show loading spinner while checking authentication
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
            <p className="text-sm text-gray-500 mt-2">Checking authentication...</p>
          </div>
        </div>
      );
    }
      
    return (  
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:slug" element={<SingleBlog />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
          <Footer />
          <Toaster />
        </BrowserRouter>
      </>
    );
  };

  export default App;
