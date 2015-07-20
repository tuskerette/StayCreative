var express = require('express');
var router = express.Router();
var pdf = require('html-pdf');
var options = { format: 'Letter'};

router.post('/pdf', function(req, res, next) {
  var html = req.body.pdfSource;

  pdf.create(html, options).toBuffer(function(err, buffer) {
    if (err) {
      return next(err);
    } else {
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=mypost.pdf'
      });
      res.status(200);
      res.send(buffer);
    }
  });


});


module.exports = router;
