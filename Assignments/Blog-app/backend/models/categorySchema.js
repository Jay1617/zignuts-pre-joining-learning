import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [2, "Category name must contain at least 2 characters!"],
        maxLength: [50, "Category name cannot exceed 50 characters"],
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
});

// Generate slug from name before saving
categorySchema.pre("save", function(next) {
    if (this.isModified("name")) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }
    next();
});

export const Category = mongoose.model("Category", categorySchema);

