import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [10,"Title must contain at least 10 characters!"],
        maxLength: [100, "Title cannot exceed 100 characters"],
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minLength: [50,"Description must contain at least 50 characters!"],
    },
    content: {
        type: String,
        required: true,
        minLength: [100,"Content must contain at least 100 characters!"],
    },
    thumbnail: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    featuredImage: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    authorAvatar: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        default: false,
    },
    publishDate: {
        type: Date,
        default: Date.now,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
});

// Generate slug from title before saving
blogSchema.pre("save", function(next) {
    if (this.isModified("title")) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }
    next();
});

export const Blog = new mongoose.model("Blog", blogSchema);

