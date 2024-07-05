// @ts-nocheck
import Phaser from "../lib/phaser.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');
        this.scene = scene;
          // Create a new Graphics object and draw a rectangle
        const graphics = scene.add.graphics({ fillStyle: { color: 0x0000ff } });
        const rec = new Phaser.Geom.Rectangle(0, 0, 15, 15);
        graphics.fillRectShape(rec);
        graphics.generateTexture('enemy', 15, 15);


        // Enable physics and scale
        this.scene.physics.world.enable(this);
        this.setScale(2);

        // Add the enemy to the scene
        this.scene.add.existing(this);
        this.isAlive = true;
        
    }

    // Update the enemy
    update(target) {
        // Move the enemy after player
        const angle = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
        const speed = 100;
        this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
        

    }
    die() {
        this.isAlive = false;
        this.destroy();
    }
}