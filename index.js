var express = require('express')
var path = require('path')
var app = express()

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/about', function (req, res) {

});

app.get('/lines', function (req, res) {

})

app.get('/people', function (req, res) {

})

app.get('*', function (req, res) {
  res.status(404).send("Status code 404 - The URL you are looking for does not exist");
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, function() {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
