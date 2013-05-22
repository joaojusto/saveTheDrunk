import ui.View as View;

exports = new Class (View, function (supr) {
	
	this.init = function (opts) {
		
		supr(this, "init", [merge(opts, {width: 6, height: 6, backgroundColor: "#008800"})]);

		this._dt = 0;
	};

	//actualy remove the dots from view
	this.clean = function () {
		
		this.removeFromSuperview();
	};
	
	//keeps track of the time the trails are on screen
	this.tick = function (dt) {
		
		this._dt += dt;
		
	};
});
