const { createNewTweet, 
        findAllTweets, 
        findTweetAndDelete, 
        findTweetById, 
        findTweetAndUpdate, 
        likeTweet,
        findAndShareTweet,
        getCurrentUserTweetsWithFollowing,
        findTweetsFromUsername
     } = require("../database/queries/tweet.queries");

const multer = require('multer');
const path = require('path')

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../public/images/tweets'))
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
})

exports.newTweet = [
    upload.single('image'),
    async (req, res, next) => {
        try {
            const body = req.body;
            await createNewTweet({
                ...body, 
                author: req.user, 
                image: req.file && `/images/tweets/${req.file.filename}`,
            })
            res.redirect('/')
        } catch (err) {
            const errors = Object.keys(err.errors).map(key => err.errors[key].message);
            const tweets = await findAllTweets()
            res.status(400).render('home', {
                errors, 
                tweets,
                isAuthenticated: req.isAuthenticated(),
                currentUser: req.user
            })
        }
    }
]

exports.getAllTweets = async (req, res, next) => {
    try {
        if(req.user) {
            const tweets = await getCurrentUserTweetsWithFollowing(req.user)
            res.render('home', {tweets, isAuthenticated: req.isAuthenticated(), currentUser: req.user})
        } else {
            const tweets = await findAllTweets()
            res.render('home', {tweets, isAuthenticated: req.isAuthenticated(), currentUser: req.user})
        }
    } catch (error) {
        next(error)
    }
}

exports.showTweet = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId
        const tweet = await findTweetById(tweetId);
        const tweets = await findTweetsFromUsername(req.user._id);
        res.render('tweet/tweet-show', {tweet, comments: tweet.comments, isAuthenticated: req.isAuthenticated, currentUser: req.user, tweets})
    } catch (error) {
        next(error);
    }
}

exports.deleteTweet = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;
        await findTweetAndDelete(tweetId);
        res.redirect('/');
    } catch (error) {
        next(error);
    }
}

exports.displayTweet = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;
        const tweet = await findTweetById(tweetId);
        const tweets = await findTweetsFromUsername(req.user._id);
        if (tweet.author._id.toString() === req.user._id.toString()) {
            res.render('tweet/tweet-edit', { tweets, tweet, isAuthenticated: req.isAuthenticated, currentUser: req.user })
        } else {
            res.redirect('/')
        }
    } catch (error) {
        next(error)
    }
}

exports.updateTweet = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;
        const body = req.body;
        await findTweetAndUpdate(tweetId, body);
        res.redirect('/')
    } catch (error) {
        next(error)
    }
}

exports.tweetLike = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;
        const user = req.user;
        const tweet = await likeTweet(tweetId, user)
        res.render('includes/tweet/tweet-card', {tweet, isAuthenticated: req.isAuthenticated(), currentUser: req.user})
    } catch (error) {
        next(error)
    }
}

exports.shareTweet = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;
        await findAndShareTweet(tweetId, req.user._id)
        res.redirect('/')
    } catch (error) {
        next(error)
    }
}