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
		this.velocidade = 2;
		this.teta = 20 * 180 / Math.PI;
		
		var y = this.velocidade * Math.sin(this.teta);
        var x = this.velocidade * Math.cos(this.teta);
		
		this.velocity = new Point (x,y);
		
		this.trail = [];
	};

	this.addTrail = function (opts) {
		
		//if there's no trail 
		if (this.trail.length == 0) {
		
			var posX = (this.style.x + this.style.width) / 2; // actual position (center of the square or image);
			var posY = (this.style.x + this.style.width) / 2;
			
			var pos = new Point (posX, posY);
			var target = new Point(opts.x, opts.y);
			
	        distance = this.distanceBt2Points(target, pos);
	        
	        //adds only if trail point is out of the box or image
	        if (distance > this.style.width) {
            	
            	this.trail.push(new TrailBox(opts))
            }
		
		} else {
			
			//if there's trails, checks if there's a minimum distance between them
			
			var lastTrail = this.trail[this.trail.length - 1];
			
			var pos = new Point (lastTrail.style.x, lastTrail.style.y);
			var target = new Point(opts.x, opts.y);
	        
	        distance = this.distanceBt2Points(target, pos);
	        
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
		

		if(this.trail.length > 0) {
			
			var trail = this.trail[0];
			var target = new Point(trail.style.x, trail.style.y);
			
			if(this.pointInDrunk (target)) {
				
				trail.clean();
				this.trail.shift();
				console.log("Reached: " + target.x + " ," + target.y);
				
			} else {
				
				this.updatePosition(target, dt);
				console.log("Moving towards: " + target.x + " ," + target.y);
			};
			
		} else {
			
			this.updatePositonNoTarget();
		};
	};
	
	this.updateVariables = function (nextPos) {
		
		if(nextPos.x < 0) {
			
			nextPos.x = 0;
			this.velocity.x = -this.velocity.x;
			
		} else if (nextPos.x + this.style.width > 480){
			
			nextPos.x = 480 - this.style.width;
			this.velocity.x = - this.velocity.x;
		};

		if(nextPos.y < 0) {
			
			nextPos.y = 0;
			this.velocity.y = - this.velocity.y;
			
		} else if (nextPos.y + this.style.height > 320){
			
			nextPos.y = 320 - this.style.height;
			this.velocity.y = - this.velocity.y;
		}
		
		var xfxi = nextPos.x - this.style.x;
        var yfyi = nextPos.y - this.style.y;
        
        var ang = -(Math.atan2(xfxi, yfyi) * 180 / Math.PI);
		
		var opts = {x: nextPos.x, y: nextPos.y, angle: ang};
        
        this.updateOpts(opts);
	};
	
	this.updatePositonNoTarget = function () {
	
        var x, y;

        y = this.velocity.y;
        x = this.velocity.x;
        
        var pos = new Point (this.style.x + x, this.style.y + y);
        
        var xfxi = pos.x - this.style.x;
        var yfyi = pos.y - this.style.y;
        
        this.updateVariables(pos);
	};
	
	this.updatePosition = function (nextPoint, deltaTime) {
		
		var xfxi = nextPoint.x - this.style.x;
        var yfyi = nextPoint.y - this.style.y;
        var m, x, y, teta;

        m = yfyi / xfxi;
        teta = Math.atan(m);

        if (xfxi < 0 && yfyi < 0)
        {
            y = -this.velocidade * Math.sin(teta);
            x = -this.velocidade * Math.cos(teta);
        }
        else if (m <= 0 && xfxi < 0 && yfyi > 0)
        {
            y = -this.velocidade * Math.sin(teta);
            x = -this.velocidade * Math.cos(teta);
        }
        else
        {
            y = this.velocidade * Math.sin(teta);
            x = this.velocidade * Math.cos(teta);
        }
        
        var velocity = new Point (x,y);
        
        var pos = new Point (this.style.x + x, this.style.y + y);
        
        var ang = -(Math.atan2(xfxi, yfyi) * 180 / Math.PI);
        
        var opts = {x: pos.x, y: pos.y, velocity: velocity, angle: ang, teta: teta};
        
        this.updateOpts(opts);
	};
	
	this.distanceBt2Points = function (finalPoint, inicialPoint) {
		
		var dX, dY, distance;
		
		//some math to calculate the distance between points
		dX = finalPoint.x - inicialPoint.x, dY = finalPoint.x - inicialPoint.x;
        
		dX = Math.pow(dX, 2);
        dY = Math.pow(dY, 2);
        
        distance = Math.sqrt(dX + dY);
        
        return distance;
		
	};

	this.pointInDrunk = function (p) {

		lowerLeft = new Point(this.style.x, this.style.y - this.style.height);
		
		if(lowerLeft.x <= p.x){
			if(lowerLeft.x + this.style.width >= p.x)
				if(lowerLeft.y <= p.y)
					if (lowerLeft.y + this.style.height >= p.y);
						return true
		} else {
			return false;
		};
	};
});