const mongoose = require('mongoose')
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = schema({
    username: {type: String, required: true, unique: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    local: {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true}
    },
    avatar: {
        type: String,
        default: '/images/default_profile.png'
    },
    followings: { type: [schema.Types.ObjectId], ref: 'user'},
    followers: { type: [schema.Types.ObjectId], ref: 'user'},
    likedTweets: {type: [schema.Types.ObjectId], ref: 'tweet'},
    tweetsShared: {type: [schema.Types.ObjectId], ref: 'tweet'},
}, {
    timestamps: true
})

userSchema.virtual('fullName').get(function() {
    return `${this.firstname} ${this.lastname}`;
})

userSchema.statics.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt)
    } catch (error) {
        throw error;
    }
}

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.local.password)
}

const User = mongoose.model('user', userSchema);

module.exports = User;