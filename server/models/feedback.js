var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Incident = require('./incident')

var addressSchema = new mongoose.Schema({
    place:{
        type: String, required: true, minlength: 1, trim: true
    },
    city:{type:String, required: true, minlength: 1, trim: true},
    coordinates: [Number],
    weight:Number,

});
var IncidentSchema = new mongoose.Schema({
    Title:{
        type: String, required: true, minlength: 1, trim: true
    },
    Description:{
        type: String, required: true, minlength: 1, trim: true
    },
    Date:{
        type:Date,default:Date.now
    },
    address: addressSchema,
    type:{
        type: String, required: true, minlength: 1, trim: true
    }

    //,createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
});






var commentSchema = mongoose.Schema({
    content:{type:String},
    date:{type:Date,default:Date.now}
});


var FeedbackSchema = new Schema({
  title: String,
  description: String,
date:{type:Date,default:Date.now()},
    comments : [commentSchema],
    incident : String,
    degree : {type: Number}


});

var Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;
