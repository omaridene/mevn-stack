var express = require('express');
var router = express.Router();
var Incident = require("../models/incident");



router.get('/getAllIncidents', (req, res) => {
    Incident.find({}, 'Title Description Date adress type', function (error, incidents) {
    if (error) { console.error(error); }
    res.send({
        incidents: incidents
    })
}).sort({_id:-1})
})

module.exports = router;
