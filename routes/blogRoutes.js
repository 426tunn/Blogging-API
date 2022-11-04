const express = require('express');
const blogController = require('../Controllers/blogs')
const passport = require('passport')
const blogRouter = express.Router();


blogRouter.get('/', blogController.getBlogs);
blogRouter.get('/:id', blogController.getBlogbyID);
blogRouter.post('/', passport.authenticate('jwt', {session: false}), blogController.addBlog);
blogRouter.put('/:id', blogController.updateBlog);
blogRouter.delete('/:id', blogController.deleteBlog);


module.exports = blogRouter