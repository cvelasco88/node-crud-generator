var _ = require('lodash');
var generators = [
	'create',
	'destroy',
	'index',
	'show',
	'update'
];

/**
 * Crud Generator Constructor
 * @param {MongooseModel} model to attach crud actions too
 * @NOTE What is compositeKeys for?
 */
var CrudGenerator = function(model, options) {
	this.options = options || {};
	this.Model = model;
};

// Add individual action generators.
generators.forEach(function requireGenerator(generator) {
	CrudGenerator.prototype[generator] = require('./generators/' + generator);
});

/**
 * Return all CRUD methods for the generator model
 * @param {Object} objToExtend e.g. the controller you want o attach to
 */
CrudGenerator.prototype.all = function(objToExtend) {
	objToExtend = objToExtend || {};
	return _.defaults(objToExtend, createGenerators(this, generators));
};

/**
 * Return only a subset of the CRUD methods, via inclusion
 * @param {String/Array} stringOrArray list of methods to include
 */
CrudGenerator.prototype.only = function(stringOrArray, objToExtend) {
	var array = convertToArray(stringOrArray);
	var only = _.intersection(generators, array);

	objToExtend = objToExtend || {};
	return _.defaults(objToExtend, createGenerators(this, only));
};

/**
 * Return only a subset of the CRUD methods, via exclusion
 * @param {String/Array} stringOrArray list of methods to exlude
 */
CrudGenerator.prototype.without = function(stringOrArray, objToExtend) {
	var array = convertToArray(stringOrArray);
	var without = _.difference(generators, array);

	objToExtend = objToExtend || {};
	return _.defaults(objToExtend, createGenerators(this, without));
};

// Private functions.

/**
 * Return array regardless of value passed in
 * @param {String/Array} value
 */
function convertToArray(value) {
	if (_.isString(value)) {
		return value.split(' ');
	}
	else if (_.isArray[value]) {
		return value;
	}
	return [];
}

/**
 * Return an object of generators from an array of generator names.
 * @param {Constructor} crud instance of CrudGenerator
 * @param {Array} array of generator naes
 */
function createGenerators(crud, array) {
	return _.reduce(array, function(obj, generator) {
		obj[generator] = crud[generator]();
		return obj;
	}, {});
}

module.exports = CrudGenerator;
