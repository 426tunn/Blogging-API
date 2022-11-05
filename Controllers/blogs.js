const {BlogModel, blogState} = require('../Models/blogsModel')
const moment = require ('moment')


exports.getBlogs = async (req, res) => {
   const {query } = req;
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


//update blog state
exports.updateBlogToPublished = async (req, res, next) => {
    try {
    const blogId = req.params.id
    const blog = await BlogModel.findById(blogId)
    if (!blog.author.equals(req.user.id)) {
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


