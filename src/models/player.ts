import Actor from './actor';
import { Sprite } from 'phaser-ce';
import Bullet from './bullet';

export default class Player extends Actor {
    // Properties
    fireRate: number;
    private bulletTimer: number;
    bullets: Bullet[];

    // Methods
    attack() {
        if (this.bulletTimer <= 0 || this.bulletTimer == undefined)
        {
            this.bulletTimer = this.fireRate;
            this.bullets.push(new Bullet(this.game, this.game.add.sprite(this.sprite.x, this.sprite.y, 'player_bullet'), 1, this.speed * 2));
        } else {
            this.bulletTimer--;
            console.log(this.bulletTimer);
        }
    }
}