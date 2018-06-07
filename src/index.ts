import * as Phaser from 'phaser-ce';

// Class imports
import Actor from './models/actor';
import Player from './models/player';
import Enemy from './models/enemy';
import Pod from './models/pod';
import ControlLayout from './models/input';
import Bullet from './models/bullet';
import GameMaster from './models/gameMaster';
import GamePhase from './models/gamePhase';
import SpawnPoint from './models/spawnPoint';
import Effect from './models/effect';
import { Sprite } from 'phaser-ce';
import { start } from 'repl';

let gameMaster = new GameMaster();
export default gameMaster;

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
        // Fonts
        game.load.bitmapFont('smb3', 'assets/fonts/smb3.png', 'assets/fonts/smb3.fnt');

        // Background images
        game.load.image('stars_bg_0', 'assets/backgrounds/stars_bg_0.png');
        game.load.image('stars_bg_1', 'assets/backgrounds/stars_bg_1.png');

        // Player sprites/images
        game.load.image('player_bullet', 'assets/sprites/vf1/player_bullet.png');
        game.load.spritesheet('vf1_sp_sh', 'assets/sprites/vf1/vf1_sp_sh.png', 32, 37);

        // Enemy sprites/images
        game.load.spritesheet('pod_move', 'assets/sprites/reguld/reguld_move.png', 33, 37);
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

    function create() {
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
            pause: game.input.keyboard.addKey(Phaser.KeyCode.P)
        };
        keys = new ControlLayout(keysConfig);

        // Player initializations
        playerSprite = game.add.sprite(game.world.width / 2, game.world.height - 150, 'vf1_sp_sh');
        player = new Player(game, keys, playerSprite, 10, 250, 6, 12, -7);

        addHealthBars(game.world.height / 2 - 20, 15, 12);

        // Creating and initializing the GameMaster object
        gamePhases = [
            new GamePhase('advance', -2, -2),
            new GamePhase('main menu', -1, -1),
            new GamePhase('scramble', 0, 0),
            new GamePhase('combat D', 1, 5000),
            new GamePhase('combat C', 2, 10000),
            new GamePhase('combat B', 3, 15000),
            new GamePhase('combat A', 4, 20000),
            new GamePhase('combat S', 5, 25000),
            new GamePhase('combat SS', 6, 30000)
        ];
        spawnPoints = [
            new SpawnPoint(game, gameMaster, game.add.sprite(game.width / 2, 5), 1.1),
            new SpawnPoint(game, gameMaster, game.add.sprite(120, 5), 1),
            new SpawnPoint(game, gameMaster, game.add.sprite(game.width - 152, 5), 1.2)
        ];
        gameMaster.addPlayer(player);
        gameMaster.addGamePhases(gamePhases);
        gameMaster.addSpawnPoints(spawnPoints);
        gameMaster.initialize();
<<<<<<< HEAD

        // Initializing GameMaster arrays
        gameMaster.enemies = [(new Pod(game, gameMaster, game.add.sprite(game.world.width / 2, 10, 'pod_move')))];
        gameMaster.effects = [(new Effect(game, game.add.sprite(2000, 2000, 'explosion_sm')))];
=======
>>>>>>> fec454e5702ff6ffca55c2024118a0d708ce7654
    }
    function update() {
        // Game object updates
        gameMaster.update();
        scoreText.text = scoreMessage + leftPad(gameMaster.score.toString(), 8, "0").split('').join('\n');

        // Special collisions
        game.physics.arcade.collide(gameMaster.player.sprite, playerPlate);
        game.physics.arcade.collide(gameMaster.player.sprite, scorePlate);
        
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

    function leftPad(text: string, pad: number, char='0'): string {
        pad = pad - text.length + 1;
        return pad > 0 ? new Array(pad).join(char) + text : text;
    }

    function addHealthBars(startPoint: number, xOffset: number, ySpacing: number) {
        for (let c = 0; c < 10; c++) {
            let sprite: Sprite;
            if(c = 0) {
                sprite = game.add.sprite(playerPlate.x + xOffset, startPoint, 'health_bar');
                sprite.anchor.set(0, 0.5);
            } else {
                sprite = game.add.sprite(playerPlate.x + xOffset, startPoint + ySpacing * c, 'health_bar');
                sprite.anchor.set(0, 0.5);
            }
        }
    }
};