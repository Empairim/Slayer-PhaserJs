// @ts-nocheck
import Phaser from "../lib/phaser.js";
import ElementSystem from "./elementSystem.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "enemy");
    this.scene = scene;
    this.elementSystem = new ElementSystem();
    this.elementSystem.setElement(this, this.elementSystem.getRandomElement());
    

    // Enable physics and scale
    this.scene.physics.world.enable(this);
    this.setScale(2);
    this.body.setCollideWorldBounds(true);
    // Add the enemy to the scene
    this.scene.add.existing(this);
    this.isAlive = true;
    this.isDying = false; // Add this line
    this.setBounce(1, 0);
    this.playChaseAnimation();
  }

  // Update the enemy
  update(target) {
    if (this.isDying) {
      
    return;
  }
    // Move towards the target if alive and body is not null
    if (this.isAlive && this.body) {
      const angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        target.x,
        target.y
      );
      const speed = 100;
      this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
      // Rotate the enemy towards the target
      this.flipX = this.x > target.x;
      //checks for body property before stopping movement so that the game does not crash when the enemy is destroyed
    } else if (this.body) {
      // Stop moving if the enemy is dead
      this.body.setVelocity(0, 0);
    }
  }

  die() {
    this.isAlive = false;
    this.isDying = true; // Add this line
    this.playDieAnimation();
  }

  playChaseAnimation() {
    // To be overridden by subclasses
  }

  playDieAnimation() {
    // To be overridden by subclasses
    // Add the following lines
    this.on('animationcomplete', function (animation, frame) {
        if (animation.key === 'enemyDie') {
          this.isDying = false;
          
        }
    }, this);
  }
}