var should = require('should');

describe('CrudGenerator: index', function() {

	it('should return a middleware function that returns an array of model resources', function(done) {
		var CrudGenerator = require('../index');
		var crud = new CrudGenerator(require('./fixtures/model'))

		var allExample = crud.all();
		allExample.should.have.keys('create', 'destroy', 'index', 'show', 'update');

		var onlyExample = crud.only('index show');
		onlyExample.should.have.keys('index', 'show');

		var withoutExample = crud.without('update destroy');
		withoutExample.should.have.keys('create', 'index', 'show');

		var userController = {
			signup: function() {},
			resetPassword: function() {}
		};
		crud.only('index show', userController);
		userController.should.have.keys('index', 'show', 'signup', 'resetPassword');

		done();
	});

});
