const mongoose = require('mongoose');
const { confessionSchema } = require('../schemas');
const Schema = mongoose.Schema;
const Review = require('./reviews');
const User = require('./user');

const confessSchema = new Schema({
    confession: String,
    images: [{
        url: String,
        filename: String
    }],
    tag: String,
    date: String,
    anonymous: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

confessSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
})


const Confession = mongoose.model('Confession', confessSchema);

module.exports = Confession;