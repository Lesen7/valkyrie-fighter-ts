import Player from './player';
import Enemy from './enemy';
import SpawnPoint from './spawnPoint';
import GamePhase from './gamePhase';
import ControlLayout from './input';
import { spawn } from 'child_process';

export default class GameMaster {
    // Properties
    player: Player;
    gamePhases: GamePhase[];
    currentPhase: GamePhase;
    spawnPoints: SpawnPoint[];
    enemies: Enemy[];
    score: number;

    // Methods
    constructor() {
        this.score = 0;
    }

    addPlayer (player: Player) {
        this.player = player;
    }

    addGamePhases (gamePhases: GamePhase[]) {
        this.gamePhases = gamePhases;
    }
    addSpawnPoints (spawnPoints: SpawnPoint[]) {
        this.spawnPoints = spawnPoints
    }

    initialize() {
        this.currentPhase = this.gamePhases[3];
    }

    update () {
        // Update the game according to game pahses
        if (this.currentPhase.maxDifficulty == 1) {
            this.player.update;
            this.enemies.forEach((enemy, index) => {
                enemy.update();
            });
        }
        this.spawnPoints.forEach((spawnPoint, index) => {
            spawnPoint.update();
        });
    }
}