class Army extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture,frame ,velocity) {
        //phaser sprite constructor
        //              spawnpoint   region         in x and y coordinates              
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this);           //existing scene 
        scene.physics.add.existing(this);   //physics to body
        this.setVelocityY(velocity);        //move downwards
        this.setImmovable();                //cannot be pushed by other object physics
        this.scene = scene;                 //set variables for future reference
        this.velocity = velocity;               
    }

    update(){
    }
}
