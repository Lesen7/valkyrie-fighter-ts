import { Sprite, Game } from 'phaser-ce';

// Defines the foundation for all interactable objects
export default abstract class Actor {
    // Properties
    game: Game;
    sprite: Sprite;
    health: number;
    speed: number;

    // Methods
    constructor(game: Game, sprite: Sprite, health?: number, speed?: number) {
        this.game = game;
        this.sprite = sprite;
        this.health = health;
        this.speed = speed;
    }

    move(x: number, y: number) {
        this.sprite.body.velocity.x += x;
        this.sprite.body.velocity.y += y;
    }

    attack() {}

    takeDamage(damage: number) {
        this.health -= damage;
        console.log(this.health);
    }

    destroy() {
        console.log('dead¿');
        this.sprite.kill();
    }

    update () {
        if (this.health <= 0) {
            this.destroy();
        }
    }
}