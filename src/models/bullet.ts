import { Sprite, Game } from "phaser-ce";
import Actor from "./actor";
import { enemies } from '../index';
import * as Phaser from 'phaser-ce';

export default class Bullet extends Actor {
    // Properties
    damage: number;

    // Methods
    constructor(game: Game, sprite: Sprite, health: number, speed: number, damage: number) {
        super(game, sprite, health, speed);
        this.damage = damage;
        this.sprite.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;
        game.physics.arcade.enable(this.sprite);
    }

    dealDamage(object) {
        object.takeDamage(this.damage);
    }

    move() {
        this.sprite.body.velocity.y -= this.speed;
    }
    update () {
        enemies.forEach((enemy, index) => {
            this.game.physics.arcade.collide(this.sprite, enemy.sprite, () => { this.destroy(), this.dealDamage(enemy); });
        });
        this.move();
    }
}