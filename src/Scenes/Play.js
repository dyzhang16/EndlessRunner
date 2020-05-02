class Play extends Phaser.Scene{
    constructor(){
            super('playScene');
    }

    preload(){
        //load all image and spritesheet assets
        this.load.image('battlefield','./assets/Refined_Road_clone.png');
        this.load.image('powerupUIempty','./assets/powerupUI.png');
        this.load.image('powerupUI','./assets/playUICaltrop.png');
        this.load.image('arrow','./assets/arrow.png');
        this.load.image('barricade','./assets/barricade.png');
        this.load.image('caltrops','./assets/caltrops.png');
        this.load.image('powerup','./assets/caltropDrop.png');
        this.load.image('legionArmy','./assets/romanLegionSheet.png');
        this.load.spritesheet('shield', './assets/characterShieldSheet.png',{frameWidth: 60, frameHeight: 48, startFrame: 0, endFrame: 1});
        this.load.spritesheet('player','./assets/characterMovingSheet.png',{frameWidth: 60, frameHeight: 38, startFrame: 0, endFrame: 1});
    }

    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.battle = this.add.tileSprite(0,0,640,480,'battlefield').setOrigin(0,0);
        this.UI = this.add.tileSprite(0,0,640,480,'powerupUIempty').setOrigin(0,0);
        this.menumusic = this.sound.add('menu_music',{volume: 0.1});                        //add music
        this.menumusic.play();                                                              //play music
        this.arrowHitShield = this.sound.add('arrownoise',{volume: 0.1}); 
        this.deathNoise = this.sound.add('death',{volume: 0.1});

        this.p1 = new Player(this, game.config.width/2, game.config.height*3/4,'player').setOrigin(0.5); //add new Player sprite
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

        //army speed
        this.armySpeed = 0;                                           
        this.addArmy();

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
        this.addArrow();                                                    
        this.addArrow();
        //powerup speed
        this.powerupSpeed = 300;
        this.powerupSpeedMax = 600;
        //powerup group
        this.powerupGroup = this.add.group({
            runChildUpdate: true                //update group
           });
        //caltrop group
           this.caltropGroup = this.add.group({
            runChildUpdate: true                //update group
           });

        this.difficultyTimer = this.time.addEvent({                         //timer event every second
            delay: 1000,                                                   //calls on TimePlayed() function
            callback: this.TimePlayed,
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
    addPowerup(){
        let powerup = new Powerup(this, this.powerupSpeed);
        this.powerupGroup.add(powerup);
    }
    addCaltrop(){
        let trap = new Caltrop(this, this.p1.x, this.p1.y,'caltrops', 0, caltropSpeed).setScale(1.25).setOrigin(0.5);
        this.caltropGroup.add(trap);
    }
    addArmy() {
        this.legion = new Army(this, centerX-10, 680, this.armySpeed); 
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
        if(this.game.input.activePointer.isDown && this.game.input.activePointer.button == 0) {         
            this.p1.shield = true;                                                                      //if left click is down player
            this.battle.tilePositionY += 9;                                                             //will pull out shield
            this.p1.play('p1Shield');                                                                   //and slow down
            this.legion.y -= 1;                                                                         //army comes up
        }else{
            this.p1.shield = false;                                                                     //else running animation
            this.p1.play('p1Move',true);   
        }
        //drops caltrops
        if(powerupObtained == true) {         
            if(Phaser.Input.Keyboard.JustDown(keySPACE)) {   
                //console.log('drop caltrops');   
                this.addCaltrop();
                this.UI = this.add.tileSprite(0,0,640,480,'powerupUIempty').setOrigin(0,0);
                powerupObtained = false; 
            }
        }
        //check collision
        this.physics.world.collide(this.p1, this.arrowGroup, this.p1ArrowCollision, null, this);            //collision arrow and player
        this.physics.world.collide(this.p1, this.barricadeGroup, this.p1BarrierCollision, null, this);      //collision barricade and player
        this.physics.world.collide(this.p1, this.powerupGroup, this.p1PowerupCollision, null, this);      //collision barricade and player
        this.physics.world.collide(this.p1, this.legion, this.p1ArmyCollision, null, this);              //army collision + player
        this.physics.world.collide(this.caltropGroup, this.legion, this.caltropArmyCollision, null, this);
    }
    //Arrow collision
    p1ArrowCollision(p1,arrow){                                         //pass parameters referencing player and specific arrow
        if(p1.shield == true){
            this.arrowHitShield.play(); 
            arrow.setVisible(false);      //sets arrow to Invisible if shield is out
            //console.log('arrow blocked');          
        }else{          
            this.deathNoise.play();                                                                                
            p1.destroyed = true;           //collision off
            p1.destroy();                  //destroy player
            this.menumusic.stop();
            this.scene.start('scoreScene');     //transition to scoreScene
            //console.log('dead');
        }
    }
    //Barrier collision 
    p1BarrierCollision(){
        this.deathNoise.play();
        this.p1.destroyed = true;   //collision off
        this.p1.destroy();          //destroy player
        this.menumusic.stop();
        this.scene.start('scoreScene'); //transition to scoreScene
        //console.log("dead");
    }
    p1PowerupCollision(){
        this.UI = this.add.tileSprite(0,0,640,480,'powerupUI').setOrigin(0,0);
        powerupObtained = true;
        //console.log('powerup obtained');
    }
    //army collision 
    p1ArmyCollision(){
        this.p1.destroyed = true;   //collision off
        this.p1.destroy();          //destroy player
        this.scene.start('scoreScene'); //transition to scoreScene
        //console.log("dead");
    }
    caltropArmyCollision(){
        this.legion.y = this.legion.y + 10;
    }
    TimePlayed() {
        //  
        seconds++;
        // speed increase every 10 seconds
        if(seconds % 10 == 0) {
            console.log(`Time: ${seconds}, speed: ${this.barricadeSpeed}`);
            if(this.barricadeSpeed <= this.barricadeSpeedMax && this.arrowSpeed <= this.arrowSpeedMax) {     // increase barricade speed and arrow speed
                this.barricadeSpeed += 15;
                this.arrowSpeed += 15;
            }
        }
        if(seconds% 2 == 0){
            this.addPowerup(this,this.powerupSpeed);
        }
    }
}

