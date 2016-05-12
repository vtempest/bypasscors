module.exports = function(url, callback){

	var domain = (url.match(/(http:\/\/|https:\/\/)[^\/]+/gi) || [""])[0];

	require('request')({
	  url: url,
	  headers: {
	    'REFERER': domain,
		'user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.19 Safari/537.36'
	  }
	}, function (error, response, html) {

		//spoof the base-url for relative paths on the target page
		html = (html||"").replace("<head>", "<head><base href='" + domain+ "/'>")

	  	callback(html);
	});
}
