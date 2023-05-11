const Tweet = require("../models/Tweet.model");
const User = require("../models/User.model");


exports.createNewTweet = (body) => {
    const newTweet = new Tweet(body);
    return newTweet.save()
}

exports.findAllTweets = () => {
    return Tweet
        .find({})
        .populate('author')
        .populate({
            path: 'retweeted',
            populate: {
                path: 'initialTweet',
                populate: {
                    path: 'author'
                }
            }
        })
        .sort('-createdAt')
        .exec();
}

exports.findTweetsFromUsername = (authorId) => {
    return Tweet
        .find({ author: authorId })
        .populate('author')
        .populate({
            path: 'retweeted',
            populate: {
                path: 'initialTweet',
                populate: {
                    path: 'author'
                }
            }
        })
        .sort('-createdAt')
        .exec();
}

exports.getCurrentUserTweetsWithFollowing = (user) => {
    return Tweet
        .find({ author: { $in: [...user.followings, user._id]}})
        .populate('author')
        .populate({
            path: 'retweeted',
            populate: {
                path: 'initialTweet',
                populate: {
                    path: 'author'
                }
            }
        })
        .sort('-createdAt')
        .exec();
}

exports.findTweetAndDelete = (tweetId) => {
    return Tweet.findByIdAndDelete(tweetId).exec();
}

exports.findTweetById = (tweetId) => {
    return Tweet
        .findById(tweetId)
        .populate('author')
        .populate({
            path: 'comments', 
            populate: {path: 'author'}, 
            options: { 
                sort: { 'createdAt': -1 }
            }
        })
        .populate({
            path: 'retweeted',
            populate: {
                path: 'initialTweet',
                populate: {
                    path: 'author'
                }
            }
        })
        .exec();
}

exports.findTweetAndUpdate = (tweetId, body) => {
    return Tweet.findByIdAndUpdate(tweetId, {$set: body}).exec();
}

exports.likeTweet = async (tweetId, user) => {
    const tweet = await this.findTweetById(tweetId);
    if(!user.likedTweets.includes(tweet._id)) {
        tweet.nbLikes++;
        user.likedTweets.push(tweet._id)
    } else {
        tweet.nbLikes--;
        user.likedTweets = user.likedTweets.filter(tId => tId.toString() !== tweetId.toString())
    }
    user.save();
    return tweet.save()
}

exports.findAndShareTweet = async (tweetId, userId) => {
    const tweet = await Tweet.findById(tweetId).exec()
    const user = await User.findById(userId);

    user.tweetsShared = [...user.tweetsShared, tweet._id];
    tweet.nbShares++;
    
    const sharedTweet = new Tweet({
        content: tweet.content,
        retweeted: {
            status: true,
            initialTweet: tweet._id,
        },
        author: userId
    });
    user.save();
    tweet.save();
    return sharedTweet.save()
}
