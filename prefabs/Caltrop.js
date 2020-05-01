class Caltrop extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, velocity) {                  
        super(scene, x, y, texture, frame, velocity);
        
        scene.add.existing(this);           //existing scene 
        scene.physics.add.existing(this);   //physics to body
        this.setVelocityY(velocity);        //move downwards
        this.setImmovable();                //cannot be pushed by other object physics
        this.scene = scene;             //set variables for future reference
        this.velocity = velocity;
    }

    update() {
        super.update();
        if(this.y > game.config.height) {
            this.destroy();
        }
    }
}