[![NPM](https://nodei.co/npm/bypasscors.png?compact=true)](https://npmjs.org/package/bypasscors)

Bypass CORS restrictions on external domains from Node.js server, scraping any webpage data's as a HTML DOM to make your own APIs. Relative paths for resources will still load using target page's domain.

On the server, setup a route to which the client can pass the URL of the page to retrive:


```
app.get('/geturl', function(req,res){
    require('bypasscors')(req.query.url, function(html){
	    return res.send(html);
    });
});
```

On the frontend, you can use jQuery to parse the HTML as DOM : 
```
$.get('/geturl', {url: "http://google.com"}, function(html){
	$(html).find("div")
})
```


Example:
```
npm i bypasscors express
node node_modules/bypasscors/example
```
