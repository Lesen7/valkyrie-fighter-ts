import Enemy from './enemy';
import Pod from './pod';
import { Sprite, Game } from 'phaser-ce';
import gameMaster from '../index';
import Laser from './laser';

export default class SuperPod extends Pod {
    /**
     * The rate at which the enemy attack; once every amount of frames.
     */
    attackRate: number;
    /**
     * Counts down the attack rate.
     */
    attackTimer: number;
    shootOffsetX: number;
    shootOffsetY: number;
    /**
     * Enemy that acts as a pod, but has more health and can fire lasers.
     */
    constructor(game: Game, sprite: Sprite) {
        super(game, sprite);
        this.health = 5;

        this.speed = 70;
        this.XAmplitude = 64;

        this.attackRate = 120;
        this.attackTimer = this.attackRate;
        
        this.shootOffsetX = 26;
        this.shootOffsetY = 40;

        this.score = 250;
        this.difficulty = 2;
    }

    attack() {
        gameMaster.enemyBullets.push(new Laser(this.game, this.game.add.sprite(this.sprite.x + this.shootOffsetX, this.sprite.y + this.shootOffsetY, 'enemy_laser'), 1, this.speed * 1.5));        
        gameMaster.enemyBullets.push(new Laser(this.game, this.game.add.sprite(this.sprite.x + 2, this.sprite.y + this.shootOffsetY, 'enemy_laser'), 1, this.speed * 1.5));
    }

    update() {
        super.update();
        if(this.destroyed == false) {
            /**
             * Attacks once the timer reaches zero.
             */
            if(this.attackTimer > 0) {
                this.attackTimer --;
            } else {
                this.attack();
                this.attackTimer = this.attackRate;
            }
        }
    }
}