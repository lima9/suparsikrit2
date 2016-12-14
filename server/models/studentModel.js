var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var mongooseUniqueValidator = require('mongoose-unique-validator');

var studentSchema = new Schema({
    name: {type: String, unique: true},
    description: {type: String},
    address: {type: String},
    phones: [
        {
            name: {type: String},
            address: {type: Number}
        }
    ]
});

studentSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('studentModel', studentSchema);