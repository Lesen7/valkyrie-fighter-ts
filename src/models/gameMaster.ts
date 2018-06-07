import Player from './player';
import Enemy from './enemy';
import SpawnPoint from './spawnPoint';
import GamePhase from './gamePhase';
import ControlLayout from './input';
import { spawn } from 'child_process';
import Effect from './effect';

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
     * The list of spawn points that the game's enemies will be created at.
     */
    spawnPoints: SpawnPoint[];
    /**
     * A list of all of the game's existing enemies.
     */
    enemies: Enemy[];
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
     * A Singleton that will control most of the game's flow and behaviors, and store important game properties and objects.
     * At the start, the game's score will be set to 0.
     */
    constructor() {
        this.score = 0;
        this.enemies = [];
        this.effects = [];
        this.isPaused = false;
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
    }

    /**
     * Returns a game phase specified by either its name or difficulty.
     * @param selectPhase The phase to be searched. Specify either the name as a string, or the difficulty as a number.
     */
    getPhase(selectPhase: string | number) {
        if(typeof selectPhase == "string") {
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
    displayPauseMenu() {

    }
    
    /**
     * Updates the game objects according to game phases.
     * Iterates through object pools to update them and, if necessary, deletes them for optimization.
     */
    update() {
        if(this.currentPhase.maxDifficulty > 0 && this.isPaused == false) {
            this.player.update();
            this.enemies.forEach((enemy, index) => {
                enemy.update();
                this.cleanUp(enemy, this.enemies);
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
            this.effects.forEach((effect, index) => {
                effect.stop();
            });
            this.spawnPoints.forEach((spawnPoint, index) => {
                spawnPoint.stop();
            });
        }
        if(this.player.keys.pause.justDown) {
            if(this.isPaused == true) {
                this.isPaused = false;
            } else {
                this.isPaused = true;
            }
        }
        if(this.score >= this.currentPhase.maxScore) {
            this.currentPhase = this.getPhase(this.currentPhase.maxDifficulty + 1);
        }
    }
}