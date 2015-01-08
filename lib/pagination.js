var async = require('async');
var uri = require('URIjs');

var defaults = {
	PAGE: 1,
	PER_PAGE: 20
};

module.exports = {

	/**
	 * [query description]
	 * @param  {Object} Mongoose Query object.
	 * @param  {Object} options (options.perPage, options.page).
	 * @param  {Function} callback with err, results (results.count + results.query).
	 */
	query: function(query, options, callback) {
		var Model = query.model;

		var page = options.page || defaults.PAGE;
		var perPage = options.perPage || defaults.PER_PAGE;
		var skip = (page - 1) * perPage;

		async.parallel({
			count: function(cb) {
				Model.count(cb);
			},
			query: function(cb) {
				query
				.limit(perPage)
				.skip(skip)
				.exec(cb);
			}
		}, function(err, results) {
			if (err) {
				return callback(err);
			}
			results.page = page;
			results.perPage = perPage;
			callback(null, results);
		});
	},

	middleware: function(req, res, next) {
		// @TODO: Ensure the values are valid ints.
		var page = req.query.page ? parseInt(req.query.page, 10) : defaults.PAGE;
		var perPage = parseInt(req.query.perPage, 10) || defaults.PER_PAGE;

		req.pagination = {
			page: page,
			perPage: perPage
		};

		next();
	},

	links: function(url, options) {
		options = options || {};

		var page = parseInt(options.page, 10);
		var count = options.count;
		var perPage = options.perPage;

		var prev = page - 1;
		var next = page + 1;
		var last = Math.floor(count / perPage);
		if (count % perPage > 0) {
			++last;
		}

		var links = {};

		if (prev > 0) {
			links.prev = uri(url).query({ page: prev }).toString();
		}

		// if not the last page, show the next and last links
		if (next <= last) {
			links.next = uri(url).query({ page: next }).toString();
			links.last = uri(url).query({ page: last }).toString();
		}

		return links;
	}

};
