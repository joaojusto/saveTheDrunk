import ui.View as View;

exports = new Class (View, function (supr) {
	
	this.init = function (opts) {
		
		supr(this, "init", [merge(opts, {width: 6, height: 6, backgroundColor: "#008800"})]);

		this._dt = 0;
	};

	this.clean = function () {
		
		this.removeFromSuperview();
	};
	
	this.reset = function (opts) {

		this._dt = 0;
		
		this.updateOpts(opts);
	};
	
	this.tick = function (dt) {
		
		this._dt += dt;
		
	};
});
