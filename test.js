var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('pdftest.html', 'utf8') // here I have to add the html
// file coming from the front end
var options = { filename: './pdftest.pdf', format: 'Letter'};

pdf.create(html, options).toBuffer(function(err, buffer) {
  if (err) {return console.log(err);
  console.log(buffer); // { filename: '/tmp/html-pdf-8ymPV.pdf' }

});





// // Make a post request to get the html object from the front end and
// // turn it into a pdf and
// router.post('/pdf', function(req, res, next) {
//   res.body('/public/app/views/mypost.html', { title: 'StayCreative', pdf: req.pdf }); //it should not be res.render...maybe res.json? not sure
// });


// // pdf code to create the file, must go into -after- the post request.
// // But maybe I want to use toStream or toBuffer, because I want the user to save it on his/her
// // computer, not on the server.



// // API

// // do not use this one (maybe)
// pdf.create(html).toFile([filepath, ]function(err, res){
//   console.log(res.filename);
// });


// // use either toStream or toBuffer (maybe)
// pdf.create(html).toStream(function(err, stream){
//   steam.pipe(fs.createWriteStream('./foo.pdf'));
// });






// module.exports = router;
