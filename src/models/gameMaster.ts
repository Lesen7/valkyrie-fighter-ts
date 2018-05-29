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
    constructor(player: Player, gamePhases: GamePhase[], spawnPoints: SpawnPoint[]) {
        this.player = player;
        this.gamePhases = gamePhases;
        this.spawnPoints = spawnPoints;
    }
}