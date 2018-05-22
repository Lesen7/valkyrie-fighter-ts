import { Sprite, Game } from "phaser-ce";
import Actor from "./actor";

export default class Bullet extends Actor {
    // Properties

    // Methods
    move() {
        this.sprite.y -= this.speed;
    }
}