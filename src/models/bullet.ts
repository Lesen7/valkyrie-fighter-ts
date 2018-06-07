import { Sprite, Game } from "phaser-ce";
import * as Phaser from 'phaser-ce';
import Actor from "./actor";
import GameMaster from './gameMaster';
import gameMaster from '../index';

export default class Bullet extends Actor {
    // Properties
    /**
     * Defines how much damage the bullet will deal on impact.
     */
    damage: number;

    /**
    * A projectile object meant to hit and damage other game object.
    * @param game The Phaser game the sprite will be added to.
    * @param sprite The sprite for the bullet.
    * @param health Essentially defines how many enemies the bullet can hit before being destroyed.
    * @param speed Defines how fast the bullet will move.
    * @param damage Defines how much damage the bullet will deal on impact.
    */
    constructor(game: Game, sprite: Sprite, health: number, speed: number, damage: number) {
        super(game, sprite, health, speed);
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