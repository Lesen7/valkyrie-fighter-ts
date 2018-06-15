import { Sprite, Game } from 'phaser-ce';
import GameMaster from './gameMaster';
import gameMaster from '../index';
import Vector2D from '../utils/vector2D';

export default abstract class Actor {
    // Properties
    game: Game;
    sprite: Sprite;
    health: number;
    speed: number;
    /**
     * Returns true if the object has been destroyed, false otherwise.
     */
    destroyed: boolean;

    /**
    * A simple game object that will interact with the Game Master and other objects.
    * @param game The Phaser game the sprite will be added to.
    * @param sprite The sprite for the object.
    * @param health Defines how much health the object will have.
    * @param speed Defines how fast the object will move.
    */
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
    move(vector: Vector2D) {
        this.sprite.body.velocity.x += vector.x;
        this.sprite.body.velocity.y += vector.y;
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
    update() {
        if (this.health <= 0) {
            this.destroy();
        }
    }
    /**
     * Stops the game object. Useful for pausing the game or freezing an object.
     */
    stop() {
        if(this.sprite.body != null) {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        }
    }
}