import Bullet from './bullet';
import { Game, Sprite } from 'phaser-ce';
import gameMaster from '../index';
import Vector2D from '../utils/vector2D';

export default class BulletPellet extends Bullet {
    vector: Vector2D;

    constructor(game: Game, sprite: Sprite, health: number, speed: number, damage: number) {
        super(game, sprite, health, speed, damage);
        this.sprite.animations.add('move', [0, 1], 10, true);
        this.vector = this.aimAtPlayer();
    }

    aimAtPlayer() {
        let aimVector = new Vector2D(gameMaster.player.sprite.x - this.sprite.x, gameMaster.player.sprite.y - this.sprite.y);
        let uVector = aimVector.normalize();
        return uVector;
    }
    
    homeAtPlayer(axis: string) {
        let direction: number;
        if(axis.toLowerCase() == 'x') {
            if(this.sprite.x < gameMaster.player.sprite.x) {
                direction = 1;
            } else if(this.sprite.x > gameMaster.player.sprite.x) {
                direction = -1;
            } else {
                direction = 0;
            }
        }
        if(axis.toLowerCase() == 'y') {
            if(this.sprite.y < gameMaster.player.sprite.y) {
                direction = 1;
            } else if(this.sprite.y > gameMaster.player.sprite.y) {
                direction = -1;
            } else {
                direction = 0;
            }
        }
        return direction;
    }

    update() {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        this.move(this.vector);
        this.game.physics.arcade.overlap(this.sprite, gameMaster.player.sprite, () => {gameMaster.player.takeDamage(1); this.destroy();});
        this.sprite.animations.play('move');
    }
}