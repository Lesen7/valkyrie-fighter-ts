import * as Phaser from 'phaser-ce';

// Class imports
import Actor from './models/actor';
import Player from './models/player';
import Enemy from './models/enemy';
import ControlLayout from './models/input';
import { Sprite } from 'phaser-ce';

window.onload = function() {
    // Configuration object
    var config = {
        width: 600,
        height: 800,
        renderer: Phaser.AUTO,
        transparent: false,
        antialias: false,
        multiTexture: true,
        state: {
            preload: preload,
            create: create,
            update: update
        },
        physicsConfig: {

        }
    }

    // Game initialization
    var game = new Phaser.Game(config);

    // Input configuration variables
    var keysConfig = {
        fire: Phaser.KeyCode.SPACEBAR,
        special: Phaser.KeyCode.CONTROL,
        up: Phaser.KeyCode.W,
        left: Phaser.KeyCode.LEFT,
        down: Phaser.KeyCode.DOWN,
        right: Phaser.KeyCode.RIGHT,
    }
    var keys: ControlLayout;

    function preload () {
        // Background images
        game.load.image('stars_bg_0', 'assets/backgrounds/stars_bg_0.png');
        game.load.image('stars_bg_1', 'assets/backgrounds/stars_bg_1.png');
    
        // Player sprites/images
        game.load.image('player_bullet', 'assets/sprites/vf1/player_bullet.png');
        game.load.spritesheet('vf1_sp', 'assets/sprites/vf1/vf1_sp.png', 32, 37);
        game.load.spritesheet('vf1_turn_l', 'assets/sprites/vf1/vf1_turn_l.png', 32, 37);
        game.load.spritesheet('vf1_turn_r', 'assets/sprites/vf1/vf1_turn_r.png', 32, 37);
    
        // Enemy sprites/images
        game.load.spritesheet('reguld_sp', 'assets/sprites/reguld/reguld_sp.png', 32, 37);
        game.load.spritesheet('reguld_move', 'assets/sprites/reguld/reguld_move.png', 32, 37);
    }

    // Player variables
    var player: Player;
    var playerSpr;

    function create () {
        // Input initialization
        keys = new ControlLayout(keysConfig);

        // Player initialization
        playerSpr = game.add.sprite(32, game.world.height - 150, 'vf1_sp');
        player = new Player(10, 50, playerSpr);
    }

    function update () {
        // Movement input
        if(keys.up.isDown)
        {
            player.move(0, player.speed);
        }
        if(keys.down.isDown)
        {
            player.move(0, -player.speed);
        }

        // TODO: proper player death
        if(player.health <= 0)
        {
            player.sprite.kill();
        }
    }
};