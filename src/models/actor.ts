import { Sprite } from "phaser-ce";

// Defines the foundation for all interactable objects
export default abstract class Actor {
    // Properties
    sprite: Sprite;
    positionX: number;
    positionY: number;
    health: number;
    speed: number;

    // Methods
    constructor(health, speed) {
        this.health = health;
        this.speed = speed;
    }
    
    move(x, y) {
        this.positionX += x;
        this.positionY += y;
    }
    attack() {

    }
}