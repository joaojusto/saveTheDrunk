import src.Drunk as Drunk;
import src.TrailBox as TrailBox;

exports = Class(GC.Application, function () {


	this.initUI = function () {
		
		this.style.backgroundColor = "#FFFFFF";
		
		//Drunk array;
		this.drunks = [new Drunk({superview: GC.app.view, x: 20, y: 20}), new Drunk({superview: GC.app.view, x: 100, y: 100}),];
		
		//Controls the touch target
		this.target = -1;
		
		//Controls if recording trails or not
		this.recording = false;
		
		this.view.on("InputStart", function (evt, pt) {
		
			//Checks if the touch was over any element in the drunk array;
			for (r = 0; r < GC.app.drunks.length; r++) {
				
				var drunk = GC.app.drunks[r];
				
				//If the touch was over any drunk, cleans the old trail and sets recording and target to start recording
				if (drunk.pointInDrunk (pt)) {
					
					GC.app.target = r;
					GC.app.recording = true;
					
					drunk.cleanTrail();
					
					r = GC.app.drunks.length;
				}
			}
		});
		
		this.view.on("InputMove", function (evt, pt) {
			
			//adds the new trails to the drunk target
			if (GC.app.recording == true) {

				var opts = {superview: GC.app.view, x: pt.x - 3, y: pt.y - 3};

				GC.app.drunks[GC.app.target].addTrail(opts);
			} 
		});
		
		//touch ends, disable record and target
		this.view.on("InputOut", function (over, overCount, atTarget) {
			
			GC.app.target = -1;
			GC.app.recording = false;
		});
	};

	this.launchUI = function () {};
});


