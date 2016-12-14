var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var mongooseUniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
    username: {type: String, unique: true},
    password: {type: String},
    token: {type: String},
    description: {type: String},
    avatar: {type: String},
    email: {type: String},
    posts: [{
        title: {type: String},
        content: {type: String},
        date: {type: Date},
        likes: [{
            username: {type: String},
            avatar: {type: String},
            date: {type: Date}
        }]
    }]
});

userSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('userModel', userSchema);
