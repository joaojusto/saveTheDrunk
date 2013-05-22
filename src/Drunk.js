import ui.View as View;
import math.geom.Point as Point;

exports = new Class(View, function(supr) {
	
	this.init = function (opts) {
		
		supr(this, "init", [merge(opts, {width: 50, height: 50, backgroundColor: "#000000"})]);
		this._dt = 0;
		this.angle = 0;
		this.velocidade = 100;
		this.theta = 20 * 180 / Math.PI;
		this.velocity = new Point (0,0);
	};


	this.reset = function (opts) {

		this._dt = 0;

		this.updateOpts(opts);
	};

	this.tick = function (dt) {
		
		this._dt += dt;
		
		if(0 > 0) {
			
			var trail = GC.app._trail[0];
			var target = new Point(trail.x, trail.y);
			
			if(this.containsLocalPoint (target)) {
				
				GC.app._trail.shift();
				console.log("Reached: " + target.x + " ," + target.y);
				
			} else {
				
				this.updatePosition(target, dt);
				console.log("Moving towards: " + target.x + " ," + target.y);
			};
		} else {
			
		};
	};
	this.updatePositon = function () {
		
	};
	
	this.updatePosition = function (nextPoint, deltaTime) {
		
		var xfxi = nextPoint.x - this.x;
        var yfyi = nextPoint.y - this.y;
        var m, x, y;

        m = yfyi / xfxi;
        teta = Math.atan(m);

        y = this.velocidade * Math.sin(theta);
        x = this.velocidade * Math.cos(theta);
        
        var pos = new Point (x * deltaTime, y * deltaTime);
        
        var ang = -(Math.atan2(xfxi, yfyi) * 180 / Math.PI);
        
        var opts = {x: pos.x, y: pos.y, velocity: new Point (x, y), angle: ang, theta: teta};
        
        this.updateOpts(opts);
	};
});