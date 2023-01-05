const {BlogModel, blogState} = require('../Models/blogsModel')
const moment = require ('moment');
const logger = require('../logging/logger');


exports.getBlogs = async (req, res) => {
   const {query} = req;
   const {
    timestamps,
      author,
      title,
      tags,
      read_count = 'asc',
      reading_time = 'asc',
      order_by = 'timestamps'
   } = query;

   const findQuery = {};

   if (timestamps) {
    findQuery.timestamps = {
        $gt: moment(timestamps).startOf('day').toDate(),
        $gt: moment(timestamps).endOf('day').toDate(),
    }
   }

   if(author) {
    findQuery.author = author;
   }

   if(title) {
    findQuery.title = title;
   }
   if(tags) {
    findQuery.tags = tags;
   }
   const sortQuery = {};
   const sortAttributes = order_by.split(',')

   for(const attribute of sortAttributes) {
    if(read_count === 'asc' && reading_time === 'asc'){
        sortQuery[attribute] = 1
    }
    if(read_count === 'desc' && reading_time === 'desc'){
        sortQuery[attribute] = -1
   }
}

    const {page = 1, limit = 20} = req.query; //Pagination

   await BlogModel.find({state: blogState.published}, findQuery)
   .limit(limit * 1)
   .skip((page -1)* limit)
   .populate('author', '-password -__v' ) // returning author information
   .find(findQuery)
   .sort(sortQuery)
        .then(blogs => {
            res.status(200).json(blogs)
        })
        .catch(err => {
            logger.error(err)
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
            logger.error(err)
            res.status(404).send(err)
        })
}

exports.addBlog = async (req, res) => {
    const blog = req.body;
    const exists = await BlogModel.findOne({ title: req.body.title });
    if (exists) {
        return res
            .status(400)
            .json({ status: false, error: "Blog already exists" });
    }

    const wordCount = blog.body.split(" ").length;
    const reading_time = `${Math.floor(wordCount/200)} minute(s)`;
    blog.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
    blog.author = req.user._id;
    blog.reading_time = reading_time;
     await  BlogModel.create(blog)
        .then(blog => {
            res.status(201).send(blog)
        }).catch(err => {
            logger.error(err)
            res.status(500).send(err)
        })
}


//update blog state
exports.updateBlogToPublished = async (req, res, next) => {
    try {
    const blogId = req.params.id
    const blog = await BlogModel.findById(blogId)
    blog.author = req.user._id;
    if (!blog.author) {
        return res.status(403).json({error: "This blog doesn't belong to you. You can only update your blog."})
    }    
    if(blog.state === blogState.published) return res.status(401).json({error: "Blog already published"})
   blog.state = blogState.published;
   await blog.save();

   res.status(200).json({status: true, blog})
    } catch(error){
        next(error);
    }
}

exports.editBlog = async (req, res, next) => {
    try {
        
        const blogId = req.params.id
        const {title, description, body, tags} = req.body;
        if(await BlogModel.findOne({title})){
            return res.status(403).json({status: false, error: "This Title is taken"})
        }

        const blog = await BlogModel.findById(blogId)
        
        blog.author = req.user._id;
        if (!blog.author) {
            return res.status(403).json({error: "This blog doesn't belong to you. You can only edit your blog."})
        }    
        if(!blog){
            return res
            .status(404)
            .json({status: false,
            error: "Blog not found"})
        }
        if (!blog.author.equals(req.user.id)) {
            return res.status(403).json({error: "This blog doesn't belong to you. You can only update your blog."})
        }    
        blog.title = title || blog.title;
        blog.description = description || blog.description;
        blog.body = body ||blog.body;
       await blog.save();
       blog.tags = (await blog.cleanAndSaveTags(tags)) || blog.tags;    
       res.status(200).json({status: true, blog})
        } catch(error){
            next(error);
        }
}

exports.deleteBlog = async (req, res, next) => {
    try {
        const blogId = req.params.id
       
    return res
            .status(404)
            .json({status: false,
            error: "Blog not found"})
    await BlogModel.findByIdAndDelete(blogId);
    res.status(200).json({
        status: true,
        message: "Blog deleted successfully"
    })
        
    } catch(err) {
            next(err);
        }
}


