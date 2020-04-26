class Play extends Phaser.Scene{
    constructor(){
            super('playScene');
    }

    preload(){
        //load all image and spritesheet assets
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
            frameRate: 8
        });
        this.anims.create({                                                             //animations for p1
            key: 'p1Shield',
            frames: this.anims.generateFrameNumbers('shield', {start: 0, end: 1, first: 0}),
            frameRate: 12
        });

        //barricade speed
        this.barricadeSpeed = 200;                                          //barricade speed starts at 200, can increase 600
        this.barricadeSpeedMax = 600;

        //barricade group
       this.barricadeGroup = this.add.group({
          runChildUpdate: true                //update group
         });
        this.addBarricade();                                                //1 barricade per cycle
        
        //arrow speed
        this.arrowSpeed = 400;                                              //arrowSpeed starts at 400, can increase to 800
        this.arrowSpeedMax = 800;
        
        //arrow group
       this.arrowGroup = this.add.group({
          runChildUpdate: true                //update group
         });
        this.addArrow();                                                    //2 arrows per cycle
        this.addArrow();    

        this.difficultyTimer = this.time.addEvent({                         //timer event every 10 seconds
            delay: 10000,                                                   //calls on levelBump() function
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        });
    }

    addBarricade() {
        let barricade = new Barricade(this, this.barricadeSpeed);   //new barricade
        this.barricadeGroup.add(barricade);                         //add to existing group
    }
    addArrow() {
        let arrow = new Arrow(this, this.arrowSpeed);       //new Arrow
        this.arrowGroup.add(arrow);                         //add to existing group
    }

    update(){
        this.battle.tilePositionY -= 12;                                //background speed

        if(!this.p1.destroyed){
        //player movement    
        let dx = this.input.activePointer.worldX - this.p1.x;           //https://phaser.discourse.group/t/agar-io-mouse-control/1573/3
        let dy = this.input.activePointer.worldY - this.p1.y;           //player sprite will follow cursor position
        var angle = Math.atan2(dy,dx);                                  //calculates how fast the sprite will move
        this.p1.body.setVelocity(
            Math.cos(angle) * 250,
            Math.sin(angle) * 250
        )
        }   
        //shield input
        if(this.game.input.activePointer.isDown && this.game.input.activePointer.button == 0) {         //bug animation for playing running
            this.p1.shield = true;                                                                      //not playing properly
            this.battle.tilePositionY += 9;                                                             //left click will play animation for shield
            this.p1.play('p1Shield');                                                                   //also slows down movement
        }else{
            this.p1.shield = false;                                                                     //shield down
            this.p1.play('p1Move');   
        }
        //check collision
        this.physics.world.collide(this.p1, this.arrowGroup, this.p1ArrowCollision, null, this);            //collision arrow and player
        this.physics.world.collide(this.p1, this.barricadeGroup, this.p1BarrierCollision, null, this);      //collision barricade and player
    }
    //Arrow collision
    p1ArrowCollision(){
        if(this.p1.shield == true){
            this.arrowGroup.setVisible(false);      //sets arrow to Invisible if shield is out
        }else{
            this.p1.destroyed = true;           //collision off
            this.p1.destroy();                  //destroy player
            this.scene.start('scoreScene');     //transition to scoreScene
            //console.log('dead');
        }
    }
    //Barrier collision 
    p1BarrierCollision(){
        this.p1.destroyed = true;   //collision off
        this.p1.destroy();          //destroy player
        this.scene.start('scoreScene'); //transition to scoreScene
        //console.log("dead");
    }
    levelBump() {
        // increment level (aka score)
        level++;
        // bump speed every 5 levels
        if(level % 5 == 0) {
            console.log(`level: ${level}, speed: ${this.barricadeSpeed}`);
            if(this.barricadeSpeed <= this.barricadeSpeedMax && this.arrowSpeed <= this.arrowSpeedMax) {     // increase barricade speed and arrow speed
                this.barricadeSpeed += 15;
                this.arrowSpeed += 15;
            }
        }
    }
}

