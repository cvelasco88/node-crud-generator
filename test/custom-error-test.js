var should = require('should');
var async = require('async');
var express = require('express');
var request = require('supertest');
require('./lib/mongoose-connection');

var app = express();

describe('CustomError: index', function() {
	var CrudGenerator = require('../index');
	var model = require('./fixtures/model');
	var options = {
		errors: {
			notFound: function() {
				return new Error('Custom not found error');
			}
		}
	};
	var crud = new CrudGenerator(model, options);

	it('should return a custom not found error for show when passed and an option to the generator', function(done) {
		var handler = crud.show();
		app.get('/show', handler, function(err, req, res, next) {
			should.exist(err);
			err.should.be.a.Error;
			err.should.be.an.instanceOf(Error);
			err.should.have.property('message', 'Custom not found error');
			done();
		});

		request(app)
		.get('/show')
		.expect(404)
		.end();
	});

	it('should return a custom not found error for update when passed and an option to the generator', function(done) {
		var handler = crud.update();
		app.get('/update', handler, function(err, req, res, next) {
			should.exist(err);
			err.should.be.a.Error;
			err.should.be.an.instanceOf(Error);
			err.should.have.property('message', 'Custom not found error');
			done();
		});

		request(app)
		.get('/update')
		.expect(404)
		.end();
	});

});
