class Instructions extends Phaser.Scene{
    constructor(){
            super('instructionScene');
    }

    preload(){
        this.load.image('shieldimage', './assets/characterShield.png');
        this.load.image('barricadeimage','./assets/barricade.png');
        this.load.image('arrowimage','./assets/arrow.png');
        this.load.image('caltropDropimage','./assets/caltropDrop.png');
        this.load.image('caltropimage','./assets/caltrops.png');
    }
    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.text(centerX,game.config.height*3/20, 'Avoid obstacles by using the mouse!').setOrigin(0.5);
        this.add.image(game.config.width*1/10,game.config.height*1/5,'barricadeimage').setScale(0.75,0.75).setOrigin(0,0); 
        this.add.image(centerX,game.config.height*1/5,'arrowimage').setOrigin(0,0);
        //add roman army image 
        this.add.text(centerX,game.config.height*7/20, 'Use shield by left clicking to deflect arrows!').setOrigin(0.5);
        this.add.image(centerX,game.config.height*9/20,'shieldimage').setScale(0.75,0.75);   
        this.add.text(centerX,game.config.height*11/20,'Pick up caltrop and drop them using middle mouse to slow down Roman Army!',{ fontSize: '14px', color: '#FFF' }).setOrigin(0.5);
        this.add.image(game.config.width/3,game.config.height*13/20,'caltropDropimage').setScale(0.75,0.75);
        this.add.image(game.config.width*2/3, game.config.height*13/20,'caltropimage');
        this.add.text(centerX,game.config.height*3/4, 'Survive as long as you can! Press Space to continue...').setOrigin(0.5);                                      
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){           //leftClick transition
            this.scene.start('playScene');
        }
    }
}