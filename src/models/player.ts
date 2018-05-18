import Actor from './actor';
import { Sprite } from 'phaser-ce';

export default class Player extends Actor {
    // Properties
    sprite: Sprite;
    health;
    positionX;
    positionY;
    speed;

    // Methods
    attack() {
        
    }
}