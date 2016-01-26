'use strict';

var express = require('express');
var parser = require(process.cwd() + '/header_parser.js');

var app = express();

app.get('/', function(req, res) {
    
    var data = req.headers;

    res.send(JSON.stringify(parser.parse_header(data)));
});

app.listen(8080, function() {
    console.log('Listening on port 8080...');
});