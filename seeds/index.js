const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./indian_cities.json');
const {places, descriptors} = require('./descriptors_places.json');
const campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/YelpCamp')
.then(() => {
    console.log("Connected to MongoDB");
}) .catch(err => {
    console.log("Connection failed: ", err);
})

const sample = (array) =>
    array[Math.floor(Math.random()*array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0; i<50; i++) {
        const random1000 = Math.floor((Math.random()*1000));
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${(sample(descriptors))} ${(sample(places))}`
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});