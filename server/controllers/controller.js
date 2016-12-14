var mongoose = require('mongoose');
var studentModel = mongoose.model('studentModel');
var subjectModel = mongoose.model('subjectModel');
var jwt = require('jsonwebtoken');
var express = require("express");
var app = express();
var config = require('../config/config');
app.set('superSecret', config.secret);
var crypto = require('crypto');

/**GET list of all students**/
exports.findAllStudents = function (req, res) {
    studentModel.find(function (err, students) {
        if (err) res.send(500, err.message);
        res.status(200).jsonp(students);
    });
};

/**POST add new student to DB**/
exports.addStudent = function (req, res) {
    var student = new studentModel({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        phones: {
            name: req.body.name2,
            address: req.body.address2
        }
    });
    student.save(function (err, student) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(student);
    });
};

/**GET Find student by student._id**/
exports.findStudentById = function (req, res) {
    studentModel.findById(req.params.id, function (err, student) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(student);
    });
};

/**GET a list of all Subjects**/
exports.findAllSubjects = function (req, res) {
    subjectModel.find(function (err, subjects) {
        if (err) res.send(500, err.message);
        res.status(200).jsonp(subjects);
    });
};

/**GET a list of all Subjects filtered by name**/
exports.findAllSubjectsByname = function (req, res) {
    subjectModel.find({name:req.params.name},function (err, subjects) {
        if (err) res.send(500, err.message);
        res.status(200).jsonp(subjects[0]);
    });
};

/**GET a list of all Subjects fitered by when**/
exports.findAllSubjectsBywhen = function (req, res) {
    subjectModel.find({when: req.params.when}, function (err, subjects) {
        if (err) res.send(500, err.message);
        res.status(200).jsonp(subjects[0]);
    });
};

/**GET show number of students in Subjects**/
/*exports.countStudents = function(req,res){
    subjectModel.students.aggregate( {
        $group: {
            _id: req.body.id,
                total: { $sum: { $size:"students" } }
        }
    }).exec(function(error, subject) {
        console.log(JSON.stringify(subject, null, "\t"));
        res.status(200).jsonp(subject);
});*/


/**GET subject by subject._id**/
exports.findSubjectById = function(req, res) {
    subjectModel.findById(req.params.id, function(err) {
        if(err) return res.send(500, err.message);
    })
        .populate('students')
        .exec(function(error, subject) {
            console.log(JSON.stringify(subject, null, "\t"));
            res.status(200).jsonp(subject);
        });
};

/**POST add subject to DB**/
exports.addSubject = function (req, res) {
    var subject = new subjectModel({
        name:req.body.name,
        when: req.body.when
    });
    subject.save(function (err) {
        if (err) return res.send(500, err.message);
        subjectModel.find(function (err, subjects) {
            if (err) res.send(500, err.message);
            res.status(200).jsonp(subjects);
        });
    });
};


/**POST insert student into subject collection**/
exports.addStudentToSubject = function (req, res) {
    /**First add student to DB**/
    var student = new studentModel({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        phones: {
            name: req.body.name2,
            address: req.body.address2
        }
    });
    student.save(function (err, student) {
        if (err) return res.send(500, err.message);
        /**Using populate see here: https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/ **/
        /**We insert the student inside the Subject collection**/
        subjectModel.find({
            _id: req.params.id
        }, function (err, subjects) {
            if (err) return res.send(500, err.message);
            console.log("subjects:");
            console.log(subjects);
            var subject = subjects[0];
            subject.students.push(student._id);
            subject.save(function (err, subject) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(subject);
            });
        });
    });
};
