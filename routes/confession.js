const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const confession = require('../controllers/confessionController')
const { isLoggedIn, isConfessionAuthor, validateConfession } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(confession.allConfessions))
    .post(isLoggedIn, upload.array('image'), validateConfession, catchAsync(confession.createNewConfession))

router.get('/new', isLoggedIn, confession.renderNewConfession);

router.route('/:id')
    .get(catchAsync(confession.viewConfession))
    .delete(isConfessionAuthor, catchAsync(confession.deleteConfession))
    .put(isLoggedIn, upload.array('image'), validateConfession, isConfessionAuthor, catchAsync(confession.editConfession))

router.get('/:id/edit', isLoggedIn, isConfessionAuthor, catchAsync(confession.renderEditForm))

router.get('/:id/author/:authorId/profile', isLoggedIn, catchAsync(confession.viewConfessionProfile))

module.exports = router;