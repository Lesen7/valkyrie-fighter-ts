import { Key } from "phaser-ce";
import * as Phaser from 'phaser-ce';

export default class ControlLayout {
    /**
     * The key used to fire.
     */
    fire: Phaser.Key;
    /**
     * The key used to trigger a special ability.
     */
    special: Phaser.Key;
    /**
     * The key used to move up.
     */
    up: Phaser.Key;
    /**
     * The key used to move to the left.
     */
    left: Phaser.Key;
    /**
     * The key used to move down.
     */
    down: Phaser.Key;
    /**
     * The key used to move to the right.
     */
    right: Phaser.Key;
    /**
     * The key used to pause the game.
     */
    pause: Phaser.Key;

    /**
     * An object that contains data about player input.
     * A configuration object can be passed for improved readability and reusability.
     */
    constructor(configObject) {
        this.fire = configObject.fire;
        this.special = configObject.special;
        this.up = configObject.up;
        this.left = configObject.left;
        this.down = configObject.down;
        this.right = configObject.right;
        this.pause = configObject.pause;
    }
}