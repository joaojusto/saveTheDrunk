import device;

import .Drunk as Drunk;
import .TrailBox as TrailBox;

var BOUNDS_WIDTH = 1024;
var BOUNDS_HEIGHT = 576;

exports = Class(GC.Application, function () {


	this.initUI = function () {
		this.scaleUI();

		this.style.backgroundColor = "#FFFFFF";

		//Drunk array;
		this.drunks = [new Drunk({superview: this, x: 20, y: 20}), 
		               new Drunk({superview: this, x: 100, y: 100})];

		//Target to send the touch points;
		this.target = -1;

		//If touch is moving add trail dots; 
		this.view.on("InputMove", function (evt, pt) {

			//the target is defined if a drunk is touched 
			//and only start recording if there is one, -1 is null;
			if(GC.app.target != -1) {

				var opts = {superview: GC.app.view, x: pt.x - 3, y: pt.y - 3};
				GC.app.drunks[GC.app.target].addTrail(opts);
			};
		});

		//The touch ended on the superview, set the target to null;
		this.view.on("InputOut", function () {

			GC.app.target = -1;
		});
	};

	this.launchUI = function () {};

	this.scaleUI = function () {

		this.baseWidth = device.width * (BOUNDS_HEIGHT / device.height);
		this.baseHeight = BOUNDS_HEIGHT;
		this.scale = device.height / this.baseHeight;

		this.view.style.scale = this.scale;
	};
});
