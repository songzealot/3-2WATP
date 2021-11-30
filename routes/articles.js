const express = require('express');
const config = require('../config/database');
const router = express.Router();
const Article = require('../models/article');



router.post('/post_article', (req, res) => {
    const post_date = new Date();
    const newArticle = new Article({
        post_date: post_date,
        reporter: req.body.reporter,
        title: req.body.title,
        contents: req.body.contents,
        category: req.body.category,
        like: 0,
        view: 0,
        comment_count: 0,
        newspaper_company: req.body.newspaper_company
    });
    Article.addArticle(newArticle, (err) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, msg: "오류 발생" });
        } else {
            res.json({ success: true, msg: "기사 업로드됨" });
        }
    });
});

router.post('/delete_article', (req, res) => {

});


module.exports = router;