const mongoose = require('mongoose');

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
    contents: {
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
    likeUser: {
        type: Array,
        required: false
    },
    view: {
        type: Number,
        required: true
    },
    comment_count: {
        type: Number,
        required: true
    },
    newspaper_company: {
        type: String,
        required: true
    }

});

const Article = mongoose.model('Article', ArticleSchema);


Article.addArticle = function (newArticle, callback) {
    newArticle.save(callback);
}

Article.deleteArticle = function (article, callback) {
    Article.remove()
}

Article.test = function () { }
// 작업 중




module.exports = Article;