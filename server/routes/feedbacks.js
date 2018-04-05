var express = require('express');
var router = express.Router();
var Feedback = require("../models/feedback");
var Incident = require("../models/incident");

/* GET home page. */

router.get('feedbacks', (req, res) => {
  res.send(
    [{
      title: "Hello feedbacks!",
      description: "Hi there! How are you?"
    },{
        title: "Hello feedbacks!",
        description: "Hi there! How are you?"
    }]
  )
})

// Add new feedback
router.post('/addFeedback', (req, res) => {
    var db = req.db;
var title = req.body.title;
var description = req.body.description;


Incident.findOne({Title:req.body.incident}, '', function (error, incident) {
    if (error) { console.error(error); }


    var new_feedback = new Feedback({
        title: title,
        description: description,
        incident : incident
    })

    new_feedback.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true
        })
    })
})
})





// Fetch all feedbacks
router.get('/getAllFeedbacks', (req, res) => {
    Feedback.find({},'', function (error, feedbacks) {
    if (error) { console.error(error); }
    res.send({
        feedbacks: feedbacks
    })
}).sort({_id:-1})
})





// Fetch single feedback
router.get('/feedback/:id', (req, res) => {
    var db = req.db;
Feedback.findById(req.params.id, 'title description date incident comments', function (error, feedback) {
    if (error) { console.error(error); }
    res.send(feedback)
})
})

// Get long and alt of incident of feedback
router.get('/feedback/incident/:place', (req, res) => {
var NodeGeocoder = require('node-geocoder');
var options = {
    provider: 'google',
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyB6kQ8I9KIPciT0EXioBjk91Nl_iQA6gQ8', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);

// Or using Promise
geocoder.geocode({address: req.params.place}, function(req, resGeo) {

    res.send({
        longitude: resGeo[0].longitude,
        latitude : resGeo[0].latitude
    })

});
})




// Update a feedback
router.put('/feedback/:id', (req, res) => {
    var db = req.db;
Feedback.findById(req.params.id, 'title description', function (error, feedback) {
    if (error) { console.error(error); }

    feedback.title = req.body.title
    feedback.description = req.body.description
    feedback.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true
        })
    })
})
})


// Delete a post
router.delete('/feedback/:id', (req, res) => {
    var db = req.db;
Feedback.remove({
    _id: req.params.id
}, function(err, feedback){
    if (err)
        res.send(err)
    res.send({
        success: true
    })
})
})




// Get the last feedback
router.get('/getLastFeedback', (req, res) => {
    Feedback.find({}, '', function (error, feedbacks) {
    if (error) { console.error(error); }
    res.send({
        feedbacks: feedbacks
    })
}).sort({date:-1}).limit(1)
})










// Add new comment
router.put('/feedback/:id/addComment', (req, res) => {
    var db = req.db;
Feedback.findById(req.params.id, 'title description comments', function (error, feedback) {
    if (error) { console.error(error); }
    if (!Array.isArray(feedback.comments)) {
        feedback.comments = [];
    }
    feedback.comments.push({
        content: req.body.content
    })
    feedback.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true
        })
    })
})
})

// Delete a comment
router.get('/feedback/:idF/deleteComment/:idC', (req, res) => {
Feedback.findOne({'_id': req.params.idF}, function (err, feedback) {
    feedback.comments.id(req.params.idC).remove();
    feedback.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true
        })
    })
});
})




// Get a comment from feedbacl
router.get('/feedback/:idF/getComment/:idC', (req, res) => {
    Feedback.findOne({'_id': req.params.idF}, function (err, feedback) {
    var comment=feedback.comments.id(req.params.idC);
    res.send({
        comment: comment
    })
});
})



// Update a comment
router.get('/feedback/:idF/updateComment/:idC/:content', (req, res) => {
    Feedback.findOne({'_id': req.params.idF}, function (err, feedback) {
    feedback.comments.id(req.params.idC).content=req.params.content;
    feedback.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true
        })
    })
});
})



module.exports = router;
