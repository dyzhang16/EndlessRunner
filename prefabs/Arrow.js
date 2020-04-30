class Arrow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        //phaser sprite constructor
        //              spawn region in x and y coordinates                    
        super(scene, game.config.height - Math.floor(Math.random()*(arrowWidth*30)),  Phaser.Math.Between(0, 0 + arrowHeight), 'arrow');
        
        scene.add.existing(this);           //existing scene 
        scene.physics.add.existing(this);   //physics to body
        this.setVelocityY(velocity);        //move downwards
        this.setImmovable();                //cannot be pushed by other object physics
        this.newArrow = true;           //arrow spawn control
        this.scene = scene;             //set variables for future reference
        this.velocity = velocity;
    }

    update() {
        super.update();
        //new arrows spawn if an existing arrow reach 2/3 of game window height
        if(this.newArrow && this.y > game.config.height*3/4) {
            this.newArrow = false;
            this.scene.addArrow(this.parent, this.velocity);
        }
        //destroys arrow if it hits bottom
        if(this.y > game.config.height) {
            this.destroy();
        }
    }
}