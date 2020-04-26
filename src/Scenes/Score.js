class Score extends Phaser.Scene{
    constructor(){
            super('scoreScene');
    }

    preload(){
    }
    create(){
        this.add.text(centerX,game.config.height*2/3,'Right Click to Main Menu',{fontFamily: 'Roboto',fontsize: '26px',color: '#FACADE' }) //temporary screen
    }
    update(){
        if(this.input.activePointer.isDown && this.game.input.activePointer.button == 2){           //leftClick transition
            this.scene.start('menuScene');
        }
    }
}