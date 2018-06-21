import Player from './player';
import Enemy from './enemy';
import SpawnPoint from './spawnPoint';
import GamePhase from './gamePhase';
import ControlLayout from './input';
import { spawn } from 'child_process';
import Effect from './effect';
import Bullet from './bullet';
import { printAtInterval } from '../utils/printUtils';
import { Game, BitmapText } from 'phaser-ce';

import * as superagent from 'superagent';
import { apiKey } from '../index';

export default class GameMaster {
    /**
     * The game's main player object.
     */
    player: Player;
    /**
     * The game's phases. These act as 'stages' that control the game's flow.
     */
    gamePhases: GamePhase[];
    /**
     * The phase the game is currently on.
     */
    currentPhase: GamePhase;
    /**
     * The last active phase, excluding advancing phases.
     */
    latestPhase: GamePhase;
    /**
     * The list of spawn points that the game's enemies will be created at.
     */
    spawnPoints: SpawnPoint[];
    /**
     * A list of all of the game's existing enemies.
     */
    enemies: Enemy[];
    /**
     * A list of all of the game's enemy projectiles.
     */
    enemyBullets: any[];
    /**
     * A list of all of the game's existing visual effects.
     */
    effects: Effect[];
    /**
     * The current game's score.
     */
    score: number;
    /**
     * Tells whether the game is paused or not.
     */
    isPaused: boolean;
    /**
     * The last phase the game was in.
     */
    previousPhase: GamePhase;
    /**
     * The text that will appear when the game advances to the next phase.
     */
    advanceText: Phaser.BitmapText;
    gameOverText: Phaser.BitmapText;
    gameOverMessage: string;
    /**
     * Defines how often the on-screen message for a phase change will blink. 
     */
    blinkTime: number;
    /**
     * Counts down the blink time.
     */
    private blinkTimer: number;
    /**
     * Defines how much time should be given between phases.
     */
    phaseChangeTime: number;
    /**
     * Counts down the phase change time.
     */
    private phaseChangeTimer: number;
    /**
     * Whether the game is over or not.
     */
    gameOver: boolean;
    gameEnded: boolean;

    /**
     * A Singleton that will control most of the game's flow and behaviors, and store important game properties and objects.
     * At the start, the game's score will be set to 0.
     */
    constructor() {
        this.score = 0;
        this.phaseChangeTime = 200;
        this.phaseChangeTimer = this.phaseChangeTime;
        this.blinkTime = 40;
        this.blinkTimer = this.blinkTime;

        this.enemies = [];
        this.enemyBullets = [];
        this.effects = [];
        this.isPaused = false;
        this.gameOver = false;
        this.gameEnded = false;
    }

    /**
     * Adds a player object to the Game Master.
     * @param player The player to be added.
     */
    addPlayer(player: Player) {
        this.player = player;
    }
    /**
     * Adds the list of game phases to the Game Master.
     * @param gamePhases The array of phases to be added.
     */
    addGamePhases(gamePhases: GamePhase[]) {
        this.gamePhases = gamePhases;
    }
    /**
     * Adds the list of spawn points to the Game Master.
     * @param spawnPoints The array of spawn points to be added.
     */
    addSpawnPoints(spawnPoints: SpawnPoint[]) {
        this.spawnPoints = spawnPoints
    }

    /**
     * Sets the initial values of the Game Master
     */
    initialize() {
        this.currentPhase = this.getPhase("combat D");
        this.isPaused = false;
        
        this.advanceText = this.player.game.add.bitmapText(this.player.game.width / 2, this.player.game.height / 2, 'smb3', 'phase change', 32);
        this.advanceText.anchor.setTo(0.5, 0.5);
        this.advanceText.alpha = 0;
        
        this.gameOverMessage = `game over \n your score \n ${this.score}`;
        this.gameOverText = this.player.game.add.bitmapText(this.player.game.width / 2, this.player.game.height / 2, 'smb3', this.gameOverMessage, 25);
        this.gameOverText.anchor.setTo(0.5, 0.5);
        this.gameOverText.alpha = 0;
    }

    /**
     * Returns a game phase specified by either its name or difficulty.
     * @param selectPhase The phase to be searched. Specify either the name as a string, or the difficulty as a number.
     */
    getPhase(selectPhase: string | number): GamePhase {
        if(typeof selectPhase == 'string') {
            return this.gamePhases.filter(phase => selectPhase == phase.name)[0];
        } else {
            return this.gamePhases.filter(phase => selectPhase == phase.maxDifficulty)[0];
        }
    }

