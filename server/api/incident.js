var mongoose = require('mongoose');
var ObjectID = require('mongoose').Types.ObjectId;
var express = require('express');
var router = express.Router();
var Incident = require('./../models/incident');
var Delegation = require('./../models/delegation');
var NodeGeocoder = require('node-geocoder');
var geodist = require('geodist');
var geolocation = require('geolocation');
const location = require('@derhuerst/location');

var options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyBkS1gbM2smmuUJurvV0sj-jU3UaAsQB3I', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);
var place="";
var defaultRadius = 20;
var deleg="";
var radius;

router.get('/',function (req,res) {
    Incident.find(function (err,incidents) {
        if(err)
            res.send(err);
        if(!incidents)
            res.status(404).send();
        else
            res.json(incidents);
    })
});
router.get('/current', function(req, res) {
    var lng;
    var lat;
    location((err, loc) => {
        if (err) console.error(err)
        else console.log(loc.latitude)
        lng=loc.longitude;
        lat=loc.latitude;
    })
    var array = [];
    Incident.find(function (err,incidents) {
        for (let i = 0; i < incidents.length; i++) {
            // console.log(response.data[i].address.coordinates[0])
            console.log({lat: incidents[i].address.coordinates[0], lng: incidents[i].address.coordinates[1]});
            var dist = geodist({lat: 36.903533129999985, lon: 10.185571569999997,}, {lat: incidents[i].address.coordinates[0], lon: incidents[i].address.coordinates[1]})
            console.log(dist) 
            if (dist <= 40) {
                inc={
                    _id: incidents[i]._id,
                    Title: incidents[i].Title,
                    Description: incidents[i].Description,
                    Lng: incidents[i].address.coordinates[1],
                    lat: incidents[i].address.coordinates[0],
                    type: incidents[i].type,
                    distance: dist
                }
                array.push(inc);
            }
          }
          console.log(array.length);
          res.json(array);
            //console.log(incidents.length);
    })
    
});

router.post('/',function(req,ress){
    
    console.log(req.body.address.coordinates[0]+" - "+req.body.address.coordinates[1]);
    geocoder.reverse({lat:req.body.address.coordinates[0], lon:req.body.address.coordinates[1]}, function(err, res) {
        // console.log(res[0].administrativeLevels.level2long);
        place=res[0].administrativeLevels.level2long;
        //console.log("----////"+place);
        Delegation.find({"nom":place}).exec(function (err,delegation) {
            var nbrB = delegation[0].nbrBraquage;
            var weight = delegation[0].Weight;
            var pop = delegation[0].population;
            deleg = delegation[0];
            var newString = place.replace(new RegExp(/[èéêë]/g),"e");
            if (nbrB <= (pop*(3/10000))) {
                req.body.address.weight = defaultRadius;
                //console.log(req.body.address.weight);
            }else{
                if ((nbrB/(pop*(3/10000)))*20 > 250) {
                    radius = 250;
                }
                radius = (nbrB/(pop*(3/10000)))*20;
                req.body.address.weight = radius;
                //console.log((nbrB/(pop*(3/10000)))*20);
            }
            var incident = new Incident(req.body);
            incident.save().then(function(incident){
                updateDelegation(deleg);
                ress.send(incident);
            }).catch(function(err){
                ress.status(400).send(err);
            })
      });
      
      })
    
});
function updateDelegation(del) {
    Delegation.update({_id: del._id},
                {
                    nbrBraquage: del.nbrBraquage+1,
                    Weight: del.Weight+1
        
                }, function(err){
                    if(err) console.log("no");
                    else
                      console.log("yes");
                });
}
module.exports = router;