const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user')
const Review = require('./reviews');

const opts = { toJSON: { virtuals: true } };

const memorySchema = new Schema({
    place: String,
    description: String,
    images: [{
        url: String,
        filename: String
    }],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    date: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, opts);

memorySchema.index({ place: 'text' });

memorySchema.virtual('properties.popUpMarkup').get(function () {
    return `<a href="/memory/${this._id}" style="text-decoration : none">${this.place}</a><br><h5>${this.author.firstname} ${this.author.lastname} visited this place on ${this.date}</h5>`;
})

memorySchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
})

const Memory = mongoose.model('Memory', memorySchema);

module.exports = Memory;