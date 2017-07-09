module.exports = function(url, callback) {

  var ua = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.19 Safari/537.36';

  var corsURL = require('url').parse(url);

  require(corsURL.protocol.slice(0, -1)).request({
    host: corsURL.host,
    path: corsURL.path,
    method: 'GET',
    headers: {
      'REFERER': corsURL.host,
      'user-agent': ua
    }
  }, function(response) {
    var html = '';

    response.on('data', function(chunk) {
      html += chunk;
    });
    response.on('end', function() {
      //spoof the base-url for relative paths on the target page
      html = (html || "").replace(/<head[^>]*>/i, "<head><base href='" + corsURL.protocol + "//" + corsURL.host + "/'>")


      delete response.headers['x-frame-options'];
      delete response.headers['content-security-policy'];
      callback(html);
    });
  }).on('error', function(e) {
    console.log(e.message);
  }).end();

}
