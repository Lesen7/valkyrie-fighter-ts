import { Sprite } from "phaser-ce";
import Actor from "./actor";

export default class Bullet extends Actor {
    // Properties
    flightSpeed: number;

    // Methods
    constructor(health, sprite, flightSpeed) {
        super(health, flightSpeed, sprite);
        this.health = health;
        this.sprite = sprite;
        this.flightSpeed = flightSpeed;
    }

    move() {
        this.positionY--;
    }
}