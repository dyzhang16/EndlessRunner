class Score extends Phaser.Scene{
    constructor(){
            super('scoreScene');
    }

    preload(){
    }
    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);            //reserve variable for space input
        this.add.text(centerX, centerY, `Congratulations! You survived for ${seconds} seconds.`, { fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, `Press Space click to Restart`, {  fontSize: '22px', color: '#FFF' }).setOrigin(0.5);
    }       
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){           //Space to transition back to menu screen
            this.scene.start('menuScene');
        }
    }
}