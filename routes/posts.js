const express = require('express');
const config = require('../config/database');
const router = express.Router();
const Article = require('../models/article');
const mongoose = require('mongoose');


router.post(`/postView`, (req, res) => {
    // const ObjectId = mongoose.Types.ObjectId;
    // obj_id = ObjectId(req.body._id);
    //'61a6681fb36daab8410e8cc9'
    const _id = mongoose.Types.ObjectId(String(req.body._id));
    Article.findById(_id, (err, doc) => {
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

router.post('/newsList', (req, res) => {
    const index = req.body.index;
    console.log(index);
    switch (index) {
        case 1:
            res.json(Article.find());
    }
});



module.exports = router;