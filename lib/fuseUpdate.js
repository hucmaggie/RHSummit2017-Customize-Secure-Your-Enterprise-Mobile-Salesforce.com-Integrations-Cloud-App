var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');

function fuseUpdateRoute() {
    var fuseUpdate = new express.Router();
    fuseUpdate.use(cors());
    fuseUpdate.use(bodyParser());


    // GET REST endpoint - query params may or may not be populated
    fuseUpdate.get('/', function(req, res) {
        // 2016 FUSE URL (Pending Fuse deployment on OpenShift + AWS for public IP's):
        // http://localhost:9191/opportunity/updateOpp/<SF_ID>/PROSPECTING
        // http://opportunityservice-summit.apps.ose.rhsummit.openshift.online/opportunity/updateOpp/00628000008yT2Y/CLOSEWON

        // API Gateway Public URL
        //https://api-2445581571008.staging.apicast.io:443/opportunity/updateOpp/{sfid}/PROSPECTING?user_key=d9d56b91ffe6fcc38e707274c60e9478

        // 2017 FUSE curl
        // curl -X POST http://salesforce-summitsf.apps.ocp.hucmaggie.com/demo/opportunity/updateOpp -H 'id: 006460000042i0iAAA' -H 'stagestatus: CLOSEWON’

        // 2017 3Scale curl
        //curl -X POST "http://fuse.34.210.10.237.xip.io/demo/opportunity/updateOpp" -H 'id: 006460000042i0iAAA' -H 'stagestatus: CLOSEWON'  -H'user-key: 15b351fb171f504a48c05c04906cf1f2' -k --verbose

        var optId = req.query.optId;
        //var updateOppUrl = 'http://' + process.env.FUSE_HOST + ':' + process.env.FUSE_PORT + '/demo/opportunity/updateOpp/' + optId + "/CLOSEWON";
        var updateOppUrl = 'http://' + process.env.FUSE_HOST + ':' + process.env.FUSE_PORT + '/demo/opportunity/updateOpp';

        request.post({
            url: updateOppUrl,
            headers: {
                "id" : optId,
                "stagestatus" : "CLOSEWON",
                // for 3Scale
                "user-key" : "15b351fb171f504a48c05c04906cf1f2"
            },
            json: true
        }, function(error, response, body) {
            if (error) {
                return res.status(500).json(error);
            }
            //return res.json({msg: 'Opportunity: ' + optId + ' has been successfully closed.'});
            return res.json(body);
        });
    });

    return fuseUpdate;
}

module.exports = fuseUpdateRoute;
