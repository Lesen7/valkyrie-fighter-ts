import Bullet from './bullet';
import { Game, Sprite } from 'phaser-ce';
import gameMaster from '../index';
import Vector2D from '../utils/vector2D';

export default class BulletPellet extends Bullet {
    vector: Vector2D;

    /**
     * A bullet that aims to hit the player when created.
     * @param game The Phaser game the sprite will be added to.
     * @param sprite The sprite for the bullet.
     * @param health Essentially defines how many enemies the bullet can hit before being destroyed.
     * @param speed Defines how fast the bullet will move.
     * @param damage Defines how much damage the bullet will deal on impact.
     */
    constructor(game: Game, sprite: Sprite, health?: number, speed?: number, damage?: number) {
        super(game, sprite, health, speed, damage);
        this.health = 1;
        if(this.speed == undefined || this.speed == null) {
            this.speed = 150;
        }
        if(this.damage == undefined || this.damage == null) {
            this.damage = 1;
        }

        this.sprite.animations.add('move', [0, 1], 10, true);
        this.vector = this.aimAtPlayer();
    }

    /**
     * Gets the unit vector that aims towards the player from the bullet's current position.
     */
    aimAtPlayer(): Vector2D {
        let aimVector = new Vector2D(gameMaster.player.sprite.centerX - this.sprite.x, gameMaster.player.sprite.centerY - this.sprite.y);
        let unitVector = aimVector.normalize();
        return unitVector;
    }
    
    /**
     * A simpler function to aim at player that causes the projectile to move in zig-zag. Mostly for aesthetic purposes, otherwise use aimAtPlayer.
     * @param axis The axis that should be aimed that.
     */
    homeAtPlayer(axis: string) {
        let direction: number;
        if(axis.toLowerCase() == 'x') {
            if(this.sprite.x < gameMaster.player.sprite.x) {
                direction = 1;
            } else if(this.sprite.x > gameMaster.player.sprite.x) {
                direction = -1;
            } else {
                direction = 0;
            }
        }
        if(axis.toLowerCase() == 'y') {
            if(this.sprite.y < gameMaster.player.sprite.y) {
                direction = 1;
            } else if(this.sprite.y > gameMaster.player.sprite.y) {
                direction = -1;
            } else {
                direction = 0;
            }
        }
        return direction;
    }

    /**
     * Cancels out the acceleration from the physics engine and moves the bullet accordingly, checking for collision with the player.
     * A blinking animation is played permanently to make the player more easily aware of the projectile.
     */
    update() {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

        this.move(this.vector);
        
        this.game.physics.arcade.overlap(this.sprite, gameMaster.player.sprite, () => {gameMaster.player.takeDamage(1); this.destroy();});
        this.sprite.animations.play('move');
    }
}