//Devkit imports
import menus.views.MenuView as MenuView;

//Our Imports
import .Drunk as Drunk;
import .TrailBox as TrailBox;

exports = Class(GC.Application, function () {


	this.initUI = function () {

		this.style.backgroundColor = "#FFFFFF";

		this.createMenus();

		//Listen for a gameStarted event dispatched by the mainMenu
		this.mainMenu.on('gameStarted', bind(this, function(){
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
					GC.app.drunks[GC.app.target].addTrail(opts);
				}
			});

			//The touch ended on the superview, set the target to null;
			this.view.on("InputOut", function () {
				GC.app.target = -1;
			});
		}));
	};

	this.launchUI = function () {};

	this.createMenus = function() {
		/* Create and show main menu
		 * When the Start Game menu item is pressed, emits an gameStarted event
		 * When the Settings or the Tutorial is pressed, shows the correspondent menu
		 */
		this.mainMenu = new MenuView({
			superview: GC.app.view,
			title: 'Main Menu',
			items: [
				{item: 'Start Game', action: 'gameStarted'},
				{item: 'Settings', action: bind(this.settingsMenu, 'show')},
				{item: 'Tutorial', action: bind(this.tutorialDialog, 'show')}
			]
		}).show();

		//create settings menus
		this.settingsMenu = new MenuView({
			superview: GC.app.view,
			title: 'Settings',
			items: [
				{item: 'Som', action: 'coiso'}
			],
			backCB: bind(this.mainMenu, 'show')
		});

		//create tutorial menu
		this.tutorialDialog = new MenuView({
			superview: GC.app.view,
			title: 'Tutorial',
			items: [
				{item: 'Som', action: 'coisito'}
			],
			backCB: bind(this.mainMenu, 'show')
		});
	};
});
