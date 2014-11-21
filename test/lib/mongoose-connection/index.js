var mongoose = require('mongoose');
var mongooseConnectionURI = 'mongodb://docker-ip:27017,docker-ip:27018,docker-ip:27019/node-crud-generator-test';

mongoose.connection.on('error', function(err) {
	console.log('MongoDB connection error', err);
});

// Connect to Mongoose using our database config.
mongoose.connect(mongooseConnectionURI, {
	server: {
		read_secondary: true
	}
});

module.exports = mongoose;
