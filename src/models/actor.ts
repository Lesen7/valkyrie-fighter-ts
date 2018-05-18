import { Sprite } from "phaser-ce";

// Defines the foundation for all interactable objects
export default abstract class Actor {
    // Properties
    public sprite: Sprite;
    public positionX: number;
    public positionY: number;
    public health: number;
    public speed: number;

    // Methods
    public constructor(health: number, speed: number, sprite: Sprite) {
        this.sprite = sprite;
        this.positionX = this.sprite.x;
        this.positionY = this.sprite.y;
        this.health = health;
        this.speed = speed;
    }

    public move(x: number, y: number) {
        this.positionX += x;
        this.positionY += y;
    }
    public attack() {

    }
}