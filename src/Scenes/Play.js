class Play extends Phaser.Scene{
    constructor(){
            super('playScene');
    }

    preload(){
        this.load.image('arrow','./assets/arrow.png');
        this.load.image('barricade','./assets/barricade.png');
        this.load.image('battlefield','./assets/backgroundTile.png');
        this.load.spritesheet('shield', './assets/characterShieldSheet.png',{frameWidth: 88, frameHeight: 48, startFrame: 0, endFrame: 1});
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
        this.anims.create({
            key: 'p1Shield',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('shield', {start: 0, end: 1, first: 0}),
            frameRate: 12
        });
        this.p1.play('p1Move');
        
        //barricade speed
        this.barricadeSpeed = 200;
        this.barricadeSpeedMax = 600;

        //barricade group
       this.barricadeGroup = this.add.group({
          runChildUpdate: true                //update group
         });
        this.addBarricade();

        //arrow speed
        this.arrowSpeed = 400;
        this.arrowSpeedMax = 1200;

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
        this.battle.tilePositionY -= 12;

        if(!this.p1.destroyed){
        //player movement    
        let dx = this.input.activePointer.worldX - this.p1.x;           //https://phaser.discourse.group/t/agar-io-mouse-control/1573/3
        let dy = this.input.activePointer.worldY - this.p1.y;
        var angle = Math.atan2(dy,dx);
        this.p1.body.setVelocity(
            Math.cos(angle) * 250,
            Math.sin(angle) * 250
        )
        }   
            //shield input
            if(this.game.input.activePointer.isDown && this.game.input.activePointer.button == 0) {
                this.p1.shield = true;
                //this.battle.tilePositionY += 9;
                this.p1.play('p1Shield');
            }else{
                this.p1.shield = false;
                this.p1.play('p1Move');
            }
        //check collision
        this.physics.world.collide(this.p1, this.arrowGroup, this.p1ArrowCollision, null, this);  
        this.physics.world.collide(this.p1, this.barricadeGroup, this.p1BarrierCollision, null, this);    
        
    }
    //Arrow collision
    p1ArrowCollision(){
        if(this.p1.shield == true){
            this.arrowGroup.setVisible(false);
        }else{
            this.p1.destroyed = true;  //collision off
            this.p1.destroy();
            this.scene.start('scoreScene');
        }
    }
    //Barrier collision 
    p1BarrierCollision(){
        this.p1.destroyed = true;  //collision off
        this.p1.destroy();
        this.scene.start('scoreScene');
    //particles
        console.log("dead");
    }
}