    /**
     * Sets a game object to null and removes it from its corresponding object pool.
     * @param list The array that the object belongs to.
     * @param object The object to be set to null and removed from the array.
     */
    cleanUp(list, object) {
        if(object.destroyed == true) {
            object = null;
            list.splice(object, 1);
        }
    }
    /**
     * Advance to the next phase.
     */
    nextPhase() {
        if(this.phaseChangeTimer >= 0) {
            this.phaseChangeTimer --;
            if(this.blinkTimer <= 0 && this.advanceText.alpha == 1) {
                this.advanceText.alpha = 0;
                this.blinkTimer = this.blinkTime;
            } else if(this.blinkTimer <= 0 && this.advanceText.alpha == 0){
                this.advanceText.alpha = 1;
                this.blinkTimer = this.blinkTime
            } else {
                this.blinkTimer --;
            }
        } else {
            this.advanceText.alpha = 0;

            this.currentPhase = this.getPhase(this.latestPhase.maxDifficulty + 1);
            this.phaseChangeTimer = this.phaseChangeTime;
        }
    }

    /**
     * Updates the game objects according to game phases.
     * Iterates through object pools to update them and, if necessary, deletes them for optimization.
     */
    update() {
        if(!this.isPaused && !this.gameOver) {
            this.player.update();
            this.enemies.forEach((enemy, index) => {
                enemy.update();
                this.cleanUp(enemy, this.enemies);
            });
            this.enemyBullets.forEach((enemyBullet, index) => {
                enemyBullet.update();
            });
            this.effects.forEach((effect, index) => {
                effect.update();
                this.cleanUp(effect, this.effects);
            });
            this.spawnPoints.forEach((spawnPoint, index) => {
                spawnPoint.update();
                this.cleanUp(spawnPoint, this.spawnPoints);
            });
        } else if(this.isPaused) {
            this.player.stop();
            this.player.bullets.forEach((bullet, index) => {
                bullet.stop();
            });
            this.enemies.forEach((enemy, index) => {
                enemy.stop();
            });
            this.enemyBullets.forEach((enemyBullet, index) => {
                enemyBullet.stop();
            });
            this.effects.forEach((effect, index) => {
                effect.stop();
            });
            this.spawnPoints.forEach((spawnPoint, index) => {
                spawnPoint.stop();
            });
        } else if (this.gameOver) {
            this.gameOverMessage = `game over \n your score \n` + this.score;
            this.gameOverText = this.player.game.add.bitmapText(this.player.game.width / 2, this.player.game.height / 2, 'smb3', this.gameOverMessage, 25);
            this.gameOverText.anchor.setTo(0.5, 0.5);
            this.gameOverText.alpha = 1;
            this.advanceText.alpha = 0;

            this.player.stop();
            this.player.bullets.forEach((bullet, index) => {
                bullet.stop();
            });
            this.enemies.forEach((enemy, index) => {
                enemy.stop();
            });
            this.enemyBullets.forEach((enemyBullet, index) => {
                enemyBullet.stop();
            });
            this.effects.forEach((effect, index) => {
                effect.stop();
            });
            this.spawnPoints.forEach((spawnPoint, index) => {
                spawnPoint.stop();
            });

            superagent.post('http://api.arcadehub.me/score').set('Authorization', apiKey).send({gameName: 'Valkyrie Fighter', score: this.score}).end((err, data) => {
                if(err != undefined) {
                    console.log('Ha ocurrido un error');
                }
            });
            this.gameEnded = true;
        }

        if(this.player.keys.pause.justDown) {
            if(this.isPaused == true) {
                this.isPaused = false;
            } else {
                this.isPaused = true;
            }
        }

        if(this.score >= this.currentPhase.maxScore) {
            this.latestPhase = this.currentPhase;
            this.advanceText.alpha = 1;
            this.currentPhase = this.getPhase('advance');
        }

        switch (this.currentPhase) {
            case this.getPhase('combat D'):
                this.currentPhase.setEnemies(['pod', 'pod', 'pod', 'pod', 'fighter', 'fighter', 'pod', '', '', '']);
                break;
            case this.getPhase('combat C'):
                this.currentPhase.setEnemies(['pod', 'pod', 'pod', 'pod', 'fighter', 'fighter', 'fighter', '', '', '']);
                break;
            case this.getPhase('combat B'):
                this.currentPhase.setEnemies(['pod', 'fighter', 'pod', 'pod', 'fighter', 'superPod', 'superPod', 'boostedPod', 'boostedPod', '']);
                break;
            case this.getPhase('combat A'):
                this.currentPhase.setEnemies(['pod', 'fighter', 'pod', 'pod', 'fighter', 'superPod', 'superPod', 'fighter', 'boostedPod', 'boostedPod']);
                break;
            case this.getPhase('advance'):
                this.currentPhase.setEnemies(['', '', '', '', '', '', '', '', '', '']);
                this.nextPhase();
                break;
        }
    }
}