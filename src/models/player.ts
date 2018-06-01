import Actor from './actor';
import { Sprite, Game } from 'phaser-ce';
import Bullet from './bullet';
import ControlLayout from './input';
import gamePhase from './gamePhase';
import GameMaster from './gameMaster';
import gameMaster from '../index';

export default class Player extends Actor {
    /// Properties
    // The lower the number, the higher the rate
    keys: ControlLayout;
    fireRate: number;
    shootOffsetX: number;
    shootOffsetY: number;
    // Private variable to count down the firing rate
    private bulletTimer: number;
    bullets: Bullet[];

    // Methods
    constructor(game: Game, controls: ControlLayout, sprite: Sprite, health: number, speed: number, fireRate: number, shootOffsetX?: number, shootOffsetY?: number) {
        super(game, sprite, health, speed);
        this.keys = controls;
        this.fireRate = fireRate;
        this.shootOffsetX = shootOffsetX;
        this.shootOffsetY = shootOffsetY;
        this.bullets = [];

        game.physics.arcade.enable(this.sprite);
        this.sprite.body.allowGravity = false;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.immovable = true;
        
        // Player animations
        this.sprite.animations.add('turn_l', [0, 1], 10, true);
        this.sprite.animations.add('thrusters', [2, 3], 10, true);
        this.sprite.animations.add('turn_r', [4, 5], 10, true);
    }

    attack() {
        if (this.bulletTimer <= 0 || this.bulletTimer == undefined)
        {
            this.bulletTimer = this.fireRate;
            this.bullets.push(new Bullet(this.game, this.game.add.sprite(this.sprite.x + this.shootOffsetX, this.sprite.y + this.shootOffsetY, 'player_bullet'), 1, 800, 1));
        }
    }
    
    update() {
        if (this.health <= 0) {
            this.destroy();
        }
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
        // Cancel acceleration. If anyone knows how to disable acceleration in Phaser CE, please let me know. I feel unclean doing this
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        // Player input
        if (this.keys.left.isDown) {
            this.move(-this.speed, 0);
            this.sprite.animations.play('turn_l');
        } else if (this.keys.right.isDown) {
            this.move(this.speed, 0);
            this.sprite.animations.play('turn_r');
        } else {
            this.sprite.animations.play('thrusters');
            this.sprite.body.velocity.x = 0;
        }
        if (this.keys.up.isDown) {
            this.move(0, -this.speed);
        } else if (this.keys.down.isDown) {
            this.move(0, this.speed);
        } else {
            this.sprite.body.velocity.y = 0;
        }
        if (this.keys.fire.isDown) {
            this.attack();
        }
    }
}