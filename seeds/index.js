const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./indian_cities.json');
const { places, descriptors } = require('./descriptors_places.json');
const campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/YelpCamp')
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch(err => {
        console.log("Connection failed: ", err);
    })

const sample = (array) =>
    array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor((Math.random() * 1000));
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '689ea4c16fba4b2607477cfb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${(sample(descriptors))} ${(sample(places))}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae provident ipsam, possimus ex dolor sequi quia odio veniam nihil rerum ratione nisi labore? Praesentium a tenetur possimus quis error saepe.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfdolahjd/image/upload/v1756011409/YelpCamp/dbb8gtzpsfnz7nru4tjq.png',
                    filename: 'YelpCamp/dbb8gtzpsfnz7nru4tjq',
                },
                {
                    url: 'https://res.cloudinary.com/dfdolahjd/image/upload/v1756011439/YelpCamp/yzhre3f0sxbqccedmaow.png',
                    filename: 'YelpCamp/yzhre3f0sxbqccedmaow',
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});