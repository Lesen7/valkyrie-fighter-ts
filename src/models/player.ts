import Actor from './actor';
import { Sprite, Game } from 'phaser-ce';
import Bullet from './bullet';
import {enemies} from '../index';

export default class Player extends Actor {
    // Properties
    /// The lower the number, the higher the rate
    fireRate: number;
    shootOffsetX: number;
    shootOffsetY: number;
    /// Private variable to count down the firing rate
    private bulletTimer: number;
    bullets: Bullet[];

    // Methods
    constructor(game: Game, sprite: Sprite, health: number, speed: number, fireRate: number, shootOffsetX?: number, shootOffsetY?: number) {
        super(game, sprite, health, speed);
        this.fireRate = fireRate;
        this.shootOffsetX = shootOffsetX;
        this.shootOffsetY = shootOffsetY;
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.allowGravity = false;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.immovable = true;
        this.bullets = [];
    }
    
    update() {
        // Count down the fire rate counter
        if (this.bulletTimer >= 0) {
            this.bulletTimer--;
        }
        // Update the player's bullets
        if (this.bullets != null) {
            this.bullets.forEach((bullet, index) => {
                bullet.sprite.body.velocity.y = 0;
                bullet.update();
                if (bullet.sprite.y < 0) {
                    this.bullets.splice(index, 1);
                }
            });
        }
    }

    attack() {
        if (this.bulletTimer <= 0 || this.bulletTimer == undefined)
        {
            this.bulletTimer = this.fireRate;
            this.bullets.push(new Bullet(this.game, this.game.add.sprite(this.sprite.x + this.shootOffsetX, this.sprite.y + this.shootOffsetY, 'player_bullet'), 1, 800));
        }
    }
}