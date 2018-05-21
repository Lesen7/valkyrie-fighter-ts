import { Sprite } from 'phaser-ce';

// Defines the foundation for all interactable objects
export default abstract class Actor {
    // Properties
    sprite: Sprite;
    positionX: number;
    positionY: number;
    health: number;
    speed: number;

    // Methods
    constructor(health: number, speed: number, sprite: Sprite) {
        this.sprite = sprite;
        this.positionX = this.sprite.x;
        this.positionY = this.sprite.y;
        this.health = health;
        this.speed = speed;
    }

    move(x: number, y: number) {
        this.sprite.x += x;
        this.sprite.y += y;
    }

    attack() {

    }
}