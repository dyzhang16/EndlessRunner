let config = {
    type: Phaser.CANVAS,
    width: 640, 
    height: 480,
    scene:[Menu,Play,Score],
};

let game = new Phaser.Game(config);


game.input.mouse.capture = true;
