import { Sprite } from "phaser-ce";

export default interface Actor {
    sprite: Sprite;
    health: number;
    speed: number;
}