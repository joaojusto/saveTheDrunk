//DevKit imports
import animate;
import ui.View as View;
import math.geom.Line as Line;
import math.geom.Rect as Rect;
import math.geom.Point as Point;
import math.geom.intersect as intersect;

//our our imports
import .TrailBox as TrailBox;


exports = new Class(View, function(supr) {

	//minimum distance between trail dots
	this.distanceBetweenTrails = 10;
	//the max displacement every frame in pixels;
	this.maxdisplacement = 2;
	
	//class constructor;
	this.init = function(opts) {
		
		var trailBoxOptions = {
		width: 50,
		height: 50,
		backgroundColor: "#000000"
		};
		
		//merge the options passed to this function and
		//those initialized above;
		supr(this, "init", [merge(opts, trailBoxOptions)]);
		
		//the trailBox array;
		this.trail = [];
		
		//this angle is the one used to rotate 
		//the object according to direction it is moving;
		this.angle = 0; 
		
		// 20 is the angle that will give direction to the movement
	    // 180 / Math.PI is the conversion to radians;
		this.teta = 20 * 180 / Math.PI;
		
		//calculates the velocity vector;
		var y = this.maxdisplacement * Math.sin(this.teta);
		var x = this.maxdisplacement * Math.cos(this.teta);
		this.velocity = new Point (0,0);
		
		//if is touched, sets the target on main function to himself;
		this.onInputStart = function () {
			
			target = GC.app.target;
			index = GC.app.drunks.indexOf(this);
			
			//only starts recording if theres is no recording target;
			if(target == -1) {
				GC.app.target = index;
				this.cleanTrail();
			};
		};
		
		this.onInputMove = function () {
			
		};
	};

	//actually add the trails
	this.addTrail = function (opts) {
		
		if(this.trail.length == 0) { //if there's no trail
			
			var pos = new Point(this.style.x + this.style.width * 0.5, 
					this.style.y + this.style.height * 0.5);
			var line = new Line (pos, new Point(opts.x, opts.y));
			
			//adds only if trail point is out of the box or image
			if (line.getLength() > this.style.width)
				this.trail.push(new TrailBox(opts));
			
		} else { //if there's trails, checks if there's a minimum distance between them
			
			var lastTrail = this.trail[this.trail.length - 1];
			var line = new Line (new Point (lastTrail.style.x, lastTrail.style.y), 
					new Point(opts.x, opts.y));
			
			if (line.getLength() > this.distanceBetweenTrails)
				this.trail.push(new TrailBox(opts));
		};
	};

	//remove all the trail dots
	this.cleanTrail = function () {
		
		for (i = 0; i < this.trail.length; i++) {
			this.trail[i].clean();
		}
		this.trail = [];
	}

	// handles the drunk animation events
	this.animate = function (deltaTime) {
		
		if(this.trail.length == 0) {
			
			//if the trail box is empty continues moving in the direction
			//of the last post;
			animate(this).now({x: this.style.x + this.velocity.x, 
				y: this.style.y + this.velocity.y}, deltaTime, animate.linear);
			
		} else {
			
			//gets the oldest trail start moving towards it;
			var trail = this.trail[0];
			animate(this).now({x: trail.style.x, y: trail.style.y}, 100, animate.linear)
			.then(this.moveUp());
		};
	}
	
	//removes the oldest trail when drunk collides with it;
	this.moveUp = function () {
		
		this.trail[0].clean();
		this.trail.shift();
	};
	
	//called every time the drunk is drawn
	this.tick = function (deltaTime) {
		
		if(!animate(this).hasFrames())
			this.animate(deltaTime);
	};

});
