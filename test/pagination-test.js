var should = require('should');
var async = require('async');
var express = require('express');
var request = require('supertest');
require('./lib/mongoose-connection');

var app = express();

describe('Pagination: index', function() {
	this.timeout(3000);

	var CrudGenerator = require('../index');
	var model = require('./fixtures/model');
	var crud = new CrudGenerator(model);
	var fixtureData = [];

	// Create some fixture data to test pagination
	before(function(done) {
		async.timesSeries(50, createRandomDocument, done)
	});

	it('should paginate 20 items by default', function(done) {
		var handler = crud.index();
		app.get('/', handler);

		request(app)
		.get('/')
		.expect('Content-Type', /json/)
		.expect(200)
		.end(function(err, res) {
			if (err) { throw err; }
			var json = res.body;
			json.should.be.an.Array;
			json.should.have.length(20);
			done();
		});
	});
	it('should paginate by length of perPage option in query params if provided', function(done) {
		var handler = crud.index();
		var pagination ={
			perPage: 30
		};
		app.get('/', handler);

		request(app)
		.get('/')
		.query(pagination)
		.expect('Content-Type', /json/)
		.expect(200)
		.end(function(err, res) {
			if (err) { throw err; }
			var json = res.body;
			json.should.be.an.Array;
			json.should.have.length(pagination.perPage);
			done();
		});
	});
	it('should paginate by length of perPage and page option in query params if provided', function(done) {
		var pagination ={
			perPage: 30,
			page: 2
		};
		var handler = crud.index();
		app.get('/', handler);

		request(app)
		.get('/')
		.query(pagination)
		.expect('Content-Type', /json/)
		.expect(200)
		.end(function(err, res) {
			if (err) { throw err; }
			var json = res.body;
			var expectedResponseLength = 20; // 50 total, perPage 30, page 2
			json.should.be.an.Array;
			json.should.have.length(pagination.perPage);
			done();
		});
	});
	it('should change the default paginate value when passed as an option');

	function createRandomDocument(n, callback) {
		var data = {
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		};
		model.create(data, function cb(err, doc) {
			if (err) { throw err; }
			fixtureData.push(doc);
			callback();
		});
	}

});