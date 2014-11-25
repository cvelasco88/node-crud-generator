var _ = require('lodash');
var pagination = require('../pagination');

var index = function() {
	var Model = this.Model;
	var options = this.options;

	// @TODO: Add pagination options.

	return function index(req, res, next) {
		var query = Model.find();
		if (options.query) {
			query = options.query(req, query);
		}

		if (options.filters) {
			// @TODO: Handle both array / key/value filters?
			_.each(options.filters, function(conditionKey, queryKey) {
				if (req.query[queryKey]) {
					var conditions = {};
					conditions[conditionKey] = req.query[queryKey];
					query = query.where(conditions);
				}
			});
		}

		var paginationOptions = {
			page: req.query.page,
			// use setting in query paramsor global custom setting
			perPage: req.query.perPage || options.pagination.perPage
		};

		pagination.query(query, paginationOptions, function(err, results) {
			if (err) {
				return next(err);
			}

			// @TODO: Add pagination to the res object.

			var links = pagination.links(req.originalUrl, results);
			res.links(links);

			res.json(results.query);
		});
	};
};

module.exports = index;
