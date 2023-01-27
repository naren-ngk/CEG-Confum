const Joi = require('joi');

module.exports.confessionSchema = Joi.object({
        confession: Joi.string().required(),
        tag: Joi.string(),
        // image: Joi.string(),
        date: Joi.string(),
        anonymous: Joi.string().required()
    });

module.exports.memorySchema = Joi.object({
    place: Joi.string().required(),
    description: Joi.string().required(),
    // image: Joi.string(),
    date: Joi.string().required(),
    deleteimages: Joi.array()
    });

module.exports.reviewSchema = Joi.object({
    reviews: Joi.object({
        text: Joi.string().required(),
        rating: Joi.number()
    }).required()
});
