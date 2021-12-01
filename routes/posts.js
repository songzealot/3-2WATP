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

router.post('/newsList', async (req, res) => {
    const index = req.body.index;
    let list;
    if (index == 1) {
        list = await Article.find();
        sortedList = await Article.find().sort('-view');
    } else if (index == 2) {
        list = await Article.find().where('category').equals('정치');
        sortedList = await Article.find().where('category').equals('정치').sort('-view');
    } else if (index == 3) {
        list = await Article.find().where('category').equals('경제');
        sortedList = await Article.find().where('category').equals('경제').sort('-view');
    } else if (index == 4) {
        list = await Article.find().where('category').equals('사회');
        sortedList = await Article.find().where('category').equals('사회').sort('-view');
    } else if (index == 5) {
        list = await Article.find().where('category').equals('생활/문화');
        sortedList = await Article.find().where('category').equals('생활/문화').sort('-view');
    } else if (index == 6) {
        list = await Article.find().where('category').equals('세계');
        sortedList = await Article.find().where('category').equals('세계').sort('-view');
    } else if (index == 7) {
        list = await Article.find().where('category').equals('IT/과학');
        sortedList = await Article.find().where('category').equals('IT/과학').sort('-view');
    }
    res.json({ postList: list }, { sortedPostList: sortedList });
});



module.exports = router;