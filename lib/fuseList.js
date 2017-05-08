var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');

function fuseListRoute() {
    var fuseList = new express.Router();
    fuseList.use(cors());
    fuseList.use(bodyParser());


    // GET REST endpoint - query params may or may not be populated
    fuseList.all('/', function(req, res) {
        // 2016 FUSE URL (Pending Fuse deployment on OpenShift + AWS for public IP's):
        // http://opportunityservice-summit.apps.ose.rhsummit.openshift.online/opportunity/getList

        // API Gateway Public URL
        //https://api-2445581571008.staging.apicast.io:443/opportunity/getList?user_key=d9d56b91ffe6fcc38e707274c60e9478
        // curl -X GET "https://fuse.34.210.10.237.xip.io:443/demo/opportunity/getList?user_key=15b351fb171f504a48c05c04906cf1f2" -H 'user-key: 15b351fb171f504a48c05c04906cf1f2' -k

        // 2017 FUSE curl:
        // curl -X GET http://salesforce-summitsf.apps.ocp.hucmaggie.com/demo/opportunity/getList

        // 2017 3Scale curl:
        // curl "http://fuse.34.210.10.237.xip.io/demo/opportunity/getList" -H'user-key: 15b351fb171f504a48c05c04906cf1f2' -k

        var getListUrl = 'http://' + process.env.FUSE_HOST + ':' + process.env.FUSE_PORT + '/demo/opportunity/getList';

        request.get({
            url: getListUrl,
            headers: {
                // for 3Scale
                "user-key" : "15b351fb171f504a48c05c04906cf1f2"
            },
            json: true
        }, function(error, response, body) {
            if (error) {
                return res.status(500).json(error);
            }
            console.log(request + body);
            return res.json(body);
        });
    });

    return fuseList;
}

module.exports = fuseListRoute;
