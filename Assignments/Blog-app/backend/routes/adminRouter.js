import express from "express";
import {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    createBlog,
    getAllBlogsAdmin,
    updateBlogAdmin,
    deleteBlogAdmin,
} from "../controllers/adminController.js";
import { isAuthenticated, isauthorized } from "../middlewares/auth.js";

const router = express.Router();

// Category routes
router.post("/category", isAuthenticated, isauthorized("Admin"), createCategory);
router.get("/categories", isAuthenticated, isauthorized("Admin"), getAllCategories);
router.put("/category/:id", isAuthenticated, isauthorized("Admin"), updateCategory);
router.delete("/category/:id", isAuthenticated, isauthorized("Admin"), deleteCategory);

// Blog routes
router.post("/blog", isAuthenticated, isauthorized("Admin"), createBlog);
router.get("/blogs", isAuthenticated, isauthorized("Admin"), getAllBlogsAdmin);
router.put("/blog/:id", isAuthenticated, isauthorized("Admin"), updateBlogAdmin);
router.delete("/blog/:id", isAuthenticated, isauthorized("Admin"), deleteBlogAdmin);

export default router;

