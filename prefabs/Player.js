class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        let custom_body = new Phaser.Physics.Arcade.Body(scene.physics.world, this)     //https://phaser.discourse.group/t/character-class/4184/4
        this.body = custom_body;
        this.setBounce(0.5);
        this.setImmovable();
        this.destroyed = false;
        this.setCollideWorldBounds(true);
        scene.add.existing(this);                               
        scene.physics.add.existing(this);                       //add object to existing scene
    }
    update(){
    }
}