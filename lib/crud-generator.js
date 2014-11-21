var _ = require('lodash');
var generators = [
	'create',
	'destroy',
	'index',
	'show',
	'update'
];

var CrudGenerator = function(model, compositeKeys) {
	this.Model = model;
	this.compositeKeys = compositeKeys || [];
};

// Add individual action generators.
generators.forEach(function(generator) {
	CrudGenerator.prototype[generator] = require('./generators/' + generator);
});

CrudGenerator.prototype.all = function(objToExtend) {
	objToExtend = objToExtend || {};
	return _.defaults(objToExtend, createGenerators(this, generators));
};

CrudGenerator.prototype.only = function(stringOrArray, objToExtend) {
	var array = convertToArray(stringOrArray);
	var only = _.intersection(generators, array);

	objToExtend = objToExtend || {};
	return _.defaults(objToExtend, createGenerators(this, only));
};

CrudGenerator.prototype.without = function(stringOrArray, objToExtend) {
	var array = convertToArray(stringOrArray);
	var without = _.difference(generators, array);

	objToExtend = objToExtend || {};
	return _.defaults(objToExtend, createGenerators(this, without));
};

// Private functions.

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
 */
function createGenerators(crud, array) {
	return _.reduce(array, function(obj, generator) {
		obj[generator] = crud[generator]();
		return obj;
	}, {});
}

/*
function castArgsToArray(obj) {
	var values = _.values(obj);

	if (values.length > 1) {
		return values;
	}
	else if (values.length === 1) {
		var value = values[0];
		if (_.isString(value)) {
			return value.split(' ');
		}
		else if (_.isArray[value]) {
			return value;
		}
	}
	return [];
}
*/

module.exports = CrudGenerator;
