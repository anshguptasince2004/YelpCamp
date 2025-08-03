const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');

const campgrounds = require('./routes/campgrounds.js')
const reviews = require('./routes/reviews.js')

mongoose.connect('mongodb://localhost:27017/YelpCamp')
.then(() => {
    console.log("Connected to MongoDB");
}) .catch(err => {
    console.log("Connection failed: ", err);
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate)

app.use("/campgrounds", campgrounds)
app.use("/campgrounds/:id/reviews", reviews)


app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong"} = err;
    if(!err.message) err.message = "Something went wrong!!"
    res.status(statusCode).render('error', {err});
})
app.listen(3000, () => {
    console.log("Serving on port 3000")
})