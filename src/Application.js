import src.Drunk as Drunk;
import src.TrailBox as TrailBox;

exports = Class(GC.Application, function () {


	this.initUI = function () {
		
		this.style.backgroundColor = "#FFFFFF";
		
		this.drunks = [new Drunk({superview: GC.app.view, x: 20, y: 20}), new Drunk({superview: GC.app.view, x: 100, y: 100}),];
		
		this.target = -1;
		this.recording = false;
		
		this.view.on("InputStart", function (evt, pt) {
		
			for (r = 0; r < GC.app.drunks.length; r++) {
				
				var drunk = GC.app.drunks[r];
				
				if (drunk.containsLocalPoint (pt)) {
					
					GC.app.target = r;
					GC.app.recording = true;
					
					drunk.cleanTrail();
					
					r = GC.app.drunks.length;
				}
			}
		});
		
		this.view.on("InputMove", function (evt, pt) {
			
			if (GC.app.recording == true) {

				var opts = {superview: GC.app.view, x: pt.x - 3, y: pt.y - 3};

				GC.app.drunks[GC.app.target].addTrail(opts);
			} 
		});
		
		this.view.on("InputOut", function (over, overCount, atTarget) {
			
			GC.app.target = -1;
			GC.app.recording = false;
		});
	};

	this.launchUI = function () {};
});


