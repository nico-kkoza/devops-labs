var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs'),
    html = fs.readFileSync('index.html');

var log = function(entry) {
    fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
};

var server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        var body = '';

        req.on('data', function(chunk) {
            body += chunk;
        });

        req.on('end', function() {
            if (req.url === '/') {
                log('Received message: ' + body);
            } else if (req.url === '/scheduled') {   // FIXED HERE
                log('Received task ' + req.headers['x-aws-sqsd-taskname'] +
                    ' scheduled at ' + req.headers['x-aws-sqsd-scheduled-at']);
            }

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end();
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    }
});

server.listen(port, '0.0.0.0');   // FIXED HERE

console.log('Server running on port ' + port);
