/*                                          Legion Escape by SDC Collective 
                                    Collaborators: Shui Lau, Daniel Zhang, Carl Erez
                                              Date Completed May 3rd, 2020
        For our creative tilt, we implemented an option for players to deflect certain obstacles by using shield. However using the shields
    will slow the player down if they use the shield option too many times. We also have multiple obstacles and different ways to deal 
    with those obstacles. The barrier must be walked around, but the arrows can be deflected and the army can be slowed down with the 
    caltrops. We felt that utilizing the position of the pointer for mouse movement by calculating its position using trigonometry was
    an interesting implementation. Carl, our artist was proud of the aesthetic that we chose for our game. Originally we were already 
    impressed with the initial sprites, but after seeing the rework for the new sprites, we all agreed that the new sprites highlighted 
    our game even further.*/
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