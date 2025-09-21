import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Blog } from "../models/blogSchema.js";
import { Category } from "../models/categorySchema.js";

// Get all published blogs for public access
export const getAllPublishedBlogs = catchAsyncError(async (req, res, next) => {
    const { page = 1, limit = 10, search, category } = req.query;
    const skip = (page - 1) * limit;

    let query = { published: true };

    // Add search functionality
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ];
    }

    // Add category filter
    if (category) {
        query.category = category;
    }

    const blogs = await Blog.find(query)
        .populate("category", "name")
        .select("title slug description thumbnail authorName authorAvatar publishDate")
        .sort({ publishDate: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const totalBlogs = await Blog.countDocuments(query);

    res.status(200).json({
        success: true,
        blogs,
        totalBlogs,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalBlogs / limit),
    });
});

// Get single blog by slug for public access
export const getBlogBySlug = catchAsyncError(async (req, res, next) => {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug, published: true })
        .populate("category", "name")
        .populate("createdBy", "name email");

    if (!blog) {
        return next(new ErrorHandler("Blog not found!", 404));
    }

    res.status(200).json({
        success: true,
        blog,
    });
});

// Get all categories for public access
export const getAllCategoriesPublic = catchAsyncError(async (req, res, next) => {
    const categories = await Category.find().sort({ name: 1 });

    res.status(200).json({
        success: true,
        categories,
    });
});

// Get latest blogs (for homepage)
export const getLatestBlogs = catchAsyncError(async (req, res, next) => {
    const { limit = 6 } = req.query;

    const blogs = await Blog.find({ published: true })
        .populate("category", "name")
        .select("title slug description thumbnail authorName authorAvatar publishDate")
        .sort({ publishDate: -1 })
        .limit(parseInt(limit));

    res.status(200).json({
        success: true,
        blogs,
    });
});

// Get related blogs (same category)
export const getRelatedBlogs = catchAsyncError(async (req, res, next) => {
    const { blogId, categoryId } = req.query;
    const { limit = 4 } = req.query;

    if (!blogId || !categoryId) {
        return next(new ErrorHandler("Blog ID and Category ID are required!", 400));
    }

    const relatedBlogs = await Blog.find({
        _id: { $ne: blogId },
        category: categoryId,
        published: true,
    })
        .populate("category", "name")
        .select("title slug description thumbnail authorName authorAvatar publishDate")
        .sort({ publishDate: -1 })
        .limit(parseInt(limit));

    res.status(200).json({
        success: true,
        blogs: relatedBlogs,
    });
});

