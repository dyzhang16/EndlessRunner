class Barricade extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        //phaser sprite constructor
        //              spawnpoint   region         in x and y coordinates              
        super(scene, game.config.width - Math.floor(Math.random()*(barricadeWidth*4)),  Phaser.Math.Between(0, 0 + barricadeHeight/2), 'barricade');
        
        scene.add.existing(this);           //existing scene 
        scene.physics.add.existing(this);   //physics to body
        this.setVelocityY(velocity);        //move downwards
        this.setImmovable();                //cannot be pushed by other object physics
        this.newBarricade = true;           //barricade spawn control
        this.scene = scene;                 //set variables for future reference
        this.velocity = velocity;               
    }

    update() {
        super.update();
      
        if(this.newBarricade && this.y > centerY) {             //spawn new barricade when current barricade hits center
            this.newBarricade = false;
            this.scene.addBarricade(this.parent, this.velocity);
        }
        //destroys barricade when it hits bottom of screen
        if(this.y > game.config.height) {
            this.destroy();
        }
    }
}