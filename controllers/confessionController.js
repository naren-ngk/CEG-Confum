const Confession = require('../models/confession')
const User = require('../models/user')
const { cloudinary } = require('../cloudinary');

const findDate = () => {
    const date = new Date;
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const curretTime = `${date.getHours()}:${date.getMinutes()}, ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
    return curretTime;
}

module.exports.allConfessions = async (req, res) => {
    const confessions = await Confession.find({}).populate('author');
    res.render('confess', { confessions });
}

module.exports.renderNewConfession = (req, res) => {
    res.render('newconfession');
}

module.exports.createNewConfession = async (req, res) => {
    curretTime = findDate();
    req.body.date = `Created on ${curretTime}`;
    const newConfession = new Confession(req.body);
    newConfession.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    newConfession.author = req.user._id;
    await newConfession.save();
    req.flash('success', 'Successfully made a new confession!');
    res.redirect('/confession');
}

module.exports.viewConfession = async (req, res) => {
    const { id } = req.params;
    const confession = await Confession.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!confession) {
        req.flash('error', 'Cannot find the confession!');
        return res.redirect('/confession');
    }
    res.render('viewconfession', { confession });
}

module.exports.deleteConfession = async (req, res) => {
    const { id } = req.params;
    const confession = await Confession.findById(id);
    for (let image of confession.images) {
        await cloudinary.uploader.destroy(image.filename);
    }
    await Confession.findByIdAndDelete(id);
    req.flash('success', 'Deleted your confession successfully!');
    res.redirect(`/confession`);
}

module.exports.editConfession = async (req, res) => {
    curretTime = findDate();
    const { id } = req.params;
    const confession = await Confession.findByIdAndUpdate(id, { ...req.body });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    confession.images.push(...imgs);
    if (confession.images.length > 1) {
        confession.images.forEach(async (img, i) => {
            if (i === 0) {
                cloudinary.uploader.destroy(img.filename);
                await confession.updateOne({ $pull: { images: { filename: { $in: img.filename } } } });
            }
        })
    }
    confession.date = `Updated on ${curretTime}`;
    await confession.save();
    req.flash('success', 'Updated your confession successfully!');
    res.redirect(`/confession/${confession._id}`);
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const confession = await Confession.findById(id);
    if (!confession) {
        req.flash('error', 'Cannot find the confession!');
        return res.redirect('/confession');
    }
    res.render('editconfession', { confession });
}

module.exports.viewConfessionProfile = async (req, res) => {
    const { authorId, id } = req.params;
    const user = await User.findById(authorId);
    if (!user) {
        req.flash('error', 'Cannot find the user!');
        return res.redirect('/confession');
    }
    res.render('viewprofileconfession', { data: { user }, id });
}