import { Key } from "phaser-ce";

// This class is meant to more easily refer to keyboard input
export default class ControlLayout {
    // Properties
    fire: Phaser.Key;
    special: Phaser.Key;
    up: Phaser.Key;
    left: Phaser.Key;
    down: Phaser.Key;
    right: Phaser.Key;

    // A configuration object can be passed for improved readability 
    constructor(configObject) {
        this.fire = configObject.fire;
        this.special = configObject.special;
        this.up = configObject.up;
        this.left = configObject.left;
        this.down = configObject.down;
        this.right = configObject.right;
    }
}