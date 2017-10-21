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
**Live demo**: http://hkrnews.com/

Local demo:

```
npm i bypasscors express
node node_modules/bypasscors/example
```


### Virtual DOM and JS

This approach only returns the html and text returned at that URL, not the HTML DOM and text inserted after page load by AJAX requests or by single-page interface frameworks like React.js. To overcome this you can create a virtual DOM and JS execution environment by creating an invisible iframe then loading into its source the URL to your local-host-proxied scraper end point, then you can access the iframe DOMs contents (chrome treats both the iframe and your domain as  same origin). If you need a DOM/JS execution environment on the server-side you can use [WebDriver.io](http://webdriver.io/) 


```
<iframe id="dom-iframe" style="width:0;height:0;border:0; border:none;"></iframe>

document.getElementById('dom-iframe').src = '/get?url=' + url;

document.getElementById('dom-iframe').contentWindow.document.body.innerHTML;
```
