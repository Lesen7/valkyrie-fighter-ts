import Enemy from './enemy';
import { Game, Sprite } from 'phaser-ce';
import GameMaster from './gameMaster';
import BulletPellet from './BulletPellet';
import gameMaster from '../index';

/**
 * An enemy that travels down at a high speed and shoots at a slow rate.
 */
export default class Fighter extends Enemy {
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

    constructor(game: Game, sprite: Sprite) {
        super(game, sprite);
        this.health = 2;  
        this.speed = 120;

        this.attackRate = 120;
        this.attackTimer = 0;

        this.score = 150;
        this.difficulty = 1;

        this.shootOffsetX = 10;
        this.shootOffsetY = 40;
    }

    attack() {
        gameMaster.enemyBullets.push(new BulletPellet(this.game, this.game.add.sprite(this.sprite.x + this.shootOffsetX, this.sprite.y + this.shootOffsetY, 'enemy_pellet'), 1, this.speed * 1.5));
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