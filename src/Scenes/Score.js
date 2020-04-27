class Score extends Phaser.Scene{
    constructor(){
            super('scoreScene');
    }

    preload(){
    }
    create(){
        this.add.text(centerX, centerY, `Congratulations! You survived for ${level} seconds.`, { fontFamily: 'Arial', fontSize: '24px', color: '#FFF' }).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, `Press Right click to Restart`, { fontFamily: 'Arial', fontSize: '24px', color: '#FFF' }).setOrigin(0.5);
    }       
    update(){
        if(this.input.activePointer.isDown && this.game.input.activePointer.button == 2){           //rightClick transition
            this.scene.start('menuScene');
        }
    }
}