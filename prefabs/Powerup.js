class Powerup extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        //phaser sprite constructor
        //              spawn region in x and y coordinates                    
        super(scene, game.config.height - Math.floor(Math.random()*(powerupWidth*5)),  Phaser.Math.Between(0, 0 + powerupHeight), 'powerup');
        
        scene.add.existing(this);           //existing scene 
        scene.physics.add.existing(this);   //physics to body
        this.setVelocityY(velocity);        //move downwards
        this.setImmovable();                //cannot be pushed by other object physics
        this.PowerupObtained = false;           //powerUp spawn control
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