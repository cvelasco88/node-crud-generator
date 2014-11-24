var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	description: String
});

module.exports = mongoose.model('example', schema);
