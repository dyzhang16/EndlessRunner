class Barricade extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        //phaser sprite constructor
        //            direction where its going          spawnpoint                        how often it spawns
        super(scene, game.config.height - Math.floor(Math.random()*(barricadeWidth*4.5)), Phaser.Math.Between(game.config.height, game.config.height - barricadeHeight/2), 'barricade');
        
        scene.add.existing(this);           //exisiting scene 
        scene.physics.add.existing(this);   //physics to body
        this.setVelocityY(velocity);        //move
        this.setImmovable();
        this.newBarricade = true;           //barrier spawn control

        this.scene = scene;
        this.velocity = velocity;
    }

    update() {
        super.update();
      
        if(this.newBarricade && this.y < centerY) {
            this.newBarricade = false;

            this.scene.addBarricade(this.parent, this.velocity);
        }
        //currently destroying once at top of screen needs to be bottom
        if(this.y < this.height) {
            this.destroy();
        }
    }
}