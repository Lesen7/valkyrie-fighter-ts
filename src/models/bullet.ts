import { Sprite, Game } from "phaser-ce";
import Actor from "./actor";

export default class Bullet extends Actor {
    // Methods
    move() {
        this.sprite.y -= this.speed;
    }
    destroy() {
        this.sprite.kill();
    }
}