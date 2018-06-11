import Actor from './actor';
import { Sprite, Game, Color } from 'phaser-ce';
import GameMaster from './gameMaster';
import gameMaster from '../index';
import Effect from './effect';

export default abstract class Enemy extends Actor {
    /**
     * Defines for how long the sprite will change its tint when taking damage.
     */
    blinkTimer: number;
    /**
     * The tint the sprite will change to when taking damage.
     */
    blinkColor: number;
    /**
     * The amount of points the enemy gives upon destruction.
     */
    score: number;
    /**
     * Approximation of the enemy's difficulty.
     * Determines which phases the enemy can spawn in.
     */
    difficulty: number;
    /**
     * The key of the sprite for the visual effect played upon destruction.
     */
    destroyedEffect: string;

    /**
     * 
     * @param game The Phaser game the sprite will be added to.
     * @param gameMaster The Game Master the object will be added to.
     * @param sprite The sprite for the enemy.
     * @param health Defines how much health the enemy will have.
     * @param speed Defines how fast the enemy will move.
     * @param score The amount of points the enemy gives upon destruction.
     */
    constructor(game: Game, gameMaster: GameMaster, sprite: Sprite, health?: number, speed?: number, score?: number) {
        super(game, sprite, health, speed);
        this.gameMaster = gameMaster;
        this.score = score;
        this.destroyed = false;
        this.destroyedEffect = 'explosion_sm';
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.immovable = true;
        this.sprite.animations.add('move', [0, 1], 10, true);
        this.blinkColor = Phaser.Color.RED;
    }

    /**
     * Substracts the enemy's health by the damage taken and makes it blink in the specified color.
     * @param damage Defines how much damage the enemy will take.
     */
    takeDamage(damage) {
        this.sprite.tint = this.blinkColor;
        this.blinkTimer = 2;
        this.health -= damage;
    }

    /**
     * By default, an enemy always moves downwards along the game world.
     */
    move() {
        this.sprite.body.velocity.y = this.speed;
    }

    /**
     * Destroys the enemy and adds score to the current game.
     * It also creates a visual effect upon destruction.
     */
    destroy() {
        this.sprite.kill();
        gameMaster.score += this.score;
        this.destroyed = true;
        this.gameMaster.effects.push(new Effect(this.game, this.game.add.sprite(this.sprite.x, this.sprite.y, this.destroyedEffect)));
    }

    /**
     * Sets the sprite's tint to default while the enemy is not taking damage.
     * Moves the enemy, plays animations accordingly and makes sure the enemy is destroyed once it leaves the screen.
     */
    update() {
        if(this.destroyed == false) {
            if(this.blinkTimer <= 0) {
                this.sprite.tint = Phaser.Color.WHITE;
            }
            else {
                this.blinkTimer--;
            }
            this.sprite.animations.play('move');
            if(this.health <= 0 || this.sprite.position.y <= -this.game.height) {
                this.destroy();
            }
            this.move();
        }
        this.game.physics.arcade.overlap(this.sprite, this.gameMaster.player.sprite, () => {this.gameMaster.player.takeDamage(1);});
    }
}