import { Sprite, Game } from "phaser-ce";
import * as rand from "../utils/randUtils";
import Enemy from './enemy';
import Pod from "./pod";
import Actor from './actor';
import gameMaster from '../index';
import GameMaster from "./gameMaster";

export default class SpawnPoint extends Actor {
    sprite: Sprite;
    /**
     * The frequency at which enemies will spawn.
     */
    frequency: number;
    /**
     * The maximum amount the counter must reach.
     */
    private top: number;
    /**
     * The value that will count up the frequency.
     */
    private counter: number;

    /**
     * An object that spawns enemies at a certain rate. Usually located out of bounds.
     * @param game The Phaser game the sprite will be added to.
     * @param gameMaster The Game Master the object will be added to.
     * @param sprite The sprite for the object.
     * @param frequency The frequency at which enemies will spawn.
     */
    constructor(game: Game, gameMaster, sprite: Sprite, frequency: number) {
        super(game, sprite);
        this.gameMaster = gameMaster;
        this.sprite = sprite;
        this.frequency = frequency;
        this.top = 100;
        this.counter = 0;
    }

    /**
     * Rolls a number between 0 and 0.9.
     * If the result is less than 0.6, resets the spawn counter.
     * If it's greater or equal, spanws an enemy.
     */
    roll() {
        let result = Math.random();
        if(result < 0.6) {
            this.counter = 0;
            return;
        } else if(result >= 0.6) {
            this.spawn();
        }
    }

    /**
     * Spawns an enemy and resets the spawn counter.
     */
    spawn() {
        this.counter = 0;
        gameMaster.enemies.push(new Pod(this.game, this.gameMaster, this.game.add.sprite(this.sprite.x, this.sprite.y, 'pod_move')));
    }

    /**
     * Counts the counter up by the spawn frequency and rolls to see whether it should spawn or not when the counter reaches the top.
     */
    update() {
        if (this.counter >= this.top) {
            this.roll();
        } else {
            this.counter += this.frequency;
        }
    }
}