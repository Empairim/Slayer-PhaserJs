// @ts-nocheck

import Phaser from '../lib/phaser.js';

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  
    constructor(scene, player, pointer) {
        super(scene, player.x, player.y, 'projectile');
        this.scene = scene; // so I dont have to pass scene to every method
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.createAnimations();
        this.setCollideWorldBounds(false);
        this.setBounce(0);
        const angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x, pointer.y);
        this.fire(player.x, player.y, Phaser.Math.RadToDeg(angle));

    }

    

   
    fire(x, y, angle) {
        this.setPosition(x, y);
        this.setAngle(angle);
        this.scene.physics.velocityFromAngle(angle, 500, this.body.velocity);
        this.play('fire1', true);


        
        
    }

    //create animations
    createAnimations() {
        this.scene.anims.create({
            key: 'fire1',
            frames: this.scene.anims.generateFrameNumbers('fire1', { start: 0, end: 10 }),
            frameRate: 30,
            repeat: -1,
        });
    }
}