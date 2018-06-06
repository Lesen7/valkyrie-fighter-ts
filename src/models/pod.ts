import Enemy from "./enemy";
import GameMaster from "./gameMaster";
import { Game, Sprite } from 'phaser-ce';

export default class Pod extends Enemy {
    // Properties
    topX: number;
    currentX: number;
    accelX: number;
    accelXmod: number;
    currentSense: number;

    // Methods
    constructor(game: Game, gameMaster: GameMaster, sprite: Sprite) {
        super(game, gameMaster, sprite);
        this.health = 2;
        this.speed = 50;
        this.topX = 80;
        this.currentX = 0;
        this.accelX = 0;
        this.accelXmod = 90;
        this.currentSense = Math.round(Math.random());
        this.score = 100;
        this.difficulty = 1;
    }

    // Sine motion
    move() {
        this.sprite.body.velocity.y = this.speed;
        this.sprite.body.velocity.x = this.accelX;

        switch (this.currentSense) {
            case 1:
                if(this.currentX <= this.topX) {
                    this.currentX ++;
                    if(this.accelX <= this.speed) {
                        this.accelX ++;
                    } else {
                        this.accelX = this.speed;
                    }
                } else {
                    this.currentSense = 0;
                }
                break;
            case 0:
                if(this.currentX >= -this.topX) {
                    this.currentX --;
                    if(this.accelX >= -this.speed) {
                        this.accelX --;
                    } else {
                        this.accelX = -this.speed;
                    }
                } else {
                    this.currentSense = 1;
                }
                break;
        }
    }
}