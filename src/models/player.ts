import Actor from './actor';

export default class Player implements Actor {
    sprite;
    health;
    speed;
    constructor(health, speed) {
        this.health = health;
        this.speed = speed;
    }
}