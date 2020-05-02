class Menu extends Phaser.Scene{
    constructor(){
            super('menuScene');
    }

    preload(){
        this.load.audio('menu_music','./assets/bensound-epic.mp3');                                 //background music by Bensound.com
        this.load.audio('arrownoise','./assets/arrowHitShield.wav');                                //http://soundbible.com/947-Metal-Bang.html
        this.load.audio('death','./assets/deathSound.wav');                                          //https://freesound.org/people/AlineAudio/sounds/416838/
        this.load.audio('caltropnoise','./assets/clack.wav');
        this.load.audio('pickup','./assets/pickup.wav');
        this.load.image('menu','./assets/menuScreen.png');
    }
    create(){
        this.menu = this.add.tileSprite(0,0,640,480,'menu').setOrigin(0,0);
        seconds = 0;                                                                                //reset timer
        powerupObtained = false;
    }
    update(){
        if(this.input.activePointer.isDown && this.game.input.activePointer.button == 0){           //leftClick transition
            this.scene.start('instructionScene');
        }
    }
}