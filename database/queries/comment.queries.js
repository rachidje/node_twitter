const Comment = require("../models/Comment.model");

exports.createNewComment = (body) => {
    console.log(body);
    const newComment = new Comment(body);
    return newComment.save();
}