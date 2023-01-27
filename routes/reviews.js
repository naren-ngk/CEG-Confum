const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const review = require('../controllers/reviewsController');
const { validateComment, isLoggedIn, isConfessionReviewAuthor, isMemoryReviewAuthor } = require('../middleware');

router.get('/home', review.viewHomePage);

router.post('/confession/:id/comment', isLoggedIn, validateComment, catchAsync(review.postNewConfessionReview))

router.post('/memory/:id/comment', isLoggedIn, validateComment, catchAsync(review.postNewMemoryReview))

router.delete('/confession/:id/comment/:reviewId', isConfessionReviewAuthor, catchAsync(review.deleteConfessionReview))

router.delete('/memory/:id/comment/:reviewId', isMemoryReviewAuthor, catchAsync(review.deleteMemoryReview))

module.exports = router;