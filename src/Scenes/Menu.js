class Menu extends Phaser.Scene{
    constructor(){
            super('menuScene');
    }

    preload(){
       //loading any assets necessary
    }
    create(){
        let centerX = game.config.width/2;                                                  //just a simple Menu Screen for the time
        let centerY = game.config.height/2                                                  //being, can expand as we go along
        this.add.text(centerX, centerY, 'Left Click to Start').setOrigin(0.5);
    }
    update(){
        
        if(this.input.activePointer.isDown && this.game.input.activePointer.button == 0){           //leftClick transition
            this.scene.start('playScene');
        }
    }
}