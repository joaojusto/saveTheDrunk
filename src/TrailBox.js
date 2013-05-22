import ui.View as View;

exports = new Class(View, function(supr) {
	this.init = function(opts) {
		var trailBoxOptions = {
			width: 6,
			height: 6,
			backgroundColor: "#008800"
		};

		supr(this, "init", [merge(opts, trailBoxOptions)]);

	};

	//actualy remove the dots from view
	this.clean = function () {
		this.removeFromSuperview();
	};

});
