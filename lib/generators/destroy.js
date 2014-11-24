var destroy = function(options) {
	var Model = this.Model;

	return function destroy(req, res, next) {
		var key = Model.modelName + 'Id';
		var modelId = req.params[key] || req.query[key];

		Model.remove({ _id: modelId }, function(err) {
			if (err) {
				return next(err);
			}

			res.json({});
		});
	};
};

module.exports = destroy;
