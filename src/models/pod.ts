import Enemy from "./enemy";
import GameMaster from "./gameMaster";
import { Game, Sprite } from 'phaser-ce';

export default class Pod extends Enemy {
    /**
     * Defines the width of the enemy's horizontal motion.
     */
    XAmplitude: number;
    /**
     * The current horizontal position of the enemy relative to the total amplitude.
     */
    XCurrent: number;
    /**
     * The horizontal acceleration of the enemy.
     */
    XAccel: number;
    /**
     * The current sense of the enemy's motion. 1 means right, 0 means left.
     */
    currentSense: number;

    /**
     * A simple enemy with a sine style motion.
     * @param game The Phaser game the sprite will be added to.
     * @param gameMaster The Game Master the object will be added to.
     * @param sprite The sprite for the object.
     */
    constructor(game: Game, gameMaster: GameMaster, sprite: Sprite) {
        super(game, gameMaster, sprite);
        this.health = 2;  
        this.speed = 50;
        this.XAmplitude = 80;
        this.XCurrent = 0;
        this.XAccel = 0;
        this.currentSense = Math.round(Math.random());
        this.score = 100;
        this.difficulty = 1;
    }

    /**
     * Moves the enemy in a sine style.
     */
    move() {
        this.sprite.body.velocity.y = this.speed;
        this.sprite.body.velocity.x = this.XAccel;

        switch (this.currentSense) {
            case 1:
                if(this.XCurrent <= this.XAmplitude) {
                    this.XCurrent ++;
                    if(this.XAccel <= this.speed) {
                        this.XAccel ++;
                    } else {
                        this.XAccel = this.speed;
                    }
                } else {
                    this.currentSense = 0;
                }
                break;
            case 0:
                if(this.XCurrent >= -this.XAmplitude) {
                    this.XCurrent --;
                    if(this.XAccel >= -this.speed) {
                        this.XAccel --;
                    } else {
                        this.XAccel = -this.speed;
                    }
                } else {
                    this.currentSense = 1;
                }
                break;
        }
    }
}