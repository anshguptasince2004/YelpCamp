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
    for (let i = 0; i < 50; i++) {
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
                    url: 'https://res.cloudinary.com/dfdolahjd/image/upload/v1756347047/YelpCamp/xn4jp4jrobdpbl17mjkc.jpg',
                    filename: 'YelpCamp/xn4jp4jrobdpbl17mjkc',
                },
                {
                    url: 'https://res.cloudinary.com/dfdolahjd/image/upload/v1756347048/YelpCamp/w1vigkxb0pqkwchtlvef.jpg',
                    filename: 'YelpCamp/w1vigkxb0pqkwchtlvef',
                },
                {
                    url: 'https://res.cloudinary.com/dfdolahjd/image/upload/v1756347050/YelpCamp/ocrlysxmxrogbd5ovge8.jpg',
                    filename: 'YelpCamp/ocrlysxmxrogbd5ovge8',
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});