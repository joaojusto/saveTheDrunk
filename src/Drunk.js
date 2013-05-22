import ui.View as View;
import src.TrailBox as TrailBox;
import math.geom.Point as Point;

exports = new Class(View, function(supr) {
	
	//minimum distance between trail dots
	this.distanceBtTrails = 10;
	
	this.init = function (opts) {
		
		supr(this, "init", [merge(opts, {width: 50, height: 50, backgroundColor: "#000000"})]);
		this._dt = 0;
		this.angle = 0;
		this.velocidade = 100;
		this.theta = 20 * 180 / Math.PI;
		this.velocity = new Point (0,0);
		
		this.trail = [];
	};

	this.addTrail = function (opts) {
		
		//if there's no trail 
		if (this.trail.length == 0) {
		
			var dX, dY, distance;
			var posX = (this.style.x + this.style.width) / 2; // actual position (center of the square or image);
			var posY = (this.style.x + this.style.width) / 2;
			
			//some math to calculate the distance between points
			dX = posX - opts.x, dY = posY - opts.y;
	        
			dX = Math.pow(dX, 2);
	        dY = Math.pow(dY, 2);
	        
	        distance = Math.sqrt(dX + dY);
	        
	        //adds only if trail point is out of the box or image
	        if (distance > this.style.width) {
            	
            	this.trail.push(new TrailBox(opts))
            }
		
		} else {
			
			//if there's trails, checks if there's a minimum distance between them
			
			var dX, dY, distance;
			var lastTrail = this.trail[this.trail.length - 1];
			
			dX = (lastTrail.style.x - opts.x), dY = (lastTrail.style.y - opts.y);
	        
			dX = Math.pow(dX, 2);
	        dY = Math.pow(dY, 2);
	        
	        distance = Math.sqrt(dX + dY);
	        
			if (distance > this.distanceBtTrails) {
            	
            	this.trail.push(new TrailBox(opts))
            }
		}
	}
	
	//remove all the trail dots
	this.cleanTrail = function () {
		
		for (i = 0; i < this.trail.length; i++) {
			
			this.trail[i].clean();
		}
		this.trail = [];
	}

	//called every time the drunk is drawn
	this.tick = function (dt) {
		
		this._dt += dt;
		
		/* TODO drunk movement
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
			
		};*/
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
	};*/
});