import slugify from "slugify";

import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        set: (value) => value.charAt(0).toUpperCase() + value.slice(1),
    },
    slug: {
        type: String,
        unique: true,
    },
    content: String,
    shortDesc: String,
    keywords: String,
    thumbnail: String,
}, { timestamps: true });

// Generate a slug before saving the document
schema.pre('save', function (next) {
    if (!this.isModified('title')) {
        return next();
    }

    if (this.slug === undefined || this.slug === '')
        this.slug = slugify(this.title, { lower: true });

    next();
});

schema.static('findBySlug', function (slug) {
    return this.findOne({ slug });
});

schema.static('deleteBySlug', function (slug) {
    return this.deleteOne({ slug });
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', schema);

export default Blog;