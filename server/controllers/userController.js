var mongoose = require('mongoose');
var userModel = mongoose.model('userModel');
var subjectModel = mongoose.model('subjectModel');
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var express = require("express");
var app = express();
var config = require('../config/config');
app.set('superSecret', config.secret);
var crypto = require('crypto');

/**GET list of all users**/
exports.findAllUsers = function (req, res) {
    userModel.find(function (err, users) {
        if (err) res.send(500, err.message);
        for (var i = 0; i < users.length; i++) {
            users[i].password = "";
            users[i].token = "";
            console.log(users[i].password);
        }
        console.log('GET /users');
        res.status(200).jsonp(users);
    });
};

/** GET user by user._id**/
exports.findById = function (req, res) {
    userModel.findById(req.params.id, function (err, user) {
        if (err) return res.send(500, err.message);
        console.log('GET /users/' + req.params.id);
        if (user != null) {
            user.password = "";
            users.token = "";
        }
        res.status(200).jsonp(user);
    });
};


/**GET user by username**/
exports.findUserByUsername = function (req, res) {
    userModel.find({
        username: req.params.username
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({success: false, message: 'no user found'});
        } else if (user) {
            user.password = "";
            users.token = "";
            console.log(user);
            res.status(200).jsonp(user[0]);
        }
    });
};

/**POST add new user to DB - Register**/
exports.addUser = function (req, res) {
    console.log('POST new user, name: ' + req.body.username);
    var user = new userModel({
        username: req.body.username,
        password: crypto.createHash('sha256').update(req.body.password).digest('base64'),
        description: req.body.description,
        avatar: req.body.avatar,
        email: req.body.email
    });
    if (user.username == undefined) {
        return res.status(500).jsonp("empty inputs");
    } else if (user.password == undefined) {
        return res.status(500).jsonp("empty inputs");
    } else if (user.email == undefined) {
        return res.status(500).jsonp("empty inputs");
    }
    user.save(function (err, user) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(user);
    });
};

/**POST add new post**/
exports.newpost = function (req, res) {
    userModel.find({
        token: req.headers['x-access-token']
    }, function (err, users) {
        user = users[0];
        var post = {
            title: req.body.title,
            content: req.body.content,
            date: new Date()
        };
        user.posts.push(post);
        user.save(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(users);
        });
    });
};

/**POST user login - authentication**/
exports.login = function (req, res) {
    userModel.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else if (user) {
            req.body.password = crypto.createHash('sha256').update(req.body.password).digest('base64');
            if (user.password != req.body.password) {
                res.json({success: false, message: 'Authentication failed. Wrong password.'});
            } else {
                var token = jwt.sign(user, app.get('superSecret'), {});
                user.token = token;
                user.save(function (err, user) {
                    if (err) return res.send(500, err.message);
                    console.log(user);
                    user.password = "";
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        avatar: user.avatar,
                        userid: user._id,
                        userdata: user,
                        user: user
                    });
                });
            }
        }
    });
};
