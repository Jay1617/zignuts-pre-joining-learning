import express from "express";
import {
    blogpost,
    deleteBlog,
    getAllBlogs,
    getSingleBlog,
    getMyBlogs,
    updateBlog,
} from "../controllers/Blogcontroller.js";
import { isAuthenticated, isauthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, isauthorized("Admin"), blogpost);
router.delete(
    "/delete/:id",
    isAuthenticated,
    isauthorized("Admin"),
    deleteBlog
);
router.get("/all", getAllBlogs);
router.get("/singleblog/:id", isAuthenticated, getSingleBlog);
router.get("/myblogs", isAuthenticated, isauthorized("Admin"), getMyBlogs);
router.put("/update/:id", isAuthenticated, isauthorized("Admin"), updateBlog);


export default router;
