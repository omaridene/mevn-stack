var express = require('express');
var router = express.Router();
var Incident = require("../models/incident");


// Fetch all incidents 
router.get('/getAllIncidents', (req, res, next) => {
    Incident.find(function (err, incidents){
        if(err) return next(err);
        res.json(incidents);
    });
});
// Fetch incident details
router.get('/incident/:id', (req, res, next) => {
    var db = req.db;
    Incident.findById(req.params.id, function (error, incident) {
    if (error) { console.error(error); }
    res.json(incident)
})
})
// Add new incident
router.post('/addIncident', (req, res, next) => {
var db = req.db;
var title = req.body.title;
var description = req.body.description;
var date = req.body.date;
var type = req.body.type;


var new_Incident = new Incident({
    title: title,
    description: description,
    date : date,
    type: type
})

new_Incident.save(function (error) {
    if (error) {
        console.log(error)
    }
    res.send({
        success: true
    })
})
})

module.exports = router;
