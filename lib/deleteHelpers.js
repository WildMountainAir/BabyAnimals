//dependencies
var path = require('path');
var client = require('./knoxHelpers').awsClient();
var fs = require('fs');
var knox = require('knox');
var ImageMetaData = require('../app/models/imageMetaData');
var imagePath = path.join(__dirname, './../data/images/');

//delete requested image from s3 bucket
module.exports = {
  deleteFromS3: function(req, res) {
    var s3del = client.del(req.key);

    s3del.on('response', function(res) {
      res.on('error', function(err) {
        console.error('</3');
        throw err;
      });
    });

    s3del.end();
  },

  //delete requested image from disc
  deleteFromFs: function(req, res) {
    fs.exists(imagePath + req.key + '.jpg', function(exists) {
      if (exists) {
        fs.unlink(imagePath + req.key + '.jpg', function(err) {
          if (err) {
            console.error('</3');
            throw err;
          }
        });
      }
    }); 
  },

  //delete requested image from db
  deleteFromDb: function(req, res) {
    ImageMetaData.remove({key: req.key}, function(err) {
      if (err) {
        throw err;
      }
    });
  }
};