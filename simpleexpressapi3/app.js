var express = require('express');
var fs = require('fs');
var https = require('https');
var app = express();
var options = {
    key: fs.readFileSync('certs/servernode-key.pem'),
    cert: fs.readFileSync('certs/servernode-crt.pem'),
    ca: fs.readFileSync('certs/canode-crt.pem'), //client auth ca OR cert
    requestCert: true,
    rejectUnauthorized: false
};



app.use(function (req, res, next) {
    if (!req.client.authorized) {
        console.log('unauthorized');
        return res.status(401).send('User is not authorized');
    }
    //examine the cert itself, and even validate based on that!
    var cert = req.socket.getPeerCertificate();
    if (cert.subject) {
        console.log(cert);
        console.log(cert.subject.CN);
    }
    console.log(next.name);
    next();
});


app.get("/service/3", function (req, res) {
    console.log('inside');
    res.send("Hello I am a simple standalone express api service 3 and I am protected ");
    res.end();
});


// var routes = require("./routes/routes.js")(app);
var listener = https.createServer(options, app).listen(8080, function () {
    console.log('Express HTTPS server listening on port ' + listener.address().port);
});