import Enemy from "./enemy";
import GameMaster from "./gameMaster";
import { Game, Sprite } from 'phaser-ce';

export default class Pod extends Enemy {
    // Methods
    constructor(game: Game, gameMaster: GameMaster, sprite: Sprite) {
        super(game, gameMaster, sprite);
        this.health = 3;
        this.speed = 50;
        this.score = 100;
        this.difficulty = 1;
    }
}