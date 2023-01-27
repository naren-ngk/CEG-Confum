const express = require('express');
const router = express.Router();
const { isLoggedIn, validateMemory, isMemoryAuthor } = require('../middleware');
const catchAsync = require('../utilities/catchAsync');
const memory = require('../controllers/memoryControllers')
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(memory.allMemory))
    .post(isLoggedIn, upload.array('image'), validateMemory, catchAsync(memory.createNewMemory))


router.get('/new', isLoggedIn, memory.renderNewMemoryForm);

router.get('/search',isLoggedIn, catchAsync(memory.searchMemory));

router.route('/:id')
    .get(catchAsync(memory.viewMemory))
    .delete(isMemoryAuthor, catchAsync(memory.deleteMemory))
    .put(isLoggedIn, isMemoryAuthor, upload.array('image'), validateMemory, catchAsync(memory.updateMemory))

router.get('/:id/edit', isLoggedIn, isMemoryAuthor, catchAsync(memory.renderEditForm))

router.get('/:id/author/:authorId/profile', isLoggedIn, catchAsync(memory.viewMemoryProfile))

module.exports = router;