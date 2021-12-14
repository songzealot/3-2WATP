const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const config = require('../config/database');

// user 모델 정의
const UserSchema = mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    // 로그인 ID
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    status: {
        type: String,
        required: true
    },
    newspaper_company: {
        type: String,
        required: false
    }
});

// 몽고DB User 모델 생성
const User = mongoose.model('User', UserSchema);

// 몽고DB 데이터 id로 찾기
User.getUserById = function (id, callback) {
    User.findById(id, callback)
}

// 몽고DB username으로 찾기
User.getUserByUsername = function (username, callback) {
    const query = { username: username };
    User.findOne(query, callback);
}

// 몽고DB에 유저 계정 데이터 추가
User.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            //if (err) throw err;
            if (err) {
                console.log(err);
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

// 비밀번호 해시 비교
User.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw (err);
        callback(null, isMatch);
    });
}

// 기자 목록
User.getReporter = async function (company, callback) {
    let list;
    list = await User.find().where('newspaper_company').equals(company).sort('nickname').exec();
    callback(null, list);
}

module.exports = User;