import Actor from './actor';
import { Sprite, Game } from 'phaser-ce';
import Bullet from './bullet';

export default class Player extends Actor {
    // Properties
    /// The lower the number, the higher the rate
    fireRate: number;
    shootOffsetX: number;
    /// Private variable to count down the firing rate
    private bulletTimer: number;
    bullets: Bullet[];

    // Methods
    constructor(game: Game, sprite: Sprite, health: number, speed: number, fireRate: number, shootOffsetX?: number, shootOffsetY?: number) {
        super(game, sprite, health, speed);
        this.fireRate = fireRate;
        this.shootOffsetX = shootOffsetX;
    }
    

    attack() {
        if (this.bulletTimer <= 0 || this.bulletTimer == undefined)
        {
            this.bulletTimer = this.fireRate;
            this.bullets.push(new Bullet(this.game, this.game.add.sprite(this.sprite.x + this.shootOffsetX, this.sprite.y, 'player_bullet'), 1, 600));
        } else {
            this.bulletTimer--;
        }
    }
}