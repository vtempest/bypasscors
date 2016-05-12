var express = require('express'), app = express(),
server = require('http').createServer(app).listen(8080);

app.get('/geturl',function(req,res){

    require('bypasscors')(req.query.url, function(html){
	    return res.send(html);
    })
});

app.get('/', function(req, res) {
	res.redirect('/geturl?url=https://www.google.com/search?q=bypasscors')
});

console.log("bypasscors example on http://localhost:8080")