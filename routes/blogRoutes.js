const express = require('express');
const blogController = require('../Controllers/blogs')
const passport = require('passport')
const blogRouter = express.Router();
const {AddBlogValidationMw,
        UpdateBlogValidationMw} = require("../validators/blogs.validator")


blogRouter.get('/',
 blogController.getBlogs);

blogRouter.get('/:id', 
blogController.getBlogbyID);

blogRouter.post('/', AddBlogValidationMw,
 passport.authenticate('jwt', {session: false}), 
 blogController.addBlog);

blogRouter.patch('/:id',
 passport.authenticate('jwt', {session: false}),
   blogController.updateBlogToPublished);

blogRouter.delete('/:id',
 passport.authenticate('jwt', {session: false}),
   blogController.deleteBlog);

blogRouter.put('/:id',  UpdateBlogValidationMw,
 passport.authenticate('jwt', {session: false}),
   blogController.editBlog);

module.exports = blogRouter