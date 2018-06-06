import Player from './player';
import Enemy from './enemy';
import SpawnPoint from './spawnPoint';
import GamePhase from './gamePhase';
import ControlLayout from './input';
import { spawn } from 'child_process';
import Effect from './effect';
import { printAtInterval } from '../utils/printUtils';

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
     * A Singleton that will control most of the game's flow and behaviors, and store important game properties and objects.
     * At the start, the game's score will be set to 0.
     */
    constructor() {
        this.score = 0;
        this.enemies = [];
        this.effects = [];
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
     * Sets an game object to null and removes it from its corresponding object pool.
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
     * Updates the game objects according to game phases.
     * Iterates through object pools to update them and, if necessary, delete them for optimization.
     */
    update() {
        if (this.currentPhase.maxDifficulty > 0) {
            this.player.update;
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
        }
        printAtInterval(20, 'Enemies: ' + this.enemies);
    }
}