import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Blog } from "../models/blogSchema.js";
import { Category } from "../models/categorySchema.js";
import cloudinary from "cloudinary";

// Category Controllers
export const createCategory = catchAsyncError(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(new ErrorHandler("Category name is required!", 400));
    }

    const category = await Category.create({ name });

    res.status(201).json({
        success: true,
        message: "Category created successfully!",
        category,
    });
});

export const getAllCategories = catchAsyncError(async (req, res, next) => {
    const categories = await Category.find().sort({ createdOn: -1 });

    res.status(200).json({
        success: true,
        categories,
    });
});

export const updateCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return next(new ErrorHandler("Category name is required!", 400));
    }

    const category = await Category.findByIdAndUpdate(
        id,
        { name },
        { new: true, runValidators: true }
    );

    if (!category) {
        return next(new ErrorHandler("Category not found!", 404));
    }

    res.status(200).json({
        success: true,
        message: "Category updated successfully!",
        category,
    });
});

export const deleteCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
        return next(new ErrorHandler("Category not found!", 404));
    }

    // Check if any blogs are using this category
    const blogsWithCategory = await Blog.find({ category: id });
    if (blogsWithCategory.length > 0) {
        return next(new ErrorHandler("Cannot delete category. Blogs are using this category!", 400));
    }

    await category.deleteOne();

    res.status(200).json({
        success: true,
        message: "Category deleted successfully!",
    });
});

// Blog Controllers for Admin
export const createBlog = catchAsyncError(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Blog thumbnail is required!", 400));
    }

    const { thumbnail, featuredImage } = req.files;
    const { title, description, content, category, publishDate, published } = req.body;

    if (!title || !description || !content || !category) {
        return next(new ErrorHandler("Title, description, content, and category are required!", 400));
    }

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
        return next(new ErrorHandler("Category not found!", 404));
    }

    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedFormats.includes(thumbnail.mimetype)) {
        return next(new ErrorHandler("Invalid thumbnail format. Only JPG, PNG, WEBP formats are allowed.", 400));
    }

    if (featuredImage && !allowedFormats.includes(featuredImage.mimetype)) {
        return next(new ErrorHandler("Invalid featured image format. Only JPG, PNG, WEBP formats are allowed.", 400));
    }

    // Upload thumbnail
    const thumbnailRes = await cloudinary.uploader.upload(thumbnail.tempFilePath);
    
    let featuredImageRes = {};
    if (featuredImage) {
        featuredImageRes = await cloudinary.uploader.upload(featuredImage.tempFilePath);
    }

    if (!thumbnailRes || thumbnailRes.error) {
        return next(new ErrorHandler("Error uploading thumbnail!", 500));
    }

    if (featuredImage && (!featuredImageRes || featuredImageRes.error)) {
        return next(new ErrorHandler("Error uploading featured image!", 500));
    }

    const blogData = {
        title,
        description,
        content,
        category,
        published: published === "true",
        publishDate: publishDate || new Date(),
        createdBy: req.user._id,
        authorName: req.user.name,
        authorAvatar: req.user.avatar.url,
        thumbnail: {
            public_id: thumbnailRes.public_id,
            url: thumbnailRes.secure_url,
        },
    };

    if (featuredImageRes && featuredImageRes.public_id) {
        blogData.featuredImage = {
            public_id: featuredImageRes.public_id,
            url: featuredImageRes.secure_url,
        };
    }

    const blog = await Blog.create(blogData);

    res.status(201).json({
        success: true,
        message: "Blog created successfully!",
        blog,
    });
});

export const getAllBlogsAdmin = catchAsyncError(async (req, res, next) => {
    const blogs = await Blog.find()
        .populate("category", "name")
        .populate("createdBy", "name email")
        .sort({ createdOn: -1 });

    res.status(200).json({
        success: true,
        blogs,
    });
});

export const updateBlogAdmin = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, content, category, publishDate, published } = req.body;

    let blog = await Blog.findById(id);
    if (!blog) {
        return next(new ErrorHandler("Blog not found!", 404));
    }

    const updateData = {
        title,
        description,
        content,
        category,
        published: published === "true",
        publishDate: publishDate || blog.publishDate,
    };

    // Handle image uploads if provided
    if (req.files) {
        const { thumbnail, featuredImage } = req.files;
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

        if (thumbnail) {
            if (!allowedFormats.includes(thumbnail.mimetype)) {
                return next(new ErrorHandler("Invalid thumbnail format!", 400));
            }

            // Delete old thumbnail
            if (blog.thumbnail && blog.thumbnail.public_id) {
                await cloudinary.uploader.destroy(blog.thumbnail.public_id);
            }

            const thumbnailRes = await cloudinary.uploader.upload(thumbnail.tempFilePath);
            updateData.thumbnail = {
                public_id: thumbnailRes.public_id,
                url: thumbnailRes.secure_url,
            };
        }

        if (featuredImage) {
            if (!allowedFormats.includes(featuredImage.mimetype)) {
                return next(new ErrorHandler("Invalid featured image format!", 400));
            }

            // Delete old featured image
            if (blog.featuredImage && blog.featuredImage.public_id) {
                await cloudinary.uploader.destroy(blog.featuredImage.public_id);
            }

            const featuredImageRes = await cloudinary.uploader.upload(featuredImage.tempFilePath);
            updateData.featuredImage = {
                public_id: featuredImageRes.public_id,
                url: featuredImageRes.secure_url,
            };
        }
    }

    blog = await Blog.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    }).populate("category", "name");

    res.status(200).json({
        success: true,
        message: "Blog updated successfully!",
        blog,
    });
});

export const deleteBlogAdmin = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
        return next(new ErrorHandler("Blog not found!", 404));
    }

    // Delete images from cloudinary
    if (blog.thumbnail && blog.thumbnail.public_id) {
        await cloudinary.uploader.destroy(blog.thumbnail.public_id);
    }
    if (blog.featuredImage && blog.featuredImage.public_id) {
        await cloudinary.uploader.destroy(blog.featuredImage.public_id);
    }

    await blog.deleteOne();

    res.status(200).json({
        success: true,
        message: "Blog deleted successfully!",
    });
});

