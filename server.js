'use strict';

var express = require('express');
var parser = require(process.cwd() + '/header_parser.js');

var app = express();

app.get('/', function(req, res) {
    
    res.sendFile(process.cwd() + '/index.html');
    
});

app.get('/api', function(req, res) {
    
    var data = req.headers;

    res.send(JSON.stringify(parser.parse_header(data)));
});

app.listen(process.env.PORT || 8080, function() {
    console.log('Listening on assigned port...');
});