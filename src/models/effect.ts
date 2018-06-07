import Actor from "./actor";
import { Game, Sprite } from "phaser-ce";

export default class Effect extends Actor {
    /**
    * An visual effect object.
    * @param game The Phaser game the sprite will be added to.
    * @param sprite The sprite for the object.
    */
    constructor(game: Game, sprite: Sprite) {
        super(game, sprite);
        this.sprite.animations.add('explode', [0, 2], 9, false);
    }

    /**
     * Plays the effect's animation and destroys the sprite first.
     * After the sprite no longer exists, the object itself is destroyed too.
     */
    update() {
        this.sprite.animations.play('explode', null, null, true);
        if(!this.sprite.exists) {
            this.destroy();
        }
    }
    /**
     * When an effect is stopped, its animations will also stop.
     */
    stop() {
        super.stop();
        this.sprite.animations.stop();
    }
}