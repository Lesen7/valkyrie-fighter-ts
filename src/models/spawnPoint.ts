import { Sprite, Game } from "phaser-ce";
import { spawn } from 'child_process';
import Enemy from './enemy';
import Pod from "./pod";
import Actor from './actor';
import gameMaster from '../index';

export default class SpawnPoint extends Actor {
    // Properties
    sprite: Sprite;
    frequencyMod: number;
    top: number;
    currentFrequency: number;
    counter: number;

    // Methods
    constructor(game: Game, sprite: Sprite, frequencyMod: number) {
        super(game, sprite);
        this.sprite = sprite;
        this.frequencyMod = frequencyMod;
        this.currentFrequency = frequencyMod;
        this.top = 100;
        this.counter = 0;
    }

    
    randomize(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    spawn() {
        this.currentFrequency = this.randomize(1, this.top);
        this.counter = 0;
        gameMaster.enemies.push(new Pod(this.game, this.gameMaster, this.game.add.sprite(this.sprite.x, this.sprite.y, 'pod_move')));
    }

    update() {
        console.log(this.currentFrequency);
        if (this.counter >= this.top) {
            this.spawn();
        } else {
            this.counter += this.currentFrequency;
        }
    }
}