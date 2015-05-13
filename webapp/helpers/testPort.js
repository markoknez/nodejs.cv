var http = require('http');

var server = http.createServer(function (req, res){

	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end("Hello world!");
});

server.listen(Number(process.argv[2]));

console.log("Server running at %s port".replace('%s', process.argv[2]));