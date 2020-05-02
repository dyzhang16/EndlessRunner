class Instructions extends Phaser.Scene{
    constructor(){
            super('instructionScene');
    }

    preload(){
        this.load.image('instructions','./assets/instructionScreen.png');
    }
    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.instructions = this.add.tileSprite(0,0,640,480,'instructions').setOrigin(0,0);                                    
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){           //leftClick transition
            this.scene.start('playScene');
        }
    }
}