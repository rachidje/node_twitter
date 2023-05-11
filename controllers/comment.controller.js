const { createNewComment } = require("../database/queries/comment.queries");
const { findTweetById, findTweetsFromUsername } = require("../database/queries/tweet.queries");

exports.newComment = async (req, res, next) => {
    const body = req.body;
    const tweetId = req.params.tweetId;

    try {
        const tweet = await findTweetById(tweetId);
        const newComment = await createNewComment({...body, author: req.user})
        tweet.comments.push(newComment._id);
        tweet.save();
        res.redirect(`/tweet/${tweetId}`);
    } catch (error) {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);
        const tweet = await findTweetById(tweetId);
        const tweets = await findTweetsFromUsername(req.user._id);
        res.render('tweet/tweet-show', {errors, tweet, comments: tweet.comments, isAuthenticated: req.isAuthenticated, currentUser: req.user, tweets})
    }
}