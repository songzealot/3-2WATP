const mongoose = require('mongoose');
const User = require('./user');

const ArticleSchema = mongoose.Schema({
    post_date: {
        type: Date,
        required: true
    },
    reporter: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        required: true
    },
    view: {
        type: Number,
        required: true
    },
    comment_count: {
        type: Number,
        required: true
    }
});

const Article = mongoose.model('Article', ArticleSchema);

Article.getAricleInfoById = function (id, callback) {
    Article.findById(d, callback)
}

Article.addArticle = function (newArticle, callback) {
    newArticle.save(callback);
}

Article.deleteArticle = function (article, callback) {
    Article.remove()
}

Article.test = function () { }
// 작업 중




module.exports = Article