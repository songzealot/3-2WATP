const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');


// ---- GET ----
// 토큰에 해당하는 사용자 정보 반환(Angular에 쓰일 것, Bearer 토큰)
router.get('/profile', passport.authenticate("jwt", { session: false }), (req, res, next) => {
    res.json({
        user: {
            nickname: req.user.nickname,
            username: req.user.username
        }
    });
});

// ---- POST ----
// 회원가입
router.post('/register', (req, res) => {
    let newUser = new User({
        nickname: req.body.nickname,
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender
    });

    User.getUserByUsername(newUser.username, (err, user) => {
        if (err) throw err;
        if (user) {
            return res.json({ success: false, msg: "같은 ID 존재" });
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

module.exports = router;