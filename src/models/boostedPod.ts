import SuperPod from './superPod';
import { Game, Sprite } from 'phaser-ce';

export default class BoostedPod extends SuperPod {
    constructor(game: Game, sprite: Sprite) {
        super(game, sprite);
        this.health = 8;
        
        this.speed = 90;
        this.XAmplitude = 58;

        this.attackRate = 120;
        this.attackTimer = this.attackRate;
        
        this.shootOffsetX = 31;
        this.shootOffsetY = 70;

        this.score = 300;
        this.difficulty = 2;
    }
}