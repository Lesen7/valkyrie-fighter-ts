import Bullet from "./bullet";
import gameMaster from '../index';
import { Game, Sprite } from 'phaser-ce';

export default class PlayerBullet extends Bullet {
    constructor(game: Game, sprite: Sprite, health: number, speed: number, damage: number) {
        super(game, sprite, health, speed, damage);
        this.damage = damage;
        this.sprite.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;
        game.physics.arcade.enable(this.sprite);
    }

    /**
    * Substracts the health of another object by the damage number of this object.
    * @param object The object whose health will be reduced.
    */
    dealDamage(object) {
        object.takeDamage(this.damage);
    }

    /**
    * Moves the bullet upwards across the game world.
    */
    move() {
        this.sprite.body.velocity.y -= this.speed;
    }

    /**
    * Moves and checks for collision with existing enemies.
    * Takes damage and deals damage to enemies it collides with.
    */
    update () {
        super.update();
        gameMaster.enemies.forEach((enemy, index) => {
            this.game.physics.arcade.collide(this.sprite, enemy.sprite, () => { this.takeDamage(1), this.dealDamage(enemy); });
        });
        this.move();
    }
}