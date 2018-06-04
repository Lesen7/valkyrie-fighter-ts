import { Sprite, Game } from "phaser-ce";
import { spawn } from 'child_process';
import Enemy from './enemy';
import Pod from "./pod";
import Actor from './actor';
import gameMaster from '../index';

export default class SpawnPoint extends Actor {
    // Properties
    sprite: Sprite;
    maxFrequency: number;
    currentFrequency: number;
    counter: number;
    

    // Methods
    constructor(game: Game, sprite: Sprite, maxFrequency: number) {
        super(game, sprite);
        this.sprite = sprite;
        this.currentFrequency = maxFrequency;
        this.maxFrequency = maxFrequency;
        this.counter = this.maxFrequency;
    }

    
    randomize(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    spawn () {
        this.currentFrequency = this.randomize(100, this.maxFrequency);
        this.counter = this.currentFrequency;
        gameMaster.enemies.push(new Pod(this.game, this.gameMaster, this.game.add.sprite(this.sprite.x, this.sprite.y, 'pod_move')));
    }

    update () {
        if (this.counter <= 0) {
            this.spawn();
        } else {
            this.counter--;
        }
    }
}