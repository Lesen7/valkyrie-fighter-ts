import Bullet from './bullet';
import { Game, Sprite } from 'phaser-ce';
import gameMaster from '../index';

export default class BulletPellet extends Bullet {
    xDirection: number;
    yDirection: number;

    constructor(game: Game, sprite: Sprite, health: number, speed: number, damage: number) {
        super(game, sprite, health, speed, damage);
        this.xDirection = this.speed * this.aimAtPlayer('x');
        this.yDirection = this.speed * this.aimAtPlayer('y');
        this.sprite.animations.add('move', [0, 1], 10, true);

    }

    aimAtPlayer(axis: string) {
        let direction;
        if(axis.toLowerCase() == 'x') {
            if(this.sprite.x - gameMaster.player.sprite.x > 0) {
                direction = 1 / this.sprite.x - gameMaster.player.sprite.x;
            } else {
                direction = 1 / this.sprite.x + gameMaster.player.sprite.x;
            }
        }
        if(axis.toLowerCase() == 'y') {
            if(this.sprite.y - gameMaster.player.sprite.y > 0) {
                direction = 1 / this.sprite.y - gameMaster.player.sprite.y;
            } else {
                direction = 1 / this.sprite.y + gameMaster.player.sprite.y;
            }
        }
        return direction;
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
        this.move(this.xDirection, this.yDirection);
        this.game.physics.arcade.overlap(this.sprite, gameMaster.player.sprite, () => {gameMaster.player.takeDamage(1); this.destroy();});
        this.sprite.animations.play('move');
    }
}