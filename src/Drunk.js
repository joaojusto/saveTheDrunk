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
	this.minDistanceBetweenTrails = 1;

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
		this.velocity = 0.2;

		//if is touched, sets the target on main function to himself;
		this.on('InputStart', function (event, point) {
  		//we need to tell the view that this is actualy a drag so that it can fire drag events
  		this.startDrag({
  			inputStartEvt: event,
  			radius: 10
  			});
		});

		this.on('DragStart', function (dragEvt) {
			//remove any previous trail, we are going to start a new one
			
			//TODO: https://groups.google.com/forum/?fromgroups#!topic/game-closure-devkit/6YPa6KABFhw
			this.cleanTrail();
		});

		this.on('Drag', function (startEvt, dragEvt, delta) {
			if (delta.getMagnitude() > this.minDistanceBetweenTrails) {
				//TODO: see why the same code from drag start doesnt work WTF WTF -------------!!!!!!!!!!!!!
	  		var opts = {
					superview: GC.app.view,
					x: dragEvt.point[1].x,
					y: dragEvt.point[1].y
				};

				this.addTrail(opts);
			}
		});

		//starts the animation engine;
		this.animate();
	};

	this.addTrail = function(options) {
		this.trail.push(new TrailBox(options));
	};

	//remove all the trail dots
	this.cleanTrail = function () {
		for (i = 0; i < this.trail.length; i++) {
			this.trail[i].clean();
		}
		this.trail = [];
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

		deltaTime = distance / this.velocity;

		animate(this).now(nextPosition, deltaTime, animate.linear)
		.then(function() {
			this.animate();
		});
	};

});
