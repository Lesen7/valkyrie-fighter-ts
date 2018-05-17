import * as Phaser from 'phaser-ce';


window.onload = function() {

    // Configuration object
    var config = {
        width: 600,
        height: 800,
        renderer: Phaser.AUTO,
        antialias: false,
        multiTexture: true,
        state: {
            preload: preload,
            create: create,
            update: update
        }
    }
    // Game initialization
    var game = new Phaser.Game(config);

    function preload () {

    }

    function create () {

    }

    function update () {

    }

}; 