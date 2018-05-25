import Actor from './actor';
import { Sprite, Game } from 'phaser-ce';

export default class Enemy extends Actor {
    // Methods
    constructor(game: Game, sprite: Sprite, health: number, speed: number) {
        super(game, sprite, health, speed);
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.immovable = true;
    }
}