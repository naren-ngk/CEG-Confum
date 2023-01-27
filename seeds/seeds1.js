const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/adpProject')
    .then(() => {
        console.log("DATABASE CONNECTED!");
    })
    .catch((err) => {
        console.log("ERROR!");
        console.log(err);
    });
const Memory = require('../models/memory');

const seedProducts = [
    {
        place: 'Ooty',
        description: 'Good',
        geometry: {
            type: "Point",
            coordinates: [76.696529, 11.4035695]
        },
        images: [
            {
                url: 'https://res.cloudinary.com/imagescloud2003/image/upload/v1655992843/CEG%20Confum/cyzrbh5jcgexlkawfo6f.jpg',
                filename: 'CEG Confum/cyzrbh5jcgexlkawfo6f'
            },
            {
                url: 'https://res.cloudinary.com/imagescloud2003/image/upload/v1655992843/CEG%20Confum/cyzrbh5jcgexlkawfo6f.jpg',
                filename: 'CEG Confum/cyzrbh5jcgexlkawfo6f'
            }
        ],
        date: '20-04-2022',
        author: '62b1d20c99f2e059805b3926'
    },
    {
        place: 'Ooty',
        description: 'Good',
        geometry: {
            type: "Point",
            coordinates: [76.696529, 11.4035695]
        },
        images: [
            {
                url: 'https://res.cloudinary.com/imagescloud2003/image/upload/v1655992843/CEG%20Confum/cyzrbh5jcgexlkawfo6f.jpg',
                filename: 'CEG Confum/cyzrbh5jcgexlkawfo6f'
            },
            {
                url: 'https://res.cloudinary.com/imagescloud2003/image/upload/v1655992843/CEG%20Confum/cyzrbh5jcgexlkawfo6f.jpg',
                filename: 'CEG Confum/cyzrbh5jcgexlkawfo6f'
            }
        ],
        date: '20-04-2022',
        author: '62b1d20c99f2e059805b3926'
    },
    {
        place: 'Ooty',
        description: 'Good',
        geometry: {
            type: "Point",
            coordinates: [76.696529, 11.4035695]
        },
        images: [
            {
                url: 'https://res.cloudinary.com/imagescloud2003/image/upload/v1655992843/CEG%20Confum/cyzrbh5jcgexlkawfo6f.jpg',
                filename: 'CEG Confum/cyzrbh5jcgexlkawfo6f'
            },
            {
                url: 'https://res.cloudinary.com/imagescloud2003/image/upload/v1655992843/CEG%20Confum/cyzrbh5jcgexlkawfo6f.jpg',
                filename: 'CEG Confum/cyzrbh5jcgexlkawfo6f'
            }
        ],
        date: '20-04-2022',
        author: '62b1d20c99f2e059805b3926'
    },
    {
        place: 'Ooty',
        description: 'Good',
        geometry: {
            type: "Point",
            coordinates: [76.696529, 11.4035695]
        },
        images: [
            {
                url: 'https://res.cloudinary.com/imagescloud2003/image/upload/v1655992843/CEG%20Confum/cyzrbh5jcgexlkawfo6f.jpg',
                filename: 'CEG Confum/cyzrbh5jcgexlkawfo6f'
            },
            {
                url: 'https://res.cloudinary.com/imagescloud2003/image/upload/v1655992843/CEG%20Confum/cyzrbh5jcgexlkawfo6f.jpg',
                filename: 'CEG Confum/cyzrbh5jcgexlkawfo6f'
            }
        ],
        date: '20-04-2022',
        author: '62b1d20c99f2e059805b3926'
    }
];

Memory.insertMany(seedProducts)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })
