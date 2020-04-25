class Score extends Phaser.Scene{
    constructor(){
            super('scoreScene');
    }

    preload(){
    }
    create(){
        //add highScoreMethod here
        this.add.text(centerX,game.config.height*2/3,'Left Click to Main Menu',{fontFamily: 'Roboto',fontsize: '26px',color: '#FACADE' }) //temporary screen
    }
    update(){
        if(this.input.activePointer.isDown && this.game.input.activePointer.button == 0){           //leftClick transition
            this.scene.start('playScene');
        }
    }
}