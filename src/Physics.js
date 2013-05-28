//DevKit imports
import math.geom.Line as Line;
import math.geom.Rect as Rect;
import math.geom.Point as Point;
import math.geom.intersect as intersect;

exports = new Class(function() {

	//gets a object (object bounds) and the screenSize,
	//and returns true if object have collided with the screen limits;
	this.colisionWithSreenLimits = function (objectBounds, screenSize) {

		if(objectBounds.TOP_LEFT.x < 0 || 
				objectBounds.TOP_LEFT.y < 0 || 
				objectBounds.BOTTOM_LEFT.y > screenSize.y || 
				objectBounds.BOTTOM_RIGHT.x > screenSize.x) {
			
			return true;
			
		} else {
			
			return false;
		}
	};

	//gets two objects and returns true if they have collided;
	this.colisionBetweenObjects = function (object1Bounds, object2Bounds) {
		
		if(intersect.rectAndRect (object1Bounds, object2Bounds)) {
			
			return true;
			
		} else {
			
			return false;
		}

	};

});
