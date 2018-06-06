import Actor from './actor';
import { Sprite, Game } from 'phaser-ce';
import GameMaster from './gameMaster';
import gameMaster from '../index';
import Effect from './effect';

export default abstract class Enemy extends Actor {
    // Properties
    tintTimer: number;
    score: number;
    difficulty: number;

    // Methods
    constructor(game: Game, gameMaster: GameMaster, sprite: Sprite, health?: number, speed?: number, score?: number) {
        super(game, sprite, health, speed);
        this.gameMaster = gameMaster;
        this.score = score;
        this.destroyed = false;
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.immovable = true;
        this.sprite.animations.add('move', [0, 1], 10, true);
    }

    takeDamage(damage) {
        this.sprite.tint = Phaser.Color.RED;
        this.tintTimer = 2;
        this.health -= damage;
    }

    move() {
        this.sprite.body.velocity.y = this.speed;
    }

    destroy() {
        this.sprite.kill();
        gameMaster.score += this.score;
        this.destroyed = true;
        this.gameMaster.effects.push(new Effect(this.game, this.game.add.sprite(this.sprite.x, this.sprite.y, 'explosion_sm')));
    }

    update() {
        if(this.destroyed == false) {
            if(this.tintTimer <= 0) {
                this.sprite.tint = Phaser.Color.WHITE;
            }
            else {
                this.tintTimer--;
            }
            this.sprite.animations.play('move');
            if(this.health <= 0 || this.sprite.position.y <= -this.game.height) {
                this.destroy();
            }
            this.move();
        }
    }
}