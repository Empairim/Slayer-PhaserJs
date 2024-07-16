// @ts-nocheck
import Phaser from "../lib/phaser.js";
import { AmmoTypes } from "../data/ammoTypes.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "enemy");
    this.scene = scene;

    // Enable physics and scale
    this.scene.physics.world.enable(this);
    this.setScale(2);
    this.body.setCollideWorldBounds(true);
    // Add the enemy to the scene
    this.scene.add.existing(this);
    this.isAlive = true;
    this.isDying = false;
    this.setBounce(1, 1);
    this.playChaseAnimation();

    //Health and damage system
    this.health = 100;
    this.speed = 100;
    this.defense = 1;
    this.state = "normal";
    this.hitStun = 200;
    this.damage = 1;
  }

  // Update the enemy
  update(target) {
    if (this.isDying) {
      return;
    }
    if (this.state === "hitStun") {
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

      this.body.setVelocity(
        Math.cos(angle) * this.speed,
        Math.sin(angle) * this.speed
      );
      // Rotate the enemy towards the target
      this.flipX = this.x > target.x;
      //checks for body property before stopping movement so that the game does not crash when the enemy is destroyed
    } else if (this.body) {
      // Stop moving if the enemy is dead
      this.body.setVelocity(0, 0);
    }
  }
  //ENEMY ANIMATIONS
  die() {
    this.isAlive = false;
    this.isDying = true; // Add this line
    this.playDieAnimation();
    const ammoKeys = Object.keys(AmmoTypes);
    const randomAmmo = ammoKeys[Math.floor(Math.random() * ammoKeys.length)];
    // Create a pickup item for the ammo type
    const ammoPickup = new AmmoPickup(this.scene, this.x, this.y, randomAmmo);
    this.scene.add.existing(ammoPickup);
    this.scene.ammoPickups.add(ammoPickup); // add to main scene
    this.destroy();
  }

  playChaseAnimation() {
    // To be overridden by subclasses for unique animations
  }

  playDieAnimation() {
    // To be overridden by subclasses if needed
    this.play("die");
    this.body.enable = false;
    this.on(
      "animationcomplete",
      function (animation) {
        if (animation.key === "die") {
          this.isDying = false;
          this.destroy();
        }
      },
      this
    );
  }

  //  ENEMY GAMEPLAY LOGIC
  takeDamage(damage) {
    const actualDamage =
      Math.floor(Math.random() * (damage.max - damage.min + 1)) + damage.min;
    this.health -= actualDamage;
    if (this.health <= 0) {
      this.die();
    } else {
      this.setTint(0xff0000); // Red
      this.state = "hitStun";
      this.body.setVelocity(0, 0); // Stop the enemy
      this.scene.time.delayedCall(this.hitStun, () => {
        this.state = "normal";
        this.clearTint(); // Clear the red tint
      });
    }
    return actualDamage;
  }
}
//Helper class to create a pickup that will change the player's ammo type
export class AmmoPickup extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, ammoType) {
    super(scene, x, y, "ammoPickup");
    this.ammoType = ammoType;
    scene.physics.world.enable(this);
  }
}
