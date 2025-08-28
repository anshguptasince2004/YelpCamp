const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('./middleware.js');
const campgrounds = require('../controllers/campgrounds');
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));
    
router.get('/new', isLoggedIn, campgrounds.newCampgroundForm);

router.get('/search', catchAsync(campgrounds.searchCampgrounds));

router.route('/:id')
    .get(catchAsync( campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, upload.array('image'), catchAsync(campgrounds.updateCampground))
    .delete(isAuthor, isLoggedIn, catchAsync( campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync( campgrounds.editCampgroundForm));

module.exports = router;