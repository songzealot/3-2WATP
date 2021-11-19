const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const config = require('../config/database');

// user 모델 정의
const UserSchema = mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    //로그인 ID
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        require: true
    }
});

const User = mongoose.model('User', UserSchema);

User.getUserById = function (id, callback) {
    User.findById(id, callback)
}

User.getUserByUsername = function (username, callback) {
    const query = { username: username };
    User.findOne(query, callback);
}

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

User.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw (err);
        callback(null, isMatch);
    });
}


module.exports = User;