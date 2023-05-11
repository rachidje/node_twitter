const User = require('../models/User.model');

exports.createNewUser = async (user) => {
    try {
        const hashedPassword = await User.hashPassword(user.password)

        const newUser = User({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            local: {
                email: user.email,
                password: hashedPassword,
            }
        })
        return newUser.save();
    } catch (error) {
        throw error;
    }
}

exports.findUserByEmail = (email) => {
    return User.findOne({'local.email' : email}).exec();
}

exports.findUserById = (id) => {
    return User.findById(id).exec();
}

exports.findUserByUsername = (username) => {
    return User.findOne({username: username}).exec();
}

exports.findUsersByQuerySearch = (search) => {
    const regExp = `^${search}`;
    const reg = new RegExp(regExp, 'i');
    return User.find({username: {$regex: reg}}).exec()
}

exports.addUserToCurrentUserFollowingList = async (currentUser, userId) => {
    currentUser.followings = [...currentUser.followings, userId]
    const user = await this.findUserById(userId);
    user.followers = [...user.followers, currentUser._id]
    currentUser.save()
    return user.save()
}

exports.removeUserFromCurrentUserFollowingList = async (currentUser, userId) => {
    currentUser.followings = currentUser.followings.filter(objId => objId.toString() !== userId.toString())
    const user = await this.findUserById(userId);
    user.followers = user.followers.filter(objId => objId.toString() !== currentUser._id.toString())
    currentUser.save()
    return user.save();
}