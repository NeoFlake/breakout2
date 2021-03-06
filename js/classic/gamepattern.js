//======================================================================================//
//     ____    _    __  __ _____ ____   _  _____ _____ _____ ____  _   _      _ ____  	//
//    / ___|  / \  |  \/  | ____|  _ \ / \|_   _|_   _| ____|  _ \| \ | |    | / ___|   //
//   | |  _  / _ \ | |\/| |  _| | |_) / _ \ | |   | | |  _| | |_) |  \| | _  | \___ \   //
//   | |_| |/ ___ \| |  | | |___|  __/ ___ \| |   | | | |___|  _ <| |\  || |_| |___) |  //
//    \____/_/   \_\_|  |_|_____|_| /_/   \_\_|   |_| |_____|_| \_\_| \_(_)___/|____/   //
//																						//
//======================================================================================//

 // Manager du déroulement de l'écran d'histoire du jeu                                                                                

let storyManager = token => {
	swtchStoryScreen ? (
		counterLevel != 1 ? CANVAS.addEventListener("click",function(){screenAccelerator = true;}) : false,
		translateFunction("storylvl" + token + "scrn.y === 0") ? setTimeout(function(){translateFunction("storylvl" + token + "scrn.y === 0") ? translateFunction("storylvl" + token + "scrn.y -=1;") : false;},3000) : false,
		screenAccelerator ? (
			(translateFunction("storylvl" + token + "scrn.y < 0") && translateFunction("storylvl" + token + "scrn.y > -500")) ? (
				translateFunction("storylvl" + token + "scrn.y -= 100")
			) : false,
			translateFunction("storylvl" + token + "scrn.y <= -500") ? (
				setTimeout(function(){swtchStoryScreen = false; swtchlvlScreen = true;screenAccelerator = false;},1000)
			) : false
		) : (
			(translateFunction("storylvl" + token + "scrn.y < 0") && translateFunction("storylvl" + token + "scrn.y > -500")) ? (
				translateFunction("storylvl" + token + "scrn.y -= .5"),
				CANVAS.addEventListener("click",function(){screenAccelerator = true;})
			) : false,
			translateFunction("storylvl" + token + "scrn.y <= -500") ? (
				setTimeout(function(){swtchStoryScreen = false; swtchlvlScreen = true;screenAccelerator = false;},7000)
			) : false
		)
	) : false;	
}

// Fonction permettant de différer le lancement du prochain niveau en laissant l'écran Titre du niveau pendant cinq seconde

let lvlScreenManager = () => {
	swtchlvlScreen ? (
		screenAccelerator ? 
			setTimeout(function(){swtchlvlScreen = false; swtchInLvl = false; screenAccelerator = false;},5000) : 
			setTimeout(function(){swtchlvlScreen = false; swtchInLvl = false; screenAccelerator = false;},1000)
	) : false;
}

// Manager des écrans d'entre-niveaux

let interLevelManager = token => {
	storyManager(token);
	lvlScreenManager();
}

// Manager du déroulement de l'écran d'histoire de la fin du jeu

let endStory = () => {
	endGameStory ? (
		fnlstr.y === 0 ? setTimeout(function(){fnlstr.y === 0 ? fnlstr.y -= 1 : false;}, 3000) : 
			fnlstr.y > -500 ? fnlstr.y -= .5 : 
				fnlstr.y <= -500 ? setTimeout(function(){endGameStory = false; endGameCredits = true}, 3000) : false
	) : false;
}

// Fonction permettant le déroulement des crédits

let endCredits = () => {
	endGameCredits ? (
		crdt.y === 0 ? setTimeout(function(){if(crdt.y === 0){crdt.y -= 1;}}, 3000) : 
			crdt.y > -500 ? crdt.y -= .5 : 
				crdt.y <= -500 ? setTimeout(function(){endGameCredits = false; endGameFinalScreen = true}, 3000) : false
	) : false;
}

// Fonction permettant le redémarrage du jeu à la fin de celui-ci au bout de dix secondes

let finalEndScreen = () => {
	endGameFinalScreen ? (
		setTimeout(function(){window.location.reload();}, 100000)
	) : false;
}

// Manager de la fin du jeu

let endGameManager = () => {
	endStory();
	endCredits();
	finalEndScreen();
}

// Fonction de lancement du jeu

let gameLauncher = () => {
	clickStart ? (
		startEvent = true,
		clickStart = false,
		swtchInLvl = true,
		swtchStoryScreen = true
	) : false;
}

// Gestionnaire de l'intégralité des fonctions inhérente à la partie jouable du jeu (et des entre-niveaux)

let game = () => {
	startEvent ? (
		ballManager(),
		shipCollisionManager(),
		gainPoint(),
		looseLife(),
		looseGame(),
		swtchInLvl ? (
			endGame ? (
				endGameManager(),
				endGameMusicManager()
			) : (
				interLevelManager(counterLevel),
				interLevelMusicManager()
			)
		) : (
			counterLevel === 1 ? packOfCollisionEffect(translateFunction("brickpositionLevel" + counterLevel),counterLevel) : false,
			counterLevel > 1 && launcher != 1 ? packOfCollisionEffect(translateFunction("brickpositionLevel" + counterLevel),counterLevel) : false,
			brickDesign(translateFunction("brickpositionLevel" + counterLevel),counterLevel),
			levelMusic(counterLevel),
			winLevelMusicLauncher(translateFunction("brickpositionLevel" + counterLevel),counterLevel),
			passLevel(translateFunction("brickpositionLevel" + counterLevel),counterLevel)
		)
	) : gameOverMusicManager(counterLevel);
}