import Actor from './actor';
import { Sprite } from 'phaser-ce';
import Bullet from './bullet';

export default class Player extends Actor {
    // Properties
    fireRate: number;
    bullet: Bullet;

    // Methods
    attack() {
        let bulletTimer = this.fireRate;
        if (bulletTimer <= 0)
        {
            
        }
    }
}