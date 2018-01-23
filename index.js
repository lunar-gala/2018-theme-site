var express = require('express')
var path = require('path')
var app = express()


app.use(express.static(path.join(__dirname,'./public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})
app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})
app.get('/lines', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})
app.get('/testAnimation',function(req,res){
  res.sendFile(path.join(__dirname, '/public/animationTest.html'));
});

// app.get(/^\/(lines|people)$/, function (req, res) {
//     res.sendFile(__dirname + '/public/' + req.path + '.html');
// });

//testing the ajax requests
app.get("/test/about", function (req, res) {
    res.sendFile(__dirname + '/public/testAjax.html');
});
app.get("/test/lines", function (req, res) {
    res.sendFile(__dirname + '/public/testAjax.html');
});
app.get("/test/people", function (req, res) {
    res.sendFile(__dirname + '/public/testAjax.html');
});

app.get("/data/about", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ content: "this is the content for about" }));
});
app.get("/data/lines", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ content: "this is the content for lines" }));
});
app.get("/data/people", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ content: "this is the content for people" }));
});

app.get(/^\/data\/lines\/(^([0-9]|1[0-9])$)/)
app.get('*', function (req, res) {
  console.log(req)
  res.status(404).send("Status code 404 - The URL you are looking for does not exist");
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, function() {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
