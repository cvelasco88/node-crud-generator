var create = function(options) {
	var Model = this.Model;

	return function create(req, res, next) {
		var data = req.body || {};
		var model = new Model(data);

		model.save(function(err) {
			if (err) {
				return next(err);
			}
			res.json(model);
		});
	};
};

module.exports = create;
