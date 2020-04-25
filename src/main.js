let config = {
    type: Phaser.CANVAS,
    width: 640, 
    height: 480,
    scene:[Menu,Play,Score],
    physics:{
        default: "arcade",
        arcade:{
            debug: false
        }
    }
};

let game = new Phaser.Game(config);

let centerX = game.config.width/2;
let centerY = game.config.height/2;
const barricadeWidth = 64;
const barricadeHeight = 32;
const arrowWidth = 12;
const arrowHeight = 18;