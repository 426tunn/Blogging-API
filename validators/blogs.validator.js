const Joi = require('joi')


const AddBlogSchema = Joi.object({
    title: Joi.string()
    .min(3)
    .max(200)
    .trim()
    .required(),
   description: Joi.string()
   .min(10)
    .max(2000)
    .optional()
    .trim(),
    body: Joi.string()
        .min(10)
        .max(13000)
        .required(),
    tags: Joi.string()
    .required()
})

const UpdateBlogSchema = Joi.object({
    title: Joi.string()
    .min(3)
    .max(200)
    .trim()
    .required(),
   description: Joi.string()
   .min(10)
    .max(2000)
    .optional()
    .trim(),
    body: Joi.string()
        .min(10)
        .max(13000)
        .required(),
    tags: Joi.string()
    .required()
})

async function AddBlogValidationMw  (req, res, next){
    const blogPayload = req.body
    try {
        await AddBlogSchema.validateAsync(blogPayload)
        next()
    } catch (error) {
        next({
            message:error.details[0].message,
            status: 400
        })
    }
}
const UpdateBlogValidationMw = async (req, res, next) => {
    const blogPayload = req.body
    try {
        await UpdateBlogSchema.validateAsync(blogPayload)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
        
    }
}


module.exports = {
    AddBlogValidationMw,
    UpdateBlogValidationMw
} 