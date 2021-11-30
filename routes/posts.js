const express = require('express');
const config = require('../config/database');
const router = express.Router();
const Article = require('../models/article');


router.post(`/postView`, (req, res) => {
    Article.findById(req.body._id, (err, doc) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, msg: "오류 발생" });
        } else {
            if (doc) {
                return res.json({ success: true, article: doc });
            } else {
                return res.json({ success: false, msg: "존재하지 않는 문서" });
            }
        }
    });
});

router.post('/postList', (req, res) => {

});



module.exports = router;