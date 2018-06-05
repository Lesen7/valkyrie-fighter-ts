import { Sprite, Game } from "phaser-ce";
import * as rand from "../utils/randUtils";
import Enemy from './enemy';
import Pod from "./pod";
import Actor from './actor';
import gameMaster from '../index';

export default class SpawnPoint extends Actor {
    // Properties
    sprite: Sprite;
    frequency: number;
    top: number;
    counter: number;

    // Methods
    constructor(game: Game, sprite: Sprite, frequency: number) {
        super(game, sprite);
        this.sprite = sprite;
        this.frequency = frequency;
        this.top = 100;
        this.counter = 0;
    }

    roll() {
        let result = Math.random();
        if(result < 0.6) {
            this.counter = 0;
            return;
        } else if(result > 0.6) {
            this.spawn();
        }
    }

    spawn() {
        this.counter = 0;
        gameMaster.enemies.push(new Pod(this.game, this.gameMaster, this.game.add.sprite(this.sprite.x, this.sprite.y, 'pod_move')));
    }

    update() {
        if (this.counter >= this.top) {
            this.roll();
        } else {
            this.counter += this.frequency;
        }
    }
}