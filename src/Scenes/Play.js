class Play extends Phaser.Scene{
    constructor(){
            super('playScene');
    }

    preload(){
        this.load.image('arrow','./assets/arrow.png');
        this.load.image('barricade','./assets/barricade.png');
        this.load.image('battlefield','./assets/backgroundTile.png');
        this.load.spritesheet('player','./assets/characterMovingSheet.png',{frameWidth: 30, frameHeight: 19, startFrame: 0, endFrame: 1});
    }
    create(){
        this.battle = this.add.tileSprite(0,0,640,480,'battlefield').setOrigin(0,0);
        this.p1 = new Player(this, game.config.width/2, game.config.height*3/4,'player').setOrigin(0,0); //add new Player sprite
        this.anims.create({
            key: 'p1Move',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 1, first: 0}),
            frameRate: 12
        });
        this.p1.play('p1Move');
        
    }
    update(){
        this.battle.tilePositionY -= 6;

        let dx = this.input.activePointer.worldX - this.p1.x;           //https://phaser.discourse.group/t/agar-io-mouse-control/1573/3
        let dy = this.input.activePointer.worldY - this.p1.y;
        var angle = Math.atan2(dy,dx);
        this.p1.body.setVelocity(
            Math.cos(angle) * 125,
            Math.sin(angle) * 125
        )    
    }
}


        