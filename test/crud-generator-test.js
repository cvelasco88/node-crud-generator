var should = require('should');

describe('CrudGenerator: index', function() {

	var CrudGenerator = require('../index');
	var crud = new CrudGenerator(require('./fixtures/model'))

	it('should return a return an array of model resources', function(done) {
		var allExample = crud.all();
		allExample.should.have.keys('create', 'destroy', 'index', 'show', 'update');

		var onlyExample = crud.only('index show');
		onlyExample.should.have.keys('index', 'show');

		var withoutExample = crud.without('update destroy');
		withoutExample.should.have.keys('create', 'index', 'show');

		done();
	});

	it('should attach CRUD functions to a controller', function(done) {
		var userController = {
			signup: function() {},
			resetPassword: function() {}
		};
		crud.only('index show', userController);
		userController.should.have.keys('index', 'show', 'signup', 'resetPassword');
		done();
	});

	it('should not override any custom CRUD methods already defined on an object', function(done) {
		var userController = {
			show: showOverride
		};
		crud.without('index destroy', userController);
		userController.should.have.keys('show', 'create', 'update');
		userController.show.should.be.exactly(showOverride)

		// our custom show function. Store it so we can test it
		function showOverride() {};
		done();
	});

});
