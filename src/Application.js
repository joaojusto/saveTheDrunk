import ui.View as View;
import math.geom.Point as Point;

exports = Class(GC.Application, function () {


	this.initUI = function () {
		
		this.style.backgroundColor = "#FFFFFF";
		
		this.drunks = [new Drunk({superview: GC.app.view, x: 20, y: 20})];
		this.recording = false;
		this._trail = [];
		this._index = 0;
		
		this.view.on("InputStart", function (evt, pt) {
		
			if (GC.app.drunks[0].containsLocalPoint (pt)) {
				
				GC.app.recording = true;
				GC.app._trail = []; /*should clean the array but the old trails continue there*/
				console.log("Input start, rec = " + GC.app.recording);
			}
		});
		
		this.view.on("InputMove", function (evt, pt) {
			
			if (GC.app.recording == true) {

				var opts = {superview: GC.app.view, x: pt.x - 3, y: pt.y - 3};

				GC.app._trail.push(new TrailBox(opts));
			} 
		});
		
		this.view.on("InputOut", function (over, overCount, atTarget) {
			
			GC.app.recording = false;
			console.log("Input out, rec = " + GC.app.recording);
		});
	};

	this.launchUI = function () {};
});

var Drunk = Class(View, function (supr) {
	
	this.init = function (opts) {
		
		supr(this, "init", [merge(opts, {width: 50, height: 50, backgroundColor: "#000000"})]);
		this._dt = 0;
	};


	this.reset = function (opts) {

		this._dt = 0;

		this.updateOpts(opts);
	};


	this.tick = function (dt) {
		
		this._dt += dt;
		
		if(GC.app._trail.lenght > 0) {
			
			var trail = GC.app._trail[0];
			var target = new Point(trail.x, trail.y);
			
			if(this.containsLocalPoint (target)) {
				
				GC.app._trail.shift();
				
			} else {
				
				this.updatePosition(target);
			};
		};
	};
	
	this.updatePosition = function (nextPoint) {
		
		var xfxi = nextPoint.x - this.x;
        var yfyi = nextPoint.y - this.y;
        var m, x, y;

        m = yfyi / xfxi;
        //double theta = (float)Math.atan(m);

        //pos.x += (float) x * deltaTime;
        //pos.y += (float) y * deltaTime;

        //velocity.x = (float)x;
        //velocity.y = (float)y;

        //angle = (float)-(Math.atan2(xfxi, yfyi) * 180 / Math.PI);
	};
});

var TrailBox = Class(View, function (supr) {
	this.init = function (opts) {
		supr(this, "init", [merge(opts, {width: 6, height: 6, backgroundColor: "#008800"})]);


		this._dt = 0;
	};


	this.reset = function (opts) {

		this._dt = 0;

		this.updateOpts(opts);
	};
	
	this.tick = function (dt) {
		
		this._dt += dt;
		
	};
});


