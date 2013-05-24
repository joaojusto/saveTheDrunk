import menus.views.MenuView as MenuView;

exports.createMenus = function() {
		/* Create and show main menu
		 * When the Start Game menu item is pressed, emits an gameStarted event
		 * When the Settings or the Tutorial is pressed, shows the correspondent menu
		 */

		var rootView = GC.app.view;
		rootView.mainMenu = new MenuView({
			superview: rootView,
			title: 'Main Menu',
			items: [
				{item: 'Start Game', action: 'gameStarted'},
				{item: 'Settings', action: 'showSettingsMenu'},
				{item: 'Tutorial', action: 'showTutorialDialog'}
			]
		}).show();

		//create settings menus
		rootView.settingsMenu = new MenuView({
			superview: rootView,
			title: 'Settings',
			items: [
				{item: 'Som', action: 'coiso'}
			],
			backCB: bind(rootView.mainMenu, 'show')
		});

		//create tutorial menu
		rootView.tutorialDialog = new MenuView({
			superview: rootView,
			title: 'Tutorial',
			items: [
				{item: 'Som', action: 'coisito'}
			],
			backCB: bind(rootView.mainMenu, 'show')
		});

		GC.app.view.mainMenu.on('gameStarted', bind(this, function(){
			this.emit('menus:start');
		}));

		GC.app.view.mainMenu.on('showSettingsMenu', bind(this, function(){
			rootView.settingsMenu.show();
		}));

		GC.app.view.mainMenu.on('showTutorialDialog', bind(this, function(){
			rootView.tutorialDialog.show();
		}));
};