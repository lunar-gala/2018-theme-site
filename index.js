
const express = require('express');

const app = express();
app.get('/',function(req,res){

     res.sendFile('index.html');

});

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

app.listen(8000);

console.log("Running at Port 8000");
