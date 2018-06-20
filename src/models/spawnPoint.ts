import { Sprite, Game } from "phaser-ce";
import * as rand from "../utils/randUtils";
import Enemy from './enemy';
import Pod from "./pod";
import Actor from './actor';
import gameMaster from '../index';
import GameMaster from "./gameMaster";
import Fighter from "./fighter";
import SuperPod from './superPod';
import BoostedPod from './boostedPod';

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
     * @param sprite The sprite for the object.
     * @param frequency The frequency at which enemies will spawn.
     */
    constructor(game: Game, sprite: Sprite, frequency: number) {
        super(game, sprite);
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
        let spawnedEnemy = gameMaster.currentPhase.availableEnemies[Math.floor(Math.random() * gameMaster.currentPhase.availableEnemies.length)];
        switch (spawnedEnemy) {
            case 'pod':
                this.spawn(new Pod(this.game, this.game.add.sprite(this.sprite.x, this.sprite.y, 'pod_move')));
                break;
            case 'fighter':
                this.spawn(new Fighter(this.game, this.game.add.sprite(this.sprite.x, this.sprite.y, 'fighter_move')));
                break;
            case 'superPod':
                this.spawn(new SuperPod(this.game, this.game.add.sprite(this.sprite.x, this.sprite.y, 'glaug_move')));
                break;
            case 'boostedPod':
            this.spawn(new BoostedPod(this.game, this.game.add.sprite(this.sprite.x, this.sprite.y, 'boosted_glaug')));
                break;
            case 'ger':
                break;
            case 'rau':
                break;
            default:
                break;
        }
    }

    /**
     * Spawns an enemy and resets the spawn counter.
     */
    spawn(enemy: Enemy) {
        this.counter = 0;
        gameMaster.enemies.push(enemy);
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