const express = require('express');
const app = express();
const ServerReportRouter = express.Router();

const ServerReport = require('../models/PotholeReport');

ServerReportRouter.route('/add').post(function (req, res) {
  const serverreport = new ServerReport(req.body);
  serverreport.save()
    .then(serverreport => {
        res.json('Report added successfully');
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

ServerReportRouter.route('/').get(function (req, res) {
    ServerReport.find(function (err, serverreports){
    if(err){
      console.log(err);
    }
    else {
      res.json(serverreports);
    }
  });
});

ServerReportRouter.route('/edit/:id').get(function (req, res) {
  const id = req.params.id;
  ServerReport.findById(id, function (err, serverreport){
      res.json(serverreport);
  });
});

ServerReportRouter.route('/update/:id').post(function (req, res) {
    ServerReport.findById(req.params.id, function(err, serverreport) {
    if (!serverreport)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      serverreport.user = req.body.user;
      serverreport.latitude = req.body.latitude;
      serverreport.longitude = req.body.longitude;
      serverreport.state = req.body.state;

      serverreport.save().then(serverreport => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

ServerReportRouter.route('/delete/:id').get(function (req, res) {
    ServerReport.findByIdAndRemove({_id: req.params.id},
       function(err, serverreport){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = ServerReportRouter;