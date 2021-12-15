const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

// ---- GET ----
// 토큰에 해당하는 사용자 정보 반환(Angular에 쓰일 것, Bearer 토큰)
router.get('/profile', passport.authenticate("jwt", { session: false }), (req, res, next) => {


    if (req.user.status == '기자') {
        res.json({
            user: {
                nickname: req.user.nickname,
                username: req.user.username,
                age: req.user.age,
                gender: req.user.gender,
                status: req.user.status,
                newspaper_company: req.user.newspaper_company,
                subscribe_com: req.user.subscribe_com,
                subscribe_rep: req.user.subscribe_rep
            }
        });
    } else {
        res.json({
            user: {
                nickname: req.user.nickname,
                username: req.user.username,
                age: req.user.age,
                gender: req.user.gender,
                status: req.user.status,
                subscribe_com: req.user.subscribe_com,
                subscribe_rep: req.user.subscribe_rep
            }
        });
    }

});

// ---- POST ----
// 회원가입
router.post('/register', (req, res) => {
    let newUser = new User({
        nickname: req.body.nickname,
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        status: req.body.status,
        newspaper_company: req.body.newspaper_company
    });

    User.getUserByUsername(newUser.username, (err, user) => {
        if (err) throw err;
        if (user) {
            return res.json({ success: false, msg: "같은 ID 존재" });
        } else {
            User.find({ nickname: req.body.nickname }, (err, doc) => {
                if (doc) {
                    return res.json({ success: false, msg: "같은 닉네임 존재" });
                } else {
                    User.addUser(newUser, (err, user) => {
                        if (err) {
                            res.json({ success: false, msg: '회원가입 실패' });
                        } else {
                            res.json({ success: true, msg: '회원가입 완료' });
                        }
                    });
                }
            });
        }
    });
});

// 로그인 인증
router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: '존재하지 않는 유저' });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, msg: '로그인 오류 발생' });
            }
            if (isMatch) {
                let tokenUser = {
                    _id: user._id,
                    nickname: user.nickname,
                    username: user.username
                }
                //토큰 만료까지 1시간
                const token = jwt.sign({ data: tokenUser }, config.secret, { expiresIn: 3600 });
                res.json({
                    success: true,
                    token: token,
                    user: tokenUser,
                    msg: "로그인 성공"
                });
            } else {
                return res.json({ success: false, msg: '잘못된 비밀번호' });
            }
        });
    });
});

//기자 목록 가져오기
router.post('/reporterList', (req, res) => {
    const company = req.body.company;
    User.getReporter(company, (err, list) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, msg: '기자 목록 조회 오류 발생' });
        } else {
            return res.json({ success: true, list: list, msg: `${company}의 기자 목록 조회됨` });
        }
    });
});

//기자 정보 가져오기
router.post('/reporterInfo', (req, res) => {
    User.findOne({ username: req.body.username }, (err, doc) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, msg: '조회 오류 발생' });
        } else {
            if (doc) {
                return res.json({ success: true, reporter: doc, msg: '기자 조회됨' });
            } else {
                return res.json({ success: false, msg: '해당 사용자 없음' });
            }
        }
    });
});

router.post('/updateUser', (req, res) => {
    User.findOne({ username: req.body.username }, (err, doc) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, msg: '조회 오류 발생' });
        } else {
            if (doc) {
                doc.save();
                return res.json({ success: true, msg: '사용자 정보 수정됨' });
            } else {
                return res.json({ success: false, msg: '해당 사용자 없음' });
            }
        }
    });
});

//구독
router.post('/goSubscribe', (req, res) => {
    User.findOne({ username: req.body.username }, (err, doc) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, msg: '조회 오류 발생' });
        } else {
            if (doc) {
                if (req.body.type == 'reporter') {
                    console.log(doc);
                    doc.subscribe_rep.push(req.body.value);
                } else if (req.body.type == 'company') {
                    doc.subscribe_com.push(req.body.value);
                }
                doc.save();
                return res.json({ success: true, msg: '구독' });
            } else {
                return res.json({ success: false, msg: '해당 사용자 없음' });
            }
        }
    });
});

//구독 취소
router.post('/unSubscribe', (req, res) => {
    User.findOne({ username: req.body.username }, (err, doc) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, msg: '조회 오류 발생' });
        } else {
            if (doc) {
                if (req.body.type == 'reporter') {
                    doc.subscribe_rep.splice(doc.subscribe_rep.indexOf(req.body.value), 1);
                } else if (req.body.type == 'company') {
                    doc.subscribe_rep.splice(doc.subscribe_com.indexOf(req.body.value), 1);
                }
                doc.save();
                return res.json({ success: true, msg: '구독 취소' });
            } else {
                return res.json({ success: false, msg: '해당 사용자 없음' });
            }
        }
    });
});

module.exports = router;