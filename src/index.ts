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

    function create() {
        // Game variable initializations
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Backgrounds tilesprites. Numbered according to 'z-index'
        background0 = game.add.tileSprite(game.world.width / 2 - 300, 0, 600, 800, 'stars_bg_0');
        background1 = game.add.tileSprite(game.world.width / 2 - 300, 0, 600, 800, 'stars_bg_1');

        scoreMessage = "score\n".split('').join('\n');
        scoreText = game.add.bitmapText(game.width - 20, game.height / 2, 'smb3', scoreMessage, 22);
        scoreText.anchor.setTo(0.5, 0.5);
        pauseText = game.add.bitmapText(game.width / 2, game.height / 2, 'smb3', '', 22);
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
        playerSprite = game.add.sprite(32, game.world.height - 150, 'vf1_sp_sh');
        player = new Player(game, keys, playerSprite, 100, 250, 6, 12, -7);

        // Creating the gameMaster object
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
            new SpawnPoint(game, gameMaster, game.add.sprite(game.width - 140, 5), 1.2)
        ];
        gameMaster.addPlayer(player);
        gameMaster.addGamePhases(gamePhases);
        gameMaster.addSpawnPoints(spawnPoints);
        gameMaster.initialize();
    }
    function update() {
        // Game object updates
        gameMaster.update();
        scoreText.text = scoreMessage + leftPad(gameMaster.score.toString(), 8, "0").split('').join('\n');
        
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
};