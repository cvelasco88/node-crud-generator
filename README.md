CRUD Generator
==============

CRUD generator is a Node.js helper for generating Create, Read, Update & Destroy ([CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete)) actions for your methods and, *optionally*, attaching them to your controllers.

### Features

* Pagination
* Filtering (When attached to controllers via query params)

### How to use

Install CRUD Generator `npm install crud-generator`

An example controller might look like:

````
var CrudGenerator = require('crud-generator');
var model = require('../model');
var crud = new CrudGenerator(model);

var controller = {
	customAction: function() {
		// code
	}
};

// Attach all CRUD actions to your controller
crud.all(controller);

// Attach some CRUD actions to your controller
crud.only('create show', controller);

// Attach all but index
crud.without('index', controller);

// Just get crud show method for model
var show = crud.only('show');

// Get all methods for model
var crudMethods = crud.all();

module.exports = controller;
````

### Overriding generated CRUD actions

Sometimes you need custom logic for CRUD actions. You can achieve this by manually writing a custom show action for your controller which will override anything attached by the Crud Generator.

````
var CrudGenerator = require('crud-generator');
var model = require('../model');
var crud = new CrudGenerator(model);

var controller = {
	// This method will always take precedence over the Crud Generator
	show: function() {}
};

// Attach all CRUD actions to your controller
crud.all().extend(controller);

// Controller show method will still reference custom method above

module.exports = controller;
````
### Pagination

You can control pagination of data returned from the CRUD index method by passing options as query params. The 2 options available are:

* **perPage**: Controls how many documents are returned for each page
* **page**: Controls which page to show in conjuntion with the perPage option

## Sorting

A query string, given a sort key, will set the sort order.

A `-` prefix can be used to specify decending order.

Sort fields can be chained using comma seperation.

#### Example

`/?sort=-name`: Sorts by name in decending order.

`/?sort=name,-date`: Sorts by name in ascending order and date in decending order.

## Filtering

TODO




===================
