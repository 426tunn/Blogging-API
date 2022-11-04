const {BlogModel, blogState} = require('../models/blogsModel')


exports.getBlogs = async (req, res) => {
   
    const {page = 1, limit = 20} = req.query; //Pagination
   await BlogModel.find({state: blogState.published})
   .limit(limit * 1)
   .skip((page -1)* limit)
   .populate('author', '-password -__v' ) // returning author information
        .then(blogs => {
            res.status(200).json(blogs)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

exports.getBlogbyID = async (req, res)  => {
    const id = req.params.id
   await  BlogModel.findById(id)
   .populate('author', '-password -__v' )
        .then(blog => {
            blog.read_count += 1;
            blog.save();
            res.status(200).send(blog)
        }).catch(err => {
            console.log(err)
            res.status(404).send(err)
        })
}

exports.addBlog = async (req, res) => {
    const blog = req.body;
    const wordCount = blog.body.split(" ").length;
    const reading_time = `${Math.floor(wordCount/200)} minute(s)`;
    blog.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
    blog.author = req.user._id;
    blog.reading_time = reading_time;
     await  BlogModel.create(blog)
        .then(blog => {
            res.status(201).send(blog)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}


//updatind blog state
exports.updateBlog = async (req, res, next) => {
    try {
    const id = req.params.id
    blog.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
    const blog = await BlogModel.findById(id)
    if(blog.state === blogState.published) return res.status(401).json({error: "Blog already published"})
   blog.state = blogState.published;
   await blog.save();

   res.status(200).json({status: true, blog})
    } catch(error){
        next(error);
    }
}

exports.deleteBlog = (req, res) => {
    const id = req.params.id
    BlogModel.findByIdAndRemove(id)
        .then(blog => {
            res.status(200).send(blog)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}





