import * as Phaser from 'phaser-ce';

// Class imports
import Actor from './models/actor';
import Player from './models/player';

import Enemy from './models/enemy';
import Pod from './models/pod';
import Fighter from './models/fighter';

import ControlLayout from './models/input';

import Bullet from './models/bullet';

import GameMaster from './models/gameMaster';
import GamePhase from './models/gamePhase';
import SpawnPoint from './models/spawnPoint';

import Effect from './models/effect';

import { Sprite } from 'phaser-ce';
import { start } from 'repl';
import leftPad from './utils/formatUtils';

let gameMaster = new GameMaster();
export default gameMaster;

// export let apiKey: string;

window.onload = () => {
    //apiKey = window.location.search.split("?")[1].split("=")[1];
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
        // Fonts
        game.load.bitmapFont('smb3', 'assets/fonts/smb3.png', 'assets/fonts/smb3.fnt');

        // Background images
        game.load.image('stars_bg_0', 'assets/backgrounds/stars_bg_0.png');
        game.load.image('stars_bg_1', 'assets/backgrounds/stars_bg_1.png');

        // Player sprites/images
        game.load.image('player_bullet', 'assets/sprites/vf1/player_bullet.png');
        game.load.spritesheet('enemy_pellet', 'assets/sprites/enemy_pellet/enemy_pellet.png', 8, 8);
        game.load.spritesheet('vf1_sp_sh', 'assets/sprites/vf1/vf1_sp_sh.png', 32, 37);

        // Enemy sprites/images
        game.load.spritesheet('pod_move', 'assets/sprites/reguld/reguld_move.png', 33, 37);
        game.load.spritesheet('fighter_move', 'assets/sprites/gnerl/gnerl_move.png', 33, 37);
        game.load.spritesheet('glaug_move', 'assets/sprites/glaug/glaug_move.png', 32, 37);
        game.load.spritesheet('boosted_glaug', 'assets/sprites/boosted_glaug/boosted_glaug.png', 44, 68);
        
        game.load.spritesheet('enemy_pellet', 'assets/sprites/enemy_pellet/enemy_pellet.png', 8, 8);
        game.load.spritesheet('enemy_laser', 'assets/sprites/enemy_laser/enemy_laser.png', 3, 24);

        game.load.spritesheet('explosion_sm', 'assets/sprites/explosion_sm/explosion_sm.png', 33, 37);

        // UI sprites/images
        game.load.image('player_plate', 'assets/sprites/ui/playerPlate.png');
        game.load.image('score_plate', 'assets/sprites/ui/scorePlate.png');
        game.load.image('health_bar', 'assets/sprites/ui/healthBar.png');
    }

    // Global input variables
    let keys: ControlLayout;

    // Global Player variables
    let player: Player;
    let playerSprite: Phaser.Sprite;

    // Global enemy variables
    let enemy: Enemy;
    let enemySprite: Phaser.Sprite;

    // Global custom actor groups
    let gamePhases: GamePhase[];
    let spawnPoints: SpawnPoint[];

    // Text variables
    let scoreText: Phaser.BitmapText;
    let scoreMessage: string;
    let style;
    let pauseText: Phaser.BitmapText;
    let pauseMessage: string;

    // Background images
    let background0: Phaser.TileSprite;
    let background1: Phaser.TileSprite;

    // UI images/sprites
    let playerPlate: Phaser.Sprite;
    let scorePlate: Phaser.Sprite;
    let healthBars: Phaser.Sprite[];

    // Test variables
    let fighter;
    let fighterSprite: Phaser.Sprite;

    function create() {
        // Test inits
        fighterSprite = game.add.sprite(game.width / 2, game.height / 2, 'fighter_move');
        fighter = new Fighter(game, fighterSprite);

        // Game variable initializations
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Backgrounds tilesprites. Numbered according to 'z-index'
        background0 = game.add.tileSprite(game.world.width / 2 - 300, 0, 600, 800, 'stars_bg_0');
        background1 = game.add.tileSprite(game.world.width / 2 - 300, 0, 600, 800, 'stars_bg_1');

        // UI images/sprites initializations
        playerPlate = game.add.sprite(0, game.height / 2, 'player_plate');
        playerPlate.anchor.setTo(0, 0.5);
        game.physics.arcade.enableBody(playerPlate);
        playerPlate.body.immovable = true;
        scorePlate = game.add.sprite(game.width, game.height / 2, 'score_plate');
        scorePlate.anchor.setTo(1, 0.5);
        game.physics.arcade.enableBody(scorePlate);
        scorePlate.body.immovable = true;

        healthBars = [];

        // UI text initializations

        scoreMessage = "score\n".split('').join('\n');
        scoreText = game.add.bitmapText(game.width - 25, game.height / 2, 'smb3', scoreMessage, 20);
        scoreText.anchor.setTo(0.5, 0.5);
        pauseText = game.add.bitmapText(game.width / 2, game.height / 2, 'smb3', '', 20);
        pauseMessage = "game paused";

        // Input configuration
        const keysConfig = {
            fire: game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR),
            special: game.input.keyboard.addKey(Phaser.KeyCode.CONTROL),
            up: game.input.keyboard.addKey(Phaser.KeyCode.W),
            left: game.input.keyboard.addKey(Phaser.KeyCode.A),
            down: game.input.keyboard.addKey(Phaser.KeyCode.S),
            right: game.input.keyboard.addKey(Phaser.KeyCode.D),
            pause: game.input.keyboard.addKey(Phaser.KeyCode.P),
            die: game.input.keyboard.addKey(Phaser.KeyCode.K)
        };
        keys = new ControlLayout(keysConfig);

        // Player initializations
        playerSprite = game.add.sprite(game.world.width / 2, game.world.height - 150, 'vf1_sp_sh');
        player = new Player(game, keys, playerSprite, 10, 250, 5, 10, -14);

        addHealthBars(269, 9, 11);

        // Creating and initializing the GameMaster object
        gamePhases = [
            new GamePhase('advance', -1, undefined, 0),
            new GamePhase('scramble', 0, 0, 0),
            new GamePhase('combat D', 1, 1500, 0),
            new GamePhase('combat C', 2, 3000, 0.1),
            new GamePhase('combat B', 3, 6500, 0.2),
            new GamePhase('combat A', 4, 12000, 0.3),
            new GamePhase('combat S', 5, 25000, 0.4),
            new GamePhase('combat SS', 6, undefined, 0.5)
        ];
        spawnPoints = [
            new SpawnPoint(game, game.add.sprite(game.width / 2, 5), 0.4),
            new SpawnPoint(game, game.add.sprite(120, 5), 0.5),
            new SpawnPoint(game, game.add.sprite(game.width - 152, 5), 0.4)
        ];
        gameMaster.addPlayer(player);
        gameMaster.addGamePhases(gamePhases);
        gameMaster.addSpawnPoints(spawnPoints);
        gameMaster.initialize();
        gameMaster.player.healthBars = healthBars;
    }
    function update() {
        // Game object updates
        if(gameMaster.gameEnded == false) {
            gameMaster.update();
        }
        scoreText.text = scoreMessage + leftPad(gameMaster.score.toString(), 8, "0").split('').join('\n');

        // Special collisions
        game.physics.arcade.collide(gameMaster.player.sprite, playerPlate);
        game.physics.arcade.collide(gameMaster.player.sprite, scorePlate);
        gameMaster.enemyBullets.forEach((enemyBullet, index) => {
            game.physics.arcade.collide(enemyBullet.sprite, playerPlate, () => {enemyBullet.destroy();});
            game.physics.arcade.collide(enemyBullet.sprite, scorePlate, () => {enemyBullet.destroy();});
        })
        
        // Scroll backgrounds
        if(gameMaster.isPaused == false) {
            if(pauseText != undefined) {
                pauseText.text = ' ';
            }
            background0.tilePosition.y += 0.4;
            background1.tilePosition.y += 0.5;
        } else {
            pauseText.text = pauseMessage;
            pauseText.anchor.setTo(0.5, 0.5);
        }
    }

    function addHealthBars(startPoint: number, xOffset: number, ySpacing: number) {
        let c;
        for (c = 0; c < 10; c++) {
            let sprite: Sprite;
            if(c == 0) {
                sprite = game.add.sprite(playerPlate.x + xOffset, startPoint, 'health_bar');
                sprite.anchor.set(0, 0.5);
                healthBars.push(sprite);
            } else {
                sprite = game.add.sprite(playerPlate.x + xOffset, startPoint + ySpacing * c, 'health_bar');
                sprite.anchor.set(0, 0.5);
                healthBars.push(sprite);
            }
        }
    }
};