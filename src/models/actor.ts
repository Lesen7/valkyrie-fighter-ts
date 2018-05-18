import { Sprite } from "phaser-ce";

export default interface Actor {
    sprite: Sprite;
    xPosition: number;
    yPosition: number;
    health: number;
    speed: number;
}