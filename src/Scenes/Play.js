class Play extends Phaser.Scene{
    constructor(){
            super('playScene');
    }

    preload(){
        this.load.image('arrow','./assets/arrow.png');
        this.load.image('barricade','./assets/barricade.png');
        this.load.image('battlefield','./assets/backgroundTile.png');
        this.load.spritesheet('player','./assets/characterMovingSheet.png',{frameWidth: 60, frameHeight: 38, startFrame: 0, endFrame: 1});
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

        //barricade speed
        this.barricadeSpeed = 300;
        this.barricadeSpeedMax = 700;

        //barricade group
       this.barricadeGroup = this.add.group({
          runChildUpdate: true                //update group
         });
        this.addBarricade();

        //arrow speed
        this.arrowSpeed = 300;
        this.arrowSpeedMax = 700;

        //arrow group
       this.arrowGroup = this.add.group({
          runChildUpdate: true                //update group
         });
        this.addArrow();
    }

    addBarricade() {
        let barricade = new Barricade(this, this.barricadeSpeed);   //new barricade
        this.barricadeGroup.add(barricade);                         //add to existing group
    }
    addArrow() {
        let arrow = new Arrow(this, this.arrowSpeed);   //new barricade
        this.arrowGroup.add(arrow);                         //add to existing group
    }

    update(){
        this.battle.tilePositionY -= 6;

        //stop input if destroyed
        if(!this.p1.destroyed){

        let dx = this.input.activePointer.worldX - this.p1.x;           //https://phaser.discourse.group/t/agar-io-mouse-control/1573/3
        let dy = this.input.activePointer.worldY - this.p1.y;
        var angle = Math.atan2(dy,dx);
        this.p1.body.setVelocity(
            Math.cos(angle) * 250,
            Math.sin(angle) * 250
        )   
        }
            //check collision
        this.physics.world.collide(this.p1, this.barrierGroup, this.p1Collision, null, this);    
    }

    //p1collision 
    p1Collision(){
        this.p1.destroyed = true;  //collision off
        this.p1.destroy();
    //particles
        console.log("dead");
    }

}

