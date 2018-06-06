import { Sprite, Game } from 'phaser-ce';
import GameMaster from './gameMaster';
import gameMaster from '../index';

export default abstract class Actor {
    // Properties
    game: Game;
    gameMaster: GameMaster;
    sprite: Sprite;
    health: number;
    speed: number;
    destroyed: boolean;

    // Methods
    constructor(game: Game, sprite?: Sprite, health?: number, speed?: number) {
        this.game = game;
        this.sprite = sprite;
        this.health = health;
        this.speed = speed;
    }

    /**
    * The default movement function for game objects.
    * @param x defines how fast the object should move on the X axis.
    * @param y defines how fast the object should move on the y axis.
    */
    move(x: number, y: number) {
        this.sprite.body.velocity.x += x;
        this.sprite.body.velocity.y += y;
    }

    /**
    * The default function attack function for game objects.
    */
    attack() {}

    /**
    * Substracts the health of a game object.
    * @param damage Specifies the amount by which the health will be reduced.
    */
    takeDamage(damage: number) {
        this.health -= damage;
    }

    /**
    * Destroys a game object and makes it reclaimable.
    */
    destroy() {
        this.sprite.kill();
        this.destroyed = true;
    }

    /**
    * Updates the properties of the game object and essentially executes its lifetime.
    */
    update () {
        if (this.health <= 0) {
            this.destroy();
        }
    }
}