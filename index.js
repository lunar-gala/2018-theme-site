var express = require('express')
var path = require('path')
var app = express()

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/water', function (req, res) {
  res.sendFile(path.join(__dirname, 'water.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});