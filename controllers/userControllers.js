const User = require('../models/user');
const Confession = require('../models/confession');
const Memory = require('../models/memory');

module.exports.viewProfile = async (req, res) => {
    const id = req.user._id;
    const user = await User.findById(id);
    const confessions = await Confession.find({ author: { _id: req.user.id } });
    const memories = await Memory.find({ author: { _id: req.user.id } });
    res.render('profile', { userData: { user }, confessionData: { confessions }, memoryData: { memories } });
}

module.exports.renderSignUp = (req, res) => {
    res.render('signup');
}

module.exports.anonymous = (req, res) => {
    res.render('anonymous');
}

module.exports.renderLogin = (req, res) => {
    res.render('login');
}

module.exports.loginUser = (req, res) => {
    req.flash('success', 'You are successfully logged in!')
    res.redirect('/profile');
}

module.exports.logoutUser = (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err);
        req.flash('success', 'Logged out successfully!');
        res.redirect("/home");
    });
}

module.exports.createUser = async (req, res) => {
    try {
        const { email, username, password, firstname, lastname, dob, tag, dept, description } = req.body;
        const user = new User({ username, email, firstname, lastname, dob, tag, dept, description });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) { return next(err) }
            req.flash('success', 'Welcome to CEG Confessions & Experience!')
            res.redirect('/profile');
        })
    } catch (e) {
        req.flash('error', `${e.message}!`);
        res.redirect('/signup');
    }
}

module.exports.editProfile = async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { ...req.body });
    req.flash('success', 'Updated your profile successfully!');
    res.redirect('/profile');
}

module.exports.renderEditProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    res.render('edit-profile', { user });
}

module.exports.aboutUs = (req, res) => {
    res.render('about');
}