const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('./middleware.js');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.route('/')
.get(catchAsync(campgrounds.index))
// .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));
.post(upload.single('image'), isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));


router.get('/new', isLoggedIn, campgrounds.newCampgroundForm);

router.route('/:id')
.get(catchAsync( campgrounds.showCampground))
.put(isLoggedIn, isAuthor, validateCampground, catchAsync( campgrounds.updateCampground))
.delete(isAuthor, isLoggedIn, catchAsync( campgrounds.deleteCampground));

router.get('/edit', isLoggedIn, isAuthor, catchAsync( campgrounds.editCampgroundForm));

module.exports = router;