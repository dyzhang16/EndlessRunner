class Play extends Phaser.Scene{
    constructor(){
            super('playScene');
    }

    preload(){
        //load all image and spritesheet assets
        this.load.image('battlefield','./assets/backgroundTile.png');
        this.load.image('powerupUIempty','./assets/powerupUI.png');
        this.load.image('powerupUI','./assets/playUICaltrop.png');
        this.load.image('arrow','./assets/arrow.png');
        this.load.image('barricade','./assets/barricade.png');
        this.load.image('caltrops','./assets/caltrops.png');
        this.load.image('powerup','./assets/caltropDrop.png');
        this.load.image('legionArmy','./assets/romanLegionRedoSheet.png');
        this.load.atlas('character','./assets/characterAtlas.png','./assets/atlasCut.json');
        //this.load.spritesheet('shield', './assets/characterShieldSheet.png',{frameWidth: 60, frameHeight: 48, startFrame: 0, endFrame: 8});
        //this.load.spritesheet('player','./assets/characterWalkRedo.png',{frameWidth: 60, frameHeight: 48, startFrame: 0, endFrame: 11});
        //this.load.spritesheet('legionArmy','./assets/romanLegionRedoSheet.png',{frameWidth: 660, frameHeight: 58, startFrame: 0, endFrame: 8});
        //animation to make army animated(?)
    }

    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);        //reserve variable for on space down
        this.battle = this.add.tileSprite(0,0,640,480,'battlefield').setOrigin(0,0);        //add backgroundTile
        this.UI = this.add.tileSprite(0,0,640,480,'powerupUIempty').setOrigin(0,0);         //add UI 
        this.menumusic = this.sound.add('menu_music',{volume: 0.1});                        //add BG music
        this.menumusic.loop = true;                                                         //loops menu music
        this.menumusic.play();                                                              //play BG music
        this.arrowHitShield = this.sound.add('arrownoise',{volume: 0.1});                   //add arrow hitting noise 
        this.deathNoise = this.sound.add('death',{volume: 0.1});                            //add death noise
        this.pickupNoise = this.sound.add('pickup',{volume: 0.1});                          //add pickup indicator noise
        this.caltropNoise = this.sound.add('caltropnoise',{volume: 0.1});                   //add caltrop deployment noise

        //Instantiate character and animations
        this.p1 = new Player(this, game.config.width/2, game.config.height*3/4,'character').setOrigin(0.5); //add new Player sprite
        this.anims.create({                                 //basic movement animation
            key: 'p1Move',
            repeat: -1,
            frames: this.anims.generateFrameNames('character', {start: 0, end: 11, prefix: 'sprite'}),
            frameRate: 30
        });
        this.anims.create({                                 //shield movement animation
            key: 'p1Shield',
            repeat: -1,
            frames: this.anims.generateFrameNames('character', {start: 13, end: 20, prefix: 'sprite'}),
            frameRate: 30
        });

        /*this.anims.create({                               //animations for legion army
            key: 'romanLegion',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('legionArmy', {start: 0, end: 8, first: 0}),
            frameRate: 24
        });*/

        //barricade properties
        this.barricadeSpeed = 150;                                          //barricade speed starts at 150, can increase 600
        this.barricadeSpeedMax = 600;
        this.barricadeGroup = this.add.group({                              //sets a variable that constant updates the barricade group
          runChildUpdate: true                //update group
         });
        this.addBarricade();                                                //1 barricade spawn per cycle
        
        //arrow properties
        this.arrowSpeed = 300;                                              //arrowSpeed starts at 300, can increase to 750
        this.arrowSpeedMax = 750;
        this.arrowGroup = this.add.group({                                  //sets a variable that constant updates the arrow group
            runChildUpdate: true                //update group
           });
        this.addArrow();                                                    //2 arrows per cycle
        this.addArrow();
        
        //Instantiates army and properties
        this.armySpeed = -1;
        this.legion = new Army(this, centerX, 740,'legionArmy', 0, this.armySpeed).setOrigin(0.5);        //spawns army at the bottom of the screen                                 
        //this.legion.play('romanLegion');                                  //play army animation
        
        //powerup properties
        this.powerupSpeed = 200;                                            //powerupSpeed starts at 200 can increase up to 600
        this.powerupSpeedMax = 600;
        this.powerupGroup = this.add.group({                                //sets a variable that constant updates the powerup group
            runChildUpdate: true                //update group
           });                                                              //spawns based on timer function below
        
        //caltrop properties
        this.caltropSpeed = 300;                                            //sets a variable that constant updates the caltrop group
        this.caltropGroup = this.add.group({                                            
            runChildUpdate: true                //update group
           });

        //timer event every second
        this.difficultyTimer = this.time.addEvent({                         
            delay: 1000,                                                    //calls on TimePlayed() function
            callback: this.TimePlayed,
            callbackScope: this,
            loop: true
        });
    }
    //Instantiates a barrier object, called from Barricade.js
    addBarricade() {
        let barricade = new Barricade(this, this.barricadeSpeed);           //new Barricade(speed parameters are the current speed in the game)
        this.barricadeGroup.add(barricade);                                 //add to existing group
    }
    //Instantiates an arrow object, called from Arrow.js
    addArrow() {
        let arrow = new Arrow(this, this.arrowSpeed);                       //new Arrow(speed parameters are the current speed in the game) 
        this.arrowGroup.add(arrow);                                         //add to existing group
    }
    //Instantiates a powerup object, called on a timerfunction every 20 seconds
    addPowerup(){
        let powerup = new Powerup(this, this.powerupSpeed);                 //new Powerup(speed parameters are the current speed in the game)
        this.powerupGroup.add(powerup);                                     //add to existing group
    }
    //Instantitates a caltrop object, called every time a player presses space while having the object in their inventory
    addCaltrop(){                                                           //new Caltrop(location based on where player is)
        let trap = new Caltrop(this, this.p1.x, this.p1.y,'caltrops', 0, this.caltropSpeed).setScale(1.25).setOrigin(0.5);
        this.caltropGroup.add(trap);                                        //add to existing group
    }

    update(){
        this.battle.tilePositionY -= 6;                                 //background speed

        if(!this.p1.destroyed){                                         //mouse movement for character
        //player movement    
        let dx = this.input.activePointer.worldX - this.p1.x;           //https://phaser.discourse.group/t/agar-io-mouse-control/1573/3
        let dy = this.input.activePointer.worldY - this.p1.y;           //player sprite will follow cursor position
        var angle = Math.atan2(dy,dx);                                  //calculates how fast the sprite will move
            this.p1.body.setVelocity(
                Math.cos(angle) * 250,
                Math.sin(angle) * 250
        )
        }   
        //On left click down, player will pull out shield and slow down and army will start to move forward
        if(this.game.input.activePointer.isDown && this.game.input.activePointer.button == 0) {             //checks for left click   
            this.p1.shield = true;                                      //sets variable for shield is out
            this.battle.tilePositionY += 3;                             //slows down battlefield                                  
            this.p1.play('p1Shield',true);                              //plays shield animation                                    
            this.legion.y -= 0.2;                                       //army starts to catch up
        }else{
            this.clock = this.time.delayedCall(5, () => {
                if(!this.game.input.activePointer.isDown || !this.game.input.activePointer.button == 0){
                        this.p1.shield = false;                                     //otherwise plays running animation
                        this.p1.play('p1Move',true);
                }
            }, null, this);
        }   
        //On space bar, player will drop caltrops if they have it in their inventory
        if(powerupObtained == true) {                                   //checks if they have the powerup
            if(Phaser.Input.Keyboard.JustDown(keySPACE)) {              //on space button input
                this.addCaltrop();                                      //instantiates caltrop object
                this.caltropNoise.play();                               //plays caltrop deployment sound
                this.UI = this.add.tileSprite(0,0,640,480,'powerupUIempty').setOrigin(0,0); //removes caltrop from the UI
                this.clock = this.time.delayedCall(5, () => {         //delays setting powerupObtained variable to be true
                    if(powerupObtained == true){
                            powerupObtained = false;
                    }
                }, null, this);
                //console.log('drop caltrops');
            }
        }
        //check collision between objects, Phaser passes in specific object as arguments behind the scenes
        this.physics.world.collide(this.p1, this.arrowGroup, this.p1ArrowCollision, null, this);          //collision player and arrow
        this.physics.world.collide(this.p1, this.barricadeGroup, this.p1BarrierCollision, null, this);    //collision player and barricade
        this.physics.world.collide(this.p1, this.powerupGroup, this.p1PowerupCollision, null, this);      //collision player and powerup
        this.physics.world.collide(this.p1, this.legion, this.p1ArmyCollision, null, this);               //collision player and army
        this.physics.world.collide(this.caltropGroup, this.legion, this.caltropArmyCollision, null, this);//collision caltrop and army
    }
    //Arrow collision
    p1ArrowCollision(p1,arrow){                                         //pass parameters referencing player and specific arrow
        if(p1.shield == true){                                          //if shield is out
            this.arrowHitShield.play();                                 //plays arrow hitting shield sound
            arrow.setVisible(false);                                    //sets arrow to Invisible(imitating destroying the arrow)
            //console.log('arrow blocked');          
        }else{                                                          //else transition to Score scene
            this.deathNoise.play();                                     //plays the sound for character death                                           
            p1.destroyed = true;                                        //turns collision off  
            p1.destroy();                                               //destroy player
            this.menumusic.stop();                                      //stops BGM 
            this.scene.start('scoreScene');                             //transitions to scoreScene
            //console.log('dead');
        }
    }
    //Barrier collision 
    p1BarrierCollision(){                                               
        this.deathNoise.play();                                         //plays the sound for character death
        this.p1.destroyed = true;                                       //turns collision off
        this.p1.destroy();                                              //destroy player
        this.menumusic.stop();                                          //stops BGM
        this.scene.start('scoreScene');                                 //transitions to scoreScene
        //console.log("dead");
    }
    //Powerup collision
    p1PowerupCollision(p1, powerup){                                    //passes in parameters for player and specific powerup
        this.UI = this.add.tileSprite(0,0,640,480,'powerupUI').setOrigin(0,0);  //changes UI to indicate powerup is picked
        powerupObtained = true;                                         //sets variable to indicate that powerup is obtained
        powerup.setVisible(false);                                      //hides powerUp sprite to indicate player has picked it up
        this.pickupNoise.play();                                        //plays powerup pick up sound
        //console.log('powerup obtained');
    }
    //army collision 
    p1ArmyCollision(){
        this.deathNoise.play();                                         //plays sound for character death
        this.p1.destroyed = true;                                       //turns collision off
        this.p1.destroy();                                              //destroy player
        this.menumusic.stop();                                          //stops BGM
        this.scene.start('scoreScene');                                 //transitions to scoreScene
        //console.log("dead");
    }
    //collision between army and caltrops
    caltropArmyCollision(caltrop){                                             
        this.legion.y = this.legion.y + 2;                             //pushes the army back
    }
    TimePlayed() {                                                      //timer function called every second after the game starts
        //  
        seconds++;                                                      //increases seconds to keep track of time
        // speed increase every 10 seconds
        if(seconds % 10 == 0) {                                         
            //console.log(`Time: ${seconds}, speed: ${this.barricadeSpeed}`);
            this.addPowerup(this,this.powerupSpeed);
            if(this.barricadeSpeed <= this.barricadeSpeedMax && this.arrowSpeed <= this.arrowSpeedMax) {   //increases speed of obstacles only if they are currently slower than their max speeds 
                this.barricadeSpeed += 25;                      //increase barricade, arrow, and powerup speeds by 25 px
                this.arrowSpeed += 25;
                this.powerupSpeed += 25;
            }
        }
    }
}

