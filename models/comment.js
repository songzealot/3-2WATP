const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    comment_date: {
        type: Date,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        required: true
    },
    likeUser: {
        type: Array,
        required: false
    },
    commentList: {
        type: Array,
        required: false
    },
    commentType: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;