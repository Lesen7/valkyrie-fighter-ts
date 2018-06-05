import Enemy from "./enemy";
import GameMaster from "./gameMaster";
import { Game, Sprite } from 'phaser-ce';

export default class Pod extends Enemy {
    // Properties
    topX: number;
    currentX: number;
    speedX: number;
    accelXMod: number;
    currentSense: number;

    // Methods
    constructor(game: Game, gameMaster: GameMaster, sprite: Sprite) {
        super(game, gameMaster, sprite);
        this.health = 2;
        this.speed = 50;
        this.topX = 120;
        this.currentX = 0;
        this.speedX = 0;
        this.accelXMod = 0.1;
        this.currentSense = Math.round(Math.random());
        this.score = 100;
        this.difficulty = 1;
    }

    // Sine motion
    move() {
        this.sprite.body.velocity.y = this.speed;

        console.log(this.speedX);
        if(this.currentX < this.topX && this.currentSense == 1) {
            this.currentX ++;
            this.sprite.body.velocity.x = this.speedX;
            if(this.currentX <= this.topX * 0.5) {
                this.speedX ++;
            } else {
                console.log("substracting");
                this.speedX --;
            }
            this.sprite.body.velocity.x = this.speedX;
            if(this.speedX <= 0 && this.currentX >= this.topX) {
                this.currentSense = 0;
            }
        } else {
            this.currentX --;
            this.sprite.body.velocity.x = -this.speedX;
            if(this.currentX >= -this.topX * 0.5) {
                this.speedX ++;
            } else {
                console.log("substracting");
                this.speedX --;
            }
            if(this.speedX <= 0 && this.currentX <= -this.topX) {
                this.currentSense = 1;
            }
        }
    }
}