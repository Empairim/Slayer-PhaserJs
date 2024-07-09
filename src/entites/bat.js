// @ts-nocheck

import Phaser from "../lib/phaser.js";

export default class Bat extends Phaser.Physics.Arcade.Sprite {
   
    constructor(scene, x, y) {
        super(scene, x, y, 'bat');
        this.scene = scene;
        this.scene.add.existing(this);
        // this.scene.physics.world.enable(this); // may not need this
        this.setOrigin(0.5, 0.9);
        this.createAnimations();
    }

    update(player) {
        this.x = player.x;
        this.y = player.y;
        this.setTint(0xff0000); // Tints the sprite red
        this.play('bat', true);
        const pointer = this.scene.input.activePointer;
        const angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x, pointer.y);
        this.setRotation(angle);
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'bat',
            frames: this.scene.anims.generateFrameNumbers('bat', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1,
        });
        
    }

}