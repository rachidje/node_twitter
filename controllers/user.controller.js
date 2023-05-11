const { createNewUser, 
        findUserByUsername, 
        findUsersByQuerySearch, 
        addUserToCurrentUserFollowingList, 
        removeUserFromCurrentUserFollowingList 
    } = require("../database/queries/user.queries");
const { findTweetsFromUsername } = require("../database/queries/tweet.queries");

const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../public/images/avatars'))
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
})

exports.signupForm = async (req, res, next) => {
    try {
        res.render('user/signup-form', {errors: null})
    } catch (error) {
        next(error);
    }
}

exports.signup = async (req, res, next) => {
    try {
        const body = req.body;
        await createNewUser(body);
        res.redirect('/')
        
    } catch (error) {
        res.render('users/signup-form', {
            errors: [error.message],
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user
        })
    }
}

exports.uploadImage = [
    upload.single('avatar'),
    async (req, res, next) => {
    try {
        const user = req.user;
        user.avatar = `/images/avatars/${req.file.filename}`;
        await user.save();
        res.redirect(`/user/${user.username}`)
    } catch (error) {
        next(error);
    }
}]

exports.displayProfile = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await findUserByUsername(username);
        const tweets = await findTweetsFromUsername(user._id);

        res.render("user/profile-show", { tweets, user, isAuthenticated: req.isAuthenticated(), currentUser: req.user});
    } catch (error) {
        next(error)
    }
}

exports.userList = async (req, res, next) => {
    try {
        const search = req.query.search;
        const users = await findUsersByQuerySearch(search);
        res.json(users)
    } catch (error) {
        next(error)
    }
}

exports.followUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const [user, tweets] = await Promise.all([
            addUserToCurrentUserFollowingList(req.user, userId),
            findTweetsFromUsername(userId)
        ])

        res.render('includes/user/user-profile', {tweets, user, isAuthenticated: req.isAuthenticated(), currentUser: req.user});
    } catch (error) {
        next(error)
    }
}

exports.unFollowUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const [user, tweets] = await Promise.all([
            removeUserFromCurrentUserFollowingList(req.user, userId),
            findTweetsFromUsername(userId)
        ])

        res.render('includes/user/user-profile', {tweets, user, isAuthenticated: req.isAuthenticated(), currentUser: req.user});
    } catch (error) {
        next(error)
    }
}

exports.searchUser = async (req, res, next) => {
    try {
        res.render('user/search');
    } catch (error) {
        next(error)
    }
}