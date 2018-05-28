import Actor from './actor';
import { Sprite, Game } from 'phaser-ce';

export default class Enemy extends Actor {
    // Properties
    tintTimer: number;

    // Methods
    constructor(game: Game, sprite: Sprite, health: number, speed: number) {
        super(game, sprite, health, speed);

        game.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.immovable = true;
        this.sprite.animations.add('move', [0, 1], 10, true);
    }

    takeDamage(damage) {
        this.sprite.tint = Phaser.Color.RED;
        this.tintTimer = 2;
       // this.health -= damage;
    }

    update() {
        if(this.tintTimer <= 0) {
            this.sprite.tint = Phaser.Color.WHITE;
        }
        else {
            this.tintTimer--;
        }
        this.sprite.animations.play('move');
        if (this.health <= 0) {
            this.destroy();
        }
    }
}