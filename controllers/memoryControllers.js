const Memory = require('../models/memory');
const User = require('../models/user');
const { cloudinary } = require('../cloudinary');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });

const convertedDate = (newDate) => {
    let date = new Date(newDate);
    let dobArr = date.toDateString().split(' ');
    let dobFormat = dobArr[2] + ' ' + dobArr[1] + ' ' + dobArr[3];
    return dobFormat;
}

module.exports.allMemory = async (req, res) => {
    const memories = await Memory.find({}).populate('author');
    res.render('memory', { memories });
}

module.exports.renderNewMemoryForm = (req, res) => {
    res.render('newmemory');
}

module.exports.createNewMemory = async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.place,
        limit: 1
    }).send();
    const newMemory = new Memory(req.body);
    newMemory.geometry = geoData.body.features[0].geometry;
    newMemory.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    newMemory.author = req.user._id;
    await newMemory.save();
    req.flash('success', 'Successfully made a new memory!');
    res.redirect('/memory');
}

module.exports.viewMemory = async (req, res) => {
    const { id } = req.params;
    const returnUrl = req.session.returnTo;
    const memory = await Memory.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!memory) {
        req.flash('error', 'Cannot find the memory!');
        return res.redirect('/memory');
    }
    const date = convertedDate(memory.date);
    memory.date = date;
    res.render('viewmemory', { data: { memory }, returnUrl });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const memory = await Memory.findById(id);
    if (!memory) {
        req.flash('error', 'Cannot find the memory!');
        return res.redirect('/memory');
    }
    res.render('editmemory', { memory });
}

module.exports.viewMemoryProfile = async (req, res) => {
    const { authorId, id } = req.params;
    const user = await User.findById(authorId);
    if (!user) {
        req.flash('error', 'Cannot find the user!');
        return res.redirect('/memory');
    }
    res.render('viewprofilememory', { data: { user }, id });
}

module.exports.updateMemory = async (req, res) => {
    const { id } = req.params;
    const memory = await Memory.findByIdAndUpdate(id, { ...req.body });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    memory.images.push(...imgs);
    await memory.save();
    if (req.body.deleteimages) {
        for (let filename of req.body.deleteimages) {
            await cloudinary.uploader.destroy(filename);
        }
        await memory.updateOne({ $pull: { images: { filename: { $in: req.body.deleteimages } } } });
    }
    req.flash('success', 'Updated your memory successfully!');
    res.redirect(`/memory/${memory._id}`);
}

module.exports.deleteMemory = async (req, res) => {
    const { id } = req.params;
    const memory = await Memory.findById(id);
    for(let image of memory.images){
        await cloudinary.uploader.destroy(image.filename)
    }
    await Memory.findByIdAndDelete(id);
    req.flash('success', 'Deleted a memory successfully!');
    res.redirect('/memory');
}

module.exports.searchMemory = async (req, res) => {
    const { search } = req.query;
    const memories = await Memory.find({ $text: { $search: search } }).populate('author');
    req.session.returnTo = req.originalUrl;
    res.render('memory', { memories });
}