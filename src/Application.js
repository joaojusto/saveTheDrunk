import .Drunk as Drunk;
import .TrailBox as TrailBox;

exports = Class(GC.Application, function () {


	this.initUI = function () {

		this.style.backgroundColor = "#FFFFFF";

		//Drunk array;
		this.drunks = [new Drunk({superview: GC.app.view, x: 20, y: 20}), 
		               new Drunk({superview: GC.app.view, x: 100, y: 100})];
		
		//Target to send the touch points;
		this.target = -1;

		//If touch is moving add trail dots; 
		this.view.on("InputMove", function (evt, pt) {
			
			//the target is defined if a drunk is touched 
			//and only start recording if there is one, -1 is null;
			if(GC.app.target != -1) {
			
				var opts = {superview: GC.app.view, x: pt.x - 3, y: pt.y - 3};
				GC.app.drunks[GC.app.target].addTrail(pt);
			};
		});
		
		//The touch ended on the superview, set the target to null;
		this.view.on("InputOut", function () {
			
			GC.app.target = -1;
		});
	};

	this.launchUI = function () {};
});

				


