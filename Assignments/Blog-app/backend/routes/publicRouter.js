import express from "express";
import {
    getAllPublishedBlogs,
    getBlogBySlug,
    getAllCategoriesPublic,
    getLatestBlogs,
    getRelatedBlogs,
} from "../controllers/publicBlogController.js";

const router = express.Router();

// Public blog routes (no authentication required)
router.get("/blogs", getAllPublishedBlogs);
router.get("/blog/:slug", getBlogBySlug);
router.get("/categories", getAllCategoriesPublic);
router.get("/latest", getLatestBlogs);
router.get("/related", getRelatedBlogs);

export default router;

