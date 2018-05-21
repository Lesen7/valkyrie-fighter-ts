import * as Phaser from 'phaser-ce';

// Class imports
import Actor from './models/actor';
import Player from './models/player';
import Enemy from './models/enemy';
import ControlLayout from './models/input';

window.onload = () => {
    // Game configuration object
    const config = {
        width: 600,
        height: 800,
        renderer: Phaser.AUTO,
        transparent: false,
        antialias: false,
        multiTexture: true,
        state: {
            preload,
            create,
            update,
        },
        physicsConfig: {

        }
    };
    
    // Game initialization
    const game = new Phaser.Game(config);

    function preload() {
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

    // Global input variables
    let keys: ControlLayout;

    // Global Player variables
    let player: Player;
    let playerSprite;

    function create() {
        // Input configuration
        const keysConfig = {
            fire: game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR),
            special: game.input.keyboard.addKey(Phaser.KeyCode.CONTROL),
            up: game.input.keyboard.addKey(Phaser.KeyCode.W),
            left: game.input.keyboard.addKey(Phaser.KeyCode.A),
            down: game.input.keyboard.addKey(Phaser.KeyCode.S),
            right: game.input.keyboard.addKey(Phaser.KeyCode.D)
        };
        keys = new ControlLayout(keysConfig);

        // Player initialization
        playerSprite = game.add.sprite(32, game.world.height - 150, 'vf1_sp');
        player = new Player(100, 5, playerSprite);

        // Player animations
        player.sprite.animations.add('thrusters', null, 10, true);
    }

    function update() {
        // Player input (movement)
        if (keys.left.isDown) {
            player.move(-player.speed, 0);
            player.sprite.animations.play('turn_l');
        } else if (keys.right.isDown) {
            player.move(player.speed, 0);
            player.sprite.animations.play('turn_r');
        } else {
            player.sprite.animations.play('thrusters');
        }
        if (keys.up.isDown) {
            player.move(0, -player.speed);
        } else if (keys.down.isDown) {
            player.move(0, player.speed);
        }

        // TODO: proper player death
        if (player.health <= 0) {
            player.sprite.kill();
        }
    }
};
