class Arrow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        //phaser sprite constructor
        //           direction where its going          spawnpoint                        how often it spawns
        super(scene, game.config.height - Math.floor(Math.random()*(arrowWidth*30)),  Phaser.Math.Between(0, 0 + arrowHeight), 'arrow');
        
        scene.add.existing(this);           //existing scene 
        scene.physics.add.existing(this);   //physics to body
        this.setVelocityY(velocity);        //move
        this.setImmovable();
        this.newArrow = true;           //barrier spawn control

        this.scene = scene;
        this.velocity = velocity;
    }

    update() {
        super.update();
      
        if(this.newArrow && this.y > game.config.height*2/3) {
            this.newArrow = false;

            this.scene.addBarricade(this.parent, this.velocity);
        }
        //currently destroying once at top of screen needs to be bottom
        if(this.y > game.config.height) {
            this.destroy();
        }
    }
}