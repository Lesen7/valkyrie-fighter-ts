import { Sprite, Game } from "phaser-ce";
import Actor from "./actor";
import { enemies } from '../index';

export default class Bullet extends Actor {
    // Methods
    constructor(game: Game, sprite: Sprite, health: number, speed: number) {
        super(game, sprite, health, speed);
        this.sprite.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;
        game.physics.arcade.enable(this.sprite);
    }


    destroy() {
        console.log(this.sprite);
        this.sprite.kill();
    }

    move() {
        this.sprite.body.velocity.y -= this.speed;
    }
    update () {
        enemies.forEach((enemy, index) => {
            this.game.physics.arcade.collide(this.sprite, enemy.sprite, () => { this.destroy() });
        });
        this.move();
    }
}