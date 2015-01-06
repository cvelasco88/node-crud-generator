var _ = require('lodash');

var show = function(options) {
	var _this = this;
	var Model = this.Model;
	var options = this.options;
	var customErrors = options.errors || {};

	return function show(req, res, next) {
		var query;

		if (_this.compositeKeys) {
			var conditions = {};
			_.each(_this.compositeKeys, function(value, key) {
				var paramValue = req.params[value] || req.query[value];
				conditions[key] = paramValue;
			});
			query = Model.findOne(conditions);
		}
		else {
			var key = Model.modelName + 'Id';
			var modelId = req.params[key] || req.query[key];
			query = Model.findById(modelId);
		}

		query.exec(function(err, model) {
			if (err) {
				return next(err);
			}
			if (!model) {
				res.status(404);
				// if no custom error defined, just res empty object
				if (!customErrors.notFound) {
					return res.json({});
				}
				// custom error was defined, pass that on
				return next(customErrors.notFound());
			}
			res.json(model);
		});
	};
};

module.exports = show;
