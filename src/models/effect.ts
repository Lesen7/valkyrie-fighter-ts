import Actor from "./actor";
import { Game, Sprite } from "phaser-ce";

export default class Effect extends Actor {
    // Methods
    constructor(game: Game, sprite: Sprite) {
        super(game, sprite);
        this.sprite.animations.add('explode', [0, 2], 9, false);
    }

    update() {
        this.sprite.animations.play('explode', null, null, true);
    }
}