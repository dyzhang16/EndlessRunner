class Menu extends Phaser.Scene{
    constructor(){
            super('menuScene');
    }

    preload(){
        this.load.image('menu','./assets/menuScreen.png');
    }
    create(){
        this.menu = this.add.tileSprite(0,0,640,480,'menu').setOrigin(0,0);
        level = 0;
    }
    update(){
        if(this.input.activePointer.isDown && this.game.input.activePointer.button == 0){           //leftClick transition
            this.scene.start('playScene');
        }
    }
}