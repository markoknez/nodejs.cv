var bunyan = require('bunyan');

module.exports = function (name){
	return bunyan.createLogger({
		name: name,
		stream: process.stdout,
		level: 'info',
		src: true
	});
};