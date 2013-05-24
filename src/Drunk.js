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
	this.maxdisplacement = 5;

	//class constructor;
	this.init = function(opts) {

		var drunkOptions = {
		width: 50,
		height: 50,
		offsetX: -25,
		offsetY: -25,
		backgroundColor: "#000000"
		};

		//merge the options passed to this function and
		//those initialized above;
		supr(this, "init", [merge(opts, drunkOptions)]);

		//the trailBox array;
		this.trail = [];

		//velocity value;
		this.velocity = 0.15;

		//starts the animation engine;
		this.animate();

		//if is touched, sets the target on main function to himself;
		this.on('InputStart', function (event, point) {
  		console.log("This view had touch begin on it at: " + point.x + "," + point.y);

  		this.startDrag({
        inputStartEvt: event,
        radius: 10
      });
		});

		this.on('DragStart', function (dragEvt) {
  		console.log("Drag started at (", dragEvt.srcPt.x, ",", dragEvt.srcPt.y, ") screen coordinates" );
		});

		this.on('Drag', function (startEvt, dragEvt, delta) {
  		console.log("Drag continued at (", dragEvt.srcPt.x, ",", dragEvt.srcPt.y, ") screen coordinates" );
		});


	};

	// handles the drunk animation events
	this.animate = function() {
		var nextPosition, trail, deltaTime;

		//if the trail box is empty continues moving in the direction of the last post;
		if(this.trail.length === 0) {
			nextPosition = {
				x: this.style.x + this.velocity,
				y: this.style.y + this.velocity
			};

		} else {
			//gets the oldest trail start moving towards it;
			this.trail[0].clean();
			trail = this.trail.shift();

			nextPosition = {
					x: trail.style.x,
					y: trail.style.y
			};
		};

		var currentPosition = new Point(this.style.x, this.style.y);
		var nextPosition = new Point(nextPosition.x, nextPosition.y);
		var line = new Line(currentPosition, nextPosition);
		var distance = line.getLength();

		deltaTime = distance / Math.abs(this.velocity);

		animate(this).now(nextPosition, deltaTime, animate.linear)
		.then(function() {
			this.animate();
		});
	};

});
