import Actor from './actor';
import { Sprite } from 'phaser-ce';

export default class Player extends Actor {
    // Properties
    sprite: Sprite;
    health;
    positionX = this.sprite.x;
    positionY = this.sprite.y;
    speed;

    // Methods
    attack() {
        
    }
}