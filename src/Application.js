//Devkit Imports
import device;
import ui.ImageView as ImageView;
//Our Imports
import .Drunk as Drunk;
import .TrailBox as TrailBox;
import .Menus as Menus;

//Target resolution
var BOUNDS_WIDTH = 1024;
var BOUNDS_HEIGHT = 576;

exports = Class(GC.Application, function () {


	this.initUI = function () {
		//This scales the rootView (GC.app.view) and all its childs
		this.scaleUI();

		//Creates and manage the flow between menus
		Menus.createMenus();

		var background = new ImageView({
		      superview: this.view,
		      x: 0,
		      y: 0,
		      width: BOUNDS_WIDTH,
		      height: BOUNDS_HEIGHT,
		      image: "resources/images/backgrounds/background.png",
		      zIndex: 0
		    });

		//Drunk array;
		this.drunks = [
			new Drunk({superview: this, x: 20, y: 20}),
			new Drunk({superview: this, x: 100, y: 100})
		];
	};

	this.launchUI = function () {};

	//Scales the rootView
	this.scaleUI = function () {
		this.baseWidth = device.width * (BOUNDS_HEIGHT / device.height);
		this.baseHeight = BOUNDS_HEIGHT;

		this.scale = device.height / this.baseHeight;

		this.view.style.scale = this.scale;
	};
});
