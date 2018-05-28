import * as Phaser from 'phaser-ce';

// Class imports
import Actor from './models/actor';
import Player from './models/player';
import Enemy from './models/enemy';
import ControlLayout from './models/input';
import Bullet from './models/bullet';

// Global groups
let enemies: Enemy[];
export {enemies};

window.onload = () => {
    // Game configuration object
    const config = {
        width: 650,
        height: 650,
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
        game.load.spritesheet('pod_move', 'assets/sprites/reguld/reguld_move.png', 33, 37);
    }

    // Global input variables
    let keys: ControlLayout;

    // Global Player variables
    let player: Player;
    let playerSprite: Phaser.Sprite;

    // Global enemy variables
    let enemy: Enemy;
    let enemySprite: Phaser.Sprite;

    // TODO: Global custom actor groups

    // Background images
    let background0: Phaser.TileSprite;
    let background1: Phaser.TileSprite;

    function create() {
        // Game variable initializations
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Backgrounds tilesprites. Numbered according to 'z-index'
        background0 = game.add.tileSprite(game.world.width / 2 - 300, 0, 600, 800, 'stars_bg_0');
        background1 = game.add.tileSprite(game.world.width / 2 - 300, 0, 600, 800, 'stars_bg_1');

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
        player = new Player(game, keys, playerSprite, 100, 250, 6, 12, -7);


        // Enemy initializations
        enemySprite = game.add.sprite(game.world.width / 2, 10, 'pod_move');
        enemy = new Enemy(game, enemySprite, 3, 5);
        enemies = [enemy];
    }

    function update() {
        // Game object updates
        player.update();
        enemies.forEach((enemy, index) => {
            enemy.update();
        });

        // Collisions
        game.physics.arcade.collide(player.sprite, enemy.sprite, () => {player.takeDamage(1)});

        // Scroll backgrounds
        background0.tilePosition.y += 0.4;
        background1.tilePosition.y += 0.5;
    }
};