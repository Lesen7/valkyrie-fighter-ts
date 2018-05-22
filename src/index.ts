import * as Phaser from 'phaser-ce';

// Class imports
import Actor from './models/actor';
import Player from './models/player';
import Enemy from './models/enemy';
import ControlLayout from './models/input';
import Bullet from './models/bullet';

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
        game.load.spritesheet('vf1_sp_sh', 'assets/sprites/vf1/vf1_sp_sh.png', 32, 37);

        // Enemy sprites/images
        game.load.spritesheet('reguld_sp', 'assets/sprites/reguld/reguld_sp.png', 32, 37);
        game.load.spritesheet('reguld_move', 'assets/sprites/reguld/reguld_move.png', 32, 37);
    }

    // Global input variables
    let keys: ControlLayout;

    // Global Player variables
    let player: Player;
    let playerSprite: Phaser.Sprite;
    let playerBullet: Bullet;

    // TODO: Global custom actor groups

    // Background images
    let background0: Phaser.TileSprite;
    let background1: Phaser.TileSprite;

    function create() {
        // Game variable initializations
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Backgrounds
        background0 = game.add.tileSprite(0, 0, 600, 800, 'stars_bg_0');
        background1 = game.add.tileSprite(0, 0, 600, 800, 'stars_bg_1');

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

        // Player initializations
        playerSprite = game.add.sprite(32, game.world.height - 150, 'vf1_sp_sh');
        player = new Player(game, playerSprite, 100, 5, 5, 11);
        game.physics.arcade.enable(player.sprite);
        player.sprite.body.collideWorldBounds = true;
        player.bullets = [];
        // Player animations
        player.sprite.animations.add('turn_l', [0, 1], 10, true);
        player.sprite.animations.add('thrusters', [2, 3], 10, true);
        player.sprite.animations.add('turn_r', [4, 5], 10, true);
    }

    function update() {
        // Scroll backgrounds
        background0.tilePosition.y += 0.4;
        background1.tilePosition.y += 0.5;

        // Player input
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
        if (keys.fire.isDown) {
            player.attack();
        }

        // Move the player bullets until they reach the edge of the screen
        if (player.bullets != null) {
            player.bullets.forEach((element, index) => {
                if (element.sprite.y > 0) {
                    element.move();
                } else {
                    element.sprite.kill();
                    player.bullets.splice(index, 1);
                    // This is done so the Garbage Collector can reclaim the object
                    element = undefined;
                }
            });
        }
    }
};
