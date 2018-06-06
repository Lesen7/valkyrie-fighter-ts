import Player from './player';
import Enemy from './enemy';
import SpawnPoint from './spawnPoint';
import GamePhase from './gamePhase';
import ControlLayout from './input';
import { spawn } from 'child_process';
import Effect from './effect';

export default class GameMaster {
    // Properties
    player: Player;
    gamePhases: GamePhase[];
    currentPhase: GamePhase;
    spawnPoints: SpawnPoint[];
    enemies: Enemy[];
    effects: Effect[];
    score: number;

    // Methods
    constructor() {
        this.score = 0;
    }

    addPlayer(player: Player) {
        this.player = player;
    }

    addGamePhases(gamePhases: GamePhase[]) {
        this.gamePhases = gamePhases;
    }
    addSpawnPoints(spawnPoints: SpawnPoint[]) {
        this.spawnPoints = spawnPoints
    }

    initialize() {
        this.currentPhase = this.getPhase("combat D");
    }

    getPhase(selectPhase: string | number) {
        if(typeof selectPhase == "string") {
            return this.gamePhases.filter(phase => selectPhase == phase.name)[0];
        } else {
            return this.gamePhases.filter(phase => selectPhase == phase.maxDifficulty)[0];
        }
    }

    cleanUp() {
        this.enemies.forEach((enemy, index) => {
            if(enemy.destroyed == true) {
                enemy = null;
            }
        });
        this.effects.forEach((effect, index) => {
            if(effect.destroyed == true) {
                effect = null;
            }
        });
        this.spawnPoints.forEach((spawnPoint, index) => {
            if(spawnPoint.destroyed == true) {
                spawnPoint = null;
            }
        });
        this.player.bullets.forEach((playerBullet, index) => {
            if(playerBullet.destroyed == true) {
                playerBullet = null;
            }
        });
    }

    update() {
        // Update the game according to game pahses
        if (this.currentPhase.maxDifficulty > 0) {
            this.player.update;
            this.enemies.forEach((enemy, index) => {
                enemy.update();
            });
            this.effects.forEach((effect, index) => {
                effect.update();
            });
            this.spawnPoints.forEach((spawnPoint, index) => {
                spawnPoint.update();
            });
            this.cleanUp();
        }
    }
}