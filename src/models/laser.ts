import { Game, Sprite } from "phaser-ce";
import Bullet from './bullet';
import gameMaster from '../index';

export default class Laser extends Bullet {

    constructor(game: Game, sprite: Sprite, health: number = 1, speed: number = 150, damage: number = 1) {
        super(game, sprite, health, speed, damage);
    }

    move() {
        this.sprite.body.velocity.y += this.speed;
    }

    update() {
        super.update();
        this.move();
        this.game.physics.arcade.overlap(this.sprite, gameMaster.player.sprite, () => {gameMaster.player.takeDamage(this.damage); this.destroy();});
    }
}