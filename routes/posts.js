const express = require('express');
const config = require('../config/database');
const router = express.Router();
const Article = require('../models/article');
const Comment = require('../models/comment');
const mongoose = require('mongoose');

// 기사 보기
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
                doc.view = doc.view + 1;
                doc.save();
                return res.json({ success: true, article: doc, _id: req.body._id });
            } else {
                return res.json({ success: false, msg: "존재하지 않는 문서" });
            }
        }
    });
});

// 기사 조회
router.post('/newsList', async (req, res) => {
    const index = req.body.index;
    let list;
    let sortedList;
    if (index == 1) {
        list = await Article.find().sort('-post_date');
        sortedList = await Article.find().sort('-view');
    } else if (index == 2) {
        list = await Article.find().where('category').equals('정치').sort('-post_date');
        sortedList = await Article.find().where('category').equals('정치').sort('-view');
    } else if (index == 3) {
        list = await Article.find().where('category').equals('경제').sort('-post_date');
        sortedList = await Article.find().where('category').equals('경제').sort('-view');
    } else if (index == 4) {
        list = await Article.find().where('category').equals('사회').sort('-post_date');
        sortedList = await Article.find().where('category').equals('사회').sort('-view');
    } else if (index == 5) {
        list = await Article.find().where('category').equals('생활/문화').sort('-post_date');
        sortedList = await Article.find().where('category').equals('생활/문화').sort('-view');
    } else if (index == 6) {
        list = await Article.find().where('category').equals('세계').sort('-post_date');
        sortedList = await Article.find().where('category').equals('세계').sort('-view');
    } else if (index == 7) {
        list = await Article.find().where('category').equals('IT/과학').sort('-post_date');
        sortedList = await Article.find().where('category').equals('IT/과학').sort('-view');
    }
    res.json({ postList: list, sortByViewList: sortedList });
});

// 신문사, 카테고리별 기사 목록
router.post('/companyPost', async (req, res) => {
    const category = req.body.category;
    const company = req.body.company;
    let list;
    if (category == 1) {
        list = await Article.find({ newspaper_company: company }).sort('-post_date');
    } else if (category == 2) {
        list = await Article.find({ newspaper_company: company }).where('category').equals('정치').sort('-post_date');
    } else if (category == 3) {
        list = await Article.find({ newspaper_company: company }).where('category').equals('경제').sort('-post_date');
    } else if (category == 4) {
        list = await Article.find({ newspaper_company: company }).where('category').equals('사회').sort('-post_date');
    } else if (category == 5) {
        list = await Article.find({ newspaper_company: company }).where('category').equals('생활/문화').sort('-post_date');
    } else if (category == 6) {
        list = await Article.find({ newspaper_company: company }).where('category').equals('세계').sort('-post_date');
    } else if (category == 7) {
        list = await Article.find({ newspaper_company: company }).where('category').equals('IT/과학').sort('-post_date');
    }
    res.json({ companyPost: list });
});

// 기사 좋아요 추가
router.post('/likeUp', (req, res) => {
    const _id = mongoose.Types.ObjectId(String(req.body._id));
    Article.findById(_id, (err, doc) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, msg: "오류 발생" });
        } else {
            if (doc) {
                if (!doc.likeUser) {
                    doc.likeUser = [req.body.nickname];
                    doc.like = doc.like + 1;
                    doc.save();
                    return res.json({ success: true, msg: "첫번째 좋아요" });
                } else {
                    if (doc.likeUser.includes(req.body.nickname)) {
                        return res.json({ success: false, msg: "이미 추천한 기사입니다." });
                    } else {
                        doc.likeUser.push(req.body.nickname);
                        doc.like = doc.like + 1;
                        doc.save();
                        return res.json({ success: true, msg: "좋아요" });
                    }
                }
            } else {
                return res.json({ success: false, msg: "존재하지 않는 문서" });
            }
        }
    });
});

router.post('/addComment', (req, res) => {
    const comment_date = new Date();
    const newComment = new Comment({
        comment_date: comment_date,
        writer: req.body.writer,
        target: req.body.target,
        contents: req.body.contents,
        like: 0,
        commentType: 'co'
    });
    console.log(newComment);
    newComment.save((err) => {
        if (err) {
            return res.json({ success: false, msg: "오류 발생1" });
        } else {
            const _id = mongoose.Types.ObjectId(String(req.body.target));
            Article.findById(_id, (err, doc) => {
                if (err) {
                    return res.json({ success: false, msg: "오류 발생2" });
                } else {
                    doc.comment_count = doc.comment_count + 1;
                    doc.save();
                    return res.json({ success: true, msg: "댓글 추가됨" });
                }
            });
        }
    });
});

router.post('/commentView', async (req, res) => {
    const _id = mongoose.Types.ObjectId(String(req.body._id));
    let list = await Comment.find({ target: _id, commentType: 'co' });
    for (var i in list) {
        list[i].re = [];
        for (reComment of list[i].commentList) {
            const re_id = mongoose.Types.ObjectId(String(reComment));
            Comment.findById(re_id, (err, doc) => {
                if (err) {
                    return res.json({ success: false, msg: "대댓 오류 발생" });
                } else {
                    list[i].re.push(doc);
                }
            });
        }
    }
    return res.json({ commentList: list });
});

module.exports = router;