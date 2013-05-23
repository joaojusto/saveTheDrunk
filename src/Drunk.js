//DevKit imports
import ui.View as View;
import math.geom.Line as Line;
import math.geom.Point as Point;

//our our imports
import .TrailBox as TrailBox;


exports = new Class(View, function(supr) {

	//minimum distance between trail dots
	this.distanceBetweenTrails = 10;
	//the max displacement every frame in pixels;
	this.maxdisplacement = 2;
	
	this.init = function(opts) {
    var trailBoxOptions = {
      width: 50,
      height: 50,
      backgroundColor: "#000000"
    };

		supr(this, "init", [merge(opts, trailBoxOptions)]);

		this.angle = 0; // this angle is the one used to rotate the object acording to direction it is moving

		this.teta = 20 * 180 / Math.PI; // 20 is the angle that will give direction to the movement
									    // 180 / Math.PI is the conversion to radians

		var y = this.maxdisplacement * Math.sin(this.teta);
		var x = this.maxdisplacement * Math.cos(this.teta);

		this.velocity = new Point (x,y);

		this.trail = [];
		
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
	};

	//actualy add the trails
	this.addTrail = function (opts) {
		
		if(this.trail.length == 0) { //if there's no trail
			
			var pos = new Point(this.style.x + this.style.width * 0.5, 
					this.style.y + this.style.height * 0.5);
			var line = new Line (pos, new Point(opts.x, opts.y));
			
			//adds only if trail point is out of the box or image
			if (line.getLength() > this.style.width)
				this.trail.push(new TrailBox(opts));
			
		} else {//if there's trails, checks if there's a minimum distance between them
			
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

	//called every time the drunk is drawn
	this.tick = function (dt) {

	};

});
