const Memory = require('../models/memory');
const Confession = require('../models/confession');
const Review = require('../models/reviews');

module.exports.viewHomePage = (req, res) => {
    res.render('homepage');
}

module.exports.postNewConfessionReview = async (req, res) => {
    const { id } = req.params;
    const confession = await Confession.findById(id);
    const comment = new Review(req.body.reviews);
    comment.author = req.user._id;
    confession.reviews.push(comment);
    await comment.save();
    await confession.save();
    res.redirect(`/confession/${confession._id}`);
}

module.exports.postNewMemoryReview = async (req, res) => {
    const { id } = req.params;
    const memory = await Memory.findById(id);
    const comment = new Review(req.body.reviews);
    comment.author = req.user._id;
    memory.reviews.push(comment);
    await comment.save();
    await memory.save();
    res.redirect(`/memory/${memory._id}`);
}

module.exports.deleteConfessionReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Confession.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/confession/${id}`);
}

module.exports.deleteMemoryReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Memory.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/memory/${id}`);
}