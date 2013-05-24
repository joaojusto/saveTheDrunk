import menus.views.MenuView as MenuView;

exports.createMenus = function() {

		var rootView = GC.app.view;

		//Create main menu
		//When any item from this menu is pressed, emits the correspondent event
		rootView.mainMenu = new MenuView({
			superview: rootView,
			title: 'Main Menu',
			items: [
				{item: 'Start Game', action: 'gameStarted'},
				{item: 'Settings', action: 'showSettingsMenu'},
				{item: 'Tutorial', action: 'showTutorialDialog'}
			]
		}).show();

		//create settings menu
		//When the back button is pressed, show mainMenu
		rootView.settingsMenu = new MenuView({
			superview: rootView,
			title: 'Settings',
			items: [
				{item: 'O justo é gay', action: 'coiso'}
			],
			backCB: bind(rootView.mainMenu, 'show')
		});

		//create tutorial menu
		//When the back button is pressed, show mainMenu
		rootView.tutorialDialog = new MenuView({
			superview: rootView,
			title: 'Tutorial',
			items: [
				{item: 'O barola também', action: 'coisito'}
			],
			backCB: bind(rootView.mainMenu, 'show')
		});

		//When it receives the gameStarted event emits another event to be listened for in the Application
		//
		/*rootView.mainMenu.on('gameStarted', bind(this, function(){
			this.emit('menus:start');
		}));*/

		//When it receives the showSettingsMenu event, shows the correspondent menu
		rootView.mainMenu.on('showSettingsMenu', bind(this, function(){
			rootView.settingsMenu.show();
		}));

		//When it receives the showTutorialDialog event, shows the correspondent menu
		rootView.mainMenu.on('showTutorialDialog', bind(this, function(){
			rootView.tutorialDialog.show();
		}));
};
