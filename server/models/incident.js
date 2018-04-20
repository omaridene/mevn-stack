
var mongoose = require('mongoose');
//var user = require('./../models/user');

var addressSchema = new mongoose.Schema({
    place:{
        type: String, required: true, minlength: 1, trim: true
    },
    city:{type:String, required: true, minlength: 1, trim: true},
    coordinates: [Number],
    weight:Number,
    
});
var IncidentSchema = new mongoose.Schema({
    title:{
        type: String, required: true, minlength: 1, trim: true
    },
    description:{
        type: String, required: true, minlength: 1, trim: true
    },
    date:{
        type:Date,default:Date.now
    },
    address: {lat:{type: Number, default:36.8984667}  ,lng: {type: Number, default: 10.1897982}, place: {type:String, default:"ghazela" }, city: {type:String, default:"ariana" } },
    type:{
        type: String, required: true, minlength: 1, trim: true
    }

   //,createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
});
module.exports= mongoose.model('Incident',IncidentSchema);