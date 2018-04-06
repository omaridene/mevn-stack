var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    firstName:{
        type: String, required: true, minlength: 1, trim: true
    },
    lastName:{
        type: String, required: true, minlength: 1, trim: true
    },
    CIN:{
        type: String, required: true, maxlength: 8,maxlength: 8, trim: true
    },
    Phone:{
        type: String, required: true, minlength: 1, trim: true
    },
    Email:{
        type: String, required: true, minlength: 1, trim: true
    },
    Gendre:{
        type: String, required: true, minlength: 1, trim: true
    },
    receiverPhone:{
        type: String, required: true, minlength: 1, trim: true
    },
    password:{
        type: String, required: true, minlength: 1, trim: true
    },
    birthDate:{type:Date,default:Date.now},
});
module.exports= mongoose.model('User',UserSchema);