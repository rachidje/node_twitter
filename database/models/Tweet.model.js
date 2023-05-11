const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tweetSchema = schema({
    content: {
        type: String,
        maxlength: [146, 'le tweet est trop long !'],
        minlength: [5, 'le tweet est trop court !'],
        required: [ true, "Le contenu ne peut etre vide" ]
    },
    author: {
        type: schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    comments: {
        type: [schema.Types.ObjectId],
        ref: 'comment'
    },
    nbLikes: {type: Number, default: 0},
    nbShares: {type: Number, default: 0},
    retweeted: {
        status: {type: Boolean, default: false},
        initialTweet: {type: schema.Types.ObjectId, ref: 'tweet'},
    },
    image: {
        type: String
    }
}, {
    timestamps: true
})

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;