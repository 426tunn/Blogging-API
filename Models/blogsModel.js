const mongoose = require('mongoose');

const blogState = {
    draft: "draft",
    published: "published"
}

const BlogSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    state: {
        type: String,
        required: true,
        enum: Object.values(blogState),
        default: 'draft'
    },
    read_count: {
        type: Number,
        default: 0
    },
    reading_time: {
       type: String
    },
    body: {
        type: String,
        required: true
    },

    tags: [String],    
}, {timestamps: true})

 const BlogModel = mongoose.model('Blog', BlogSchema)

 module.exports = exports = {
    BlogModel, blogState
 }