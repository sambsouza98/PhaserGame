class Game extends Phaser.State {

    // ===== 'Phaser.State' CONSTRUCTOR =====
    // This is ES6 Standard; it's a simple way
    // to call the constructor from the parent class.
    constructor() {
	super();
    }

    // ============ STATE LOADER ============
    // Is the first method to run on the state; its sole
    // purpose is to load the assets you want to use.
    preload() {
		this.game.load.spritesheet('player', 'assets/dude.png',32,48);
		this.game.load.image('platform', 'assets/platform.png');
    }

    // =========== STATE CREATION ===========
    // Is the method to create the state and all the objects
    // you want to appear on the state. It only happens once!
    create() {
	console.log("Game!");

	this.background = this.game.add.image(this.game.width,this.game.height,'background');
	this.background.angle = 180;
	this.input.onDown.add(this._startGame, this);
	
	this.player = this.game.add.image(200,200,'player');
	this.player_y_vel = 0;
	this.gravity = 0.1;

	this.keyLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	this.keyRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	this.keyUp = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
	this.keyDown = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

	this.platforms = [];
	this.timer = this.game.time.create();
	this.timer.loop(1000, this.createPlatform, this);
	this.timer.start();

	this.floor = this.game.add.image(0, 600, 'platform');
	this.floor.x = 0;
	this.floor.scale.x = 5;
	this.floor.y = 550;
    }

    // ============= GAME LOOP! =============
    // This is the game loop method! It will be called as close
    // to 60fps in the browser as it can.
    update() {
		// Player		
		if(this.keyLeft.isDown){
			this.player.x -= 5.0;
		}
		if(this.keyRight.isDown){
			this.player.x += 5.0;
		}
		if(this.keyUp.isDown){
			this.player.y -= 10.0;
			this.player_y_vel = 0.0;
		}	
	

		this.player_y_vel += this.gravity;
		this.player.y += this.player_y_vel;

		for(var i = 0; i < this.platforms.length; i+=1){
			if(this.platforms[i].getBounds().contains(this.player.x+16,this.player.y+48) && !this.keyDown.isDown){
				this.player_y_vel = 0.0;
				this.player.y = this.platforms[i].y-48;
			}

		}

		if(this.floor.getBounds().contains(this.player.x+16,this.player.y+48)){
			this.player_y_vel = 0.0;
			this.player.y = this.floor.y-48;
		}

		// Platforms
		for(var i = 0; i < this.platforms.length; i+=1){
			this.platforms[i].y -= 3;
		}
    }

    // ========== PRIVATE METHODS ===========
    // Remember to be careful not to name any private method
    // of the class as one of the reserved methods, or things
    // will go awry.
    _startGame () {
	this.game.state.start('game');
    }

	createPlatform () {
		var platform = this.game.add.image(Math.random()*700, 600, 'platform');
		this.platforms.push(platform);
	}
}
