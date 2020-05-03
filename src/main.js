let config = {                                                      //set configuration for phaser game
    type: Phaser.CANVAS,                                            //game window is 640 by 480
    width: 640, 
    height: 480,
    scene:[Menu,Instructions,Play,Score],                           //transition scenes from Menu>Instructions>Play>Score
    physics:{                                                       //include arcadePhysics for phaser game
        default: "arcade",
        arcade:{
            debug: false
        }
    }
};

let game = new Phaser.Game(config);                                 //instantiate Phaser game using previous config

let centerX = game.config.width/2;                                  //set variables for placement on screen
let centerY = game.config.height/2;
const barricadeWidth = 128;                                         //set variables for asset sizes
const barricadeHeight = 64;
const arrowWidth = 24;
const arrowHeight = 36;
const powerupWidth = 44;
const powerupHeight = 48;
let seconds = 0;                                                    //create global variables to be referenced
let powerupObtained = false;  
const textSpacer = 36;                                              //allow for a const space in between text
let keySPACE;                                                       //reserve variable for key input