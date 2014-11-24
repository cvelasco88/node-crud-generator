var _ = require('lodash');

var update = function(options) {
	var Model = this.Model;

	return function update(req, res, next) {
		var data = req.body || {};

		var key = Model.modelName + 'Id';
		var modelId = req.params[key] || req.query[key];

		Model.findById(modelId, function(err, model) {
			if (err) {
				return next(err);
			}

			model = _.extend(model, data);
			model.save(function(err) {
				if (err) {
					return next(err);
				}
				// @TODO: Check the type of error; if db error 500.
				// if user error, 400.
				res.json(model);
			});
		});
	};
};

module.exports = update;
