// @ts-nocheck
import Phaser from "../lib/phaser.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        // Create a new Graphics object and draw a rectangle
        const graphics = scene.add.graphics({ fillStyle: { color: 0x0000ff } });
        const rec = new Phaser.Geom.Rectangle(0, 0, 25, 25);
        graphics.fillRectShape(rec);
        graphics.generateTexture('enemy', 25, 25);

        super(scene, x, y, 'enemy');
        this.scene = scene;

        // Enable physics and scale
        this.scene.physics.world.enable(this);
        this.setScale(2);

        // Add the enemy to the scene
        this.scene.add.existing(this);
        
    }

    // Update the enemy
    update(target) {
        // Move the enemy after player
        const angle = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y);
        const speed = 100;
        this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

    }
}