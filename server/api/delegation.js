var mongoose = require('mongoose');
var ObjectID = require('mongoose').Types.ObjectId;
var express = require('express');
var router = express.Router();
var Delegation = require('./../models/delegation');

router.post('/',function(req,res){
    console.log(req.body);
    var delegation = new Delegation(req.body);
    delegation.save().then(function(delegation){
        res.send(delegation);
    }).catch(function(err){
        res.status(400).send(err);
    })
});
module.exports = router;