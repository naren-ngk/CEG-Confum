const Confession = require("./models/confession");
const Memory = require("./models/memory");
const Review = require('./models/reviews');
const User = require('./models/user');
const { confessionSchema, reviewSchema, memorySchema } = require('./schemas');
const ExpressError = require('./utilities/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateConfession = (req, res, next) => {
    const { error } = confessionSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message);
        throw new ExpressError(msg, 500);
    }
    else {
        next();
    }
}

module.exports.validateMemory = (req, res, next) => {
    const { error } = memorySchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message);
        throw new ExpressError(msg, 500);
    }
    else {
        next();
    }
}

module.exports.isConfessionAuthor = async (req, res, next) => {
    const { id } = req.params;
    const confession = await Confession.findById(id);
    if (!confession.author.equals(req.user._id)) {
        req.flash('error', 'You are not authorized to do that action!');
        return res.redirect(`/confession/${id}`);
    }
    next();
}

module.exports.isMemoryAuthor = async (req, res, next) => {
    const { id } = req.params;
    const memory = await Memory.findById(id);
    if (!memory.author.equals(req.user._id)) {
        req.flash('error', 'You are not authorized to do that action!');
        return res.redirect(`/memory/${id}`);
    }
    next();
}

// module.exports.isProfileAuthor = async (req, res, next) => {
//     const id = req.user._id;
//     const user = await User.findById(id);
//     if (!user._id.equals(req.user._id)) {
//         req.flash('error', 'You are not authorized to do that action!');
//         return res.redirect('/home');
//     }
//     next();
// }

module.exports.isConfessionReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You are not authorized to do that action!');
        return res.redirect(`/confession/${id}`);
    }
    next();
}

module.exports.isMemoryReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You are not authorized to do that action!');
        return res.redirect(`/memory/${id}`);
    }
    next();
}

module.exports.validateComment = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message);
        throw new ExpressError(msg, 500);
    }
    else {
        next();
    }
}