import { Sprite } from "phaser-ce";

export default class SpawnPoint {
    // Properties
    sprite: Sprite;
    frequency: number;

    // Methods
    constructor(sprite: Sprite, frequency: number) {
        this.sprite = sprite;
    }
}