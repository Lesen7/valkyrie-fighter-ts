import Actor from './actor';
import { Sprite, Game } from 'phaser-ce';
import Bullet from './bullet';
import ControlLayout from './input';
import gamePhase from './gamePhase';
import GameMaster from './gameMaster';
import gameMaster from '../index';

export default class Player extends Actor {
    /**
     * The control layout for the player.
     */
    keys: ControlLayout;
    /**
     * The rate at which the player fires.
     */
    fireRate: number;
    /**
     * The horizontal offset at which the bullets will be created.
     */
    shootOffsetX: number;
    /**
     * The vertical offset at which the bullets will be created.
     */
    shootOffsetY: number;
    /**
     * The variable that counts down the firing rate.
     */
    private bulletTimer: number;
    /**
     * A pool of all existing player bullets.
     */
    bullets: Bullet[];
    healthBars: Sprite[];

    /**
     * A player object that can be controlled through user input.
     * The physics properties of the player will be initialized upon creation.
     * Additionally, player animations will be created.
     * @param game The Phaser game the sprite will be added to.
     * @param controls The control layout for the player.
     * @param sprite The sprite for the player.
     * @param health Defines how much health the player will have.
     * @param speed Defines how fast the player will move.
     * @param fireRate The horizontal offset at which the bullets will be created.
     * @param shootOffsetX The vertical offset at which the bullets will be created.
     * @param shootOffsetY The variable that counts down the firing rate.
     */
    constructor(game: Game, controls: ControlLayout, sprite: Sprite, health: number, speed: number, fireRate: number, shootOffsetX?: number, shootOffsetY?: number) {
        super(game, sprite, health, speed);
        this.healthBars = [];
        this.destroyed = false;
        this.keys = controls;
        this.fireRate = fireRate;
        this.shootOffsetX = shootOffsetX;
        this.shootOffsetY = shootOffsetY;
        this.bullets = [];
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.allowGravity = false;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.immovable = false;
        
        // Player animations
        this.sprite.animations.add('turn_l', [0, 1], 10, true);
        this.sprite.animations.add('thrusters', [2, 3], 10, true);
        this.sprite.animations.add('turn_r', [4, 5], 10, true);
    }

    takeDamage(damage: number) {
        this.health -= damage;
        this.healthBars[0].kill();
        this.healthBars.shift();
    }

    /**
     * Fires a bullet at the corresponding firing rate.
     */
    attack() {
        if (this.bulletTimer <= 0 || this.bulletTimer == undefined)
        {
            this.bulletTimer = this.fireRate;
            this.bullets.push(new Bullet(this.game, this.game.add.sprite(this.sprite.x + this.shootOffsetX, this.sprite.y + this.shootOffsetY, 'player_bullet'), 1, 1400, 1));
        }
    }
    
    /**
     * Checks for user input to make the player act accordingly.
     * Additionally, handles the timer for the firing rate and cancels the acceleration of the player and its bullets.
     * The bullets are destroyed when they leave the screen.
     */
    update() {
        if(this.destroyed == false) {
            super.update();

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
                        bullet.destroy();
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
}