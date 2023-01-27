const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/adpProject')
    .then(() => {
        console.log("DATABASE CONNECTED!");
    })
    .catch((err) => {
        console.log("ERROR!");
        console.log(err);
    });
const Confession = require('../models/confession');

const d = new Date;
const date = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;

const seedProducts = [
    {
        username: 'Fruit Jam',
        confession: 'I am a gay',
        image: '/images/wolf.webp',
        date: date,
        author: '62b1d20c99f2e059805b3926'
    },
    {
        username: 'Organic Cereal',
        confession: 'I am a lesbian',
        image: '/images/wolf.webp',
        date: date,
        author: '62b1d20c99f2e059805b3926'
    },
    {
        username: 'Cow Milk',
        confession: 'I am straight',
        image: '/images/wolf.webp',
        date: date,
        author: '62b1d20c99f2e059805b3926'
    },
    {
        username: 'Oragnic Bread',
        confession: 'I am dead',
        image: '/images/wolf.webp',
        date: date,
        author: '62b1d20c99f2e059805b3926'
    }
];
Confession.insertMany(seedProducts)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })