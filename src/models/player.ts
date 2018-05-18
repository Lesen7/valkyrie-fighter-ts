import Actor from './actor';

export default class Player implements Actor {
    sprite;
    health;
    speed;
    xPosition;
    yPosition;
    constructor(health, speed) {
        this.health = health;
        this.speed = speed;
    }
}