// @ts-nocheck
import Phaser from "../lib/phaser.js";
import Projectile from "./projectiles.js";
import { AmmoTypes } from "../data/ammoTypes.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "idle");
    //phaser game properties
    this.scene = scene;
    this.scene.add.existing(this); //add to the scene display list
    this.scene.physics.world.enable(this); //enable physics on creation
    this.body.setCollideWorldBounds(true);
    this.setScale(2);
    this.setBounce(0.2);
    this.body.setSize((this.width * 2) / 3, (this.height * 2) / 3);
    this.body.setOffset(13, 10);

    this.isRolling = false;
    this.speed = 260;

    //create animations and key bindings on creation
    this.createAnimations();
    this.on("animationcomplete", this.onAnimationComplete.bind(this), this); //to check if the animation is complete before doing something else bind it to that specific instance of player
    this.wasdKeys = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    //Combat properties
    this.pointer = this.scene.input.activePointer;
    this.lastFired = 0;

    this.damage = 10;
    this.maxHealth = 5;
    this.health = 5;
    this.isInvincible = false;
    this.invincibilityDuration = 1000;

    //Ammo System
    this.currentAmmoType = "machine"; // Default ammo type
    this.ammoInventory = { machine: Infinity }; // Default ammo inventory object will provide better speed and memory usage
    this.fireDelay = AmmoTypes[this.currentAmmoType].fireDelay;
  }

  //PLAYER SKILLS ACTIONS TBD IF I WANT TO ADD MORE

  handleCombat() {
    const currentTime = this.scene.time.now;
    if (
      this.scene.input.activePointer.isDown &&
      currentTime - this.lastFired > this.fireDelay
    ) {
      // Enough time has passed, the player can fire a projectile
      const distance = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.pointer.worldX,
        this.pointer.worldY
      );
      if (distance < 50) {
        this.performMeleeAttack();
      } else {
        this.performRangedAttack();
      }
      // Update the lastFired property
      this.lastFired = currentTime;
    }
  }

  performMeleeAttack() {
    //TBD
  }

  performRangedAttack() {
    if (this.ammoInventory[this.currentAmmoType] > 0) {
      const ammoType = AmmoTypes[this.currentAmmoType]; // Use the current ammo type
      const damageRange = ammoType.damage;
      this.damage =
        Math.floor(Math.random() * (damageRange.max - damageRange.min + 1)) +
        damageRange.min; // Random damage within the range of the current ammo type
      const projectile = new Projectile(this.scene, this, ammoType);
      if (this.currentAmmoType !== "pistol") {
        this.ammoInventory[this.currentAmmoType]--;
      }
      this.scene.projectiles.add(projectile);
      projectile.fire(this, this.pointer, ammoType);
      projectile.update(this);
    }
  }

  pickUpAmmo(ammoTypeKey) {
    // Add the picked up ammo type to the inventory
    if (this.ammoInventory[ammoTypeKey]) {
      this.ammoInventory[ammoTypeKey]++;
    } else {
      this.ammoInventory[ammoTypeKey] = 1;
    }
  }

  changeAmmoType(ammoTypeKey) {
    // Change the current ammo type only if the player has that ammo type in their inventory
    if (this.ammoInventory[ammoTypeKey]) {
      this.currentAmmoType = ammoTypeKey;
    }
  }

  //PLAYER HEALTH AND DAMAGE SYSTEM////////
  takeDamage(damage) {
    if (!this.isInvincible) {
      this.health -= damage;
      this.setTint(0xff0000); // Red
      this.isInvincible = true;

      // Set a timer to remove invincibility after the duration
      setTimeout(() => {
        this.isInvincible = false;
        this.clearTint();
      }, this.invincibilityDuration);
    }
    if (this.health <= 0) {
      this.destroy();
    }
  }

  //MOVEMENT METHODS
  // roll method
  roll() {
    let endX = this.x;
    let endY = this.y;
    let diagSpeed = this.speed / Math.sqrt(2); //speed for diagonal movement is the speed divided by the square root of 2 since the player is moving in two directions at once

    if (this.wasdKeys.up.isDown && this.wasdKeys.right.isDown) {
      // Diagonal roll up-right
      this.play("yRoll", true);
      endX = this.x + diagSpeed;
      endY = this.y - diagSpeed;
    } else if (this.wasdKeys.up.isDown && this.wasdKeys.left.isDown) {
      // Diagonal roll up-left
      this.play("yRoll", true);
      endX = this.x - diagSpeed;
      endY = this.y - diagSpeed;
    } else if (this.wasdKeys.down.isDown && this.wasdKeys.right.isDown) {
      // Diagonal roll down-right
      this.play("xRoll", true);
      endX = this.x + diagSpeed;
      endY = this.y + diagSpeed;
    } else if (this.wasdKeys.down.isDown && this.wasdKeys.left.isDown) {
      // Diagonal roll down-left
      this.play("xRoll", true);
      endX = this.x - diagSpeed;
      endY = this.y + diagSpeed;
    } else if (this.body.velocity.y !== 0) {
      this.play("yRoll", true);
      if (this.body.velocity.y < 0) {
        endY = this.y - this.speed;
        this.setFlipY(false);
      } else {
        endY = this.y + this.speed;
        this.setFlipY(false);
      }
    } else {
      this.play("xRoll", true);
      if (this.flipX) {
        endX = this.x - this.speed;
      } else {
        endX = this.x + this.speed;
      }
    }

    this.isRolling = true;
    this.isInvincible = true; // Set invincibility when rolling starts

    this.scene.tweens.add({
      targets: this,
      x: endX,
      y: endY,
      duration: this.anims.currentAnim.duration,
      ease: "Cubic.easeOut", // or "Expo.easeOut", or "Sine.easeOut"
      onComplete: () => {
        this.isInvincible = false; // Remove invincibility when roll animation ends
      },
    });
  }

  onAnimationComplete(animation) {
    if (animation.key === "xRoll" || animation.key === "yRoll") {
      this.setVelocity(0);
      this.isRolling = false;
      this.setFlipY(false);
      this.play("idle", true);
    }
  }

  createAnimations() {
    //PLAYER MOVEMENT ANIMATIONS
    //idle
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("gunner", { start: 0, end: 5 }), // Adjust frame numbers as needed
      frameRate: 5,
      repeat: -1,
    });
    //side walk
    this.anims.create({
      key: "xwalk",
      frames: this.anims.generateFrameNumbers("gunner", { start: 45, end: 52 }), // Adjust frame numbers as needed
      frameRate: 5,
      repeat: -1,
    });
    //up walk
    this.anims.create({
      key: "uwalk",
      frames: this.anims.generateFrameNumbers("gunner", { start: 45, end: 52 }), // Adjust frame numbers as needed
      frameRate: 5,
      repeat: -1,
    });
    //down walk
    this.anims.create({
      key: "dwWalk",
      frames: this.anims.generateFrameNumbers("gunner", { start: 45, end: 52 }), // Adjust frame numbers as needed
      frameRate: 5,
      repeat: -1,
    });

    //horizontal roll
    this.anims.create({
      key: "xRoll",
      frames: this.anims.generateFrameNumbers("gunner", { start: 63, end: 67 }), // Adjust frame numbers as needed
      frameRate: 9,
      repeat: 0,
    });

    //vertical roll
    this.anims.create({
      key: "yRoll",
      frames: this.anims.generateFrameNumbers("gunner", { start: 63, end: 67 }), // Adjust frame numbers as needed
      frameRate: 9,
      repeat: 0,
    });
  }

  //UPDATE PLAYERS ACTIONS
  update() {
    if (!this.active) {
      return;
    }
    if (this.wasdKeys.left.isDown && !this.isRolling) {
      this.setVelocityX(-this.speed);
      this.play("xwalk", true);
      this.setFlipX(true);
    } else if (this.wasdKeys.right.isDown && !this.isRolling) {
      this.setVelocityX(this.speed);
      this.play("xwalk", true);
      this.setFlipX(false);
    } else if (this.wasdKeys.up.isDown && !this.isRolling) {
      this.setVelocityY(-this.speed);
      this.play("uwalk", true);
      this.setFlipX(false);
    } else if (this.wasdKeys.down.isDown && !this.isRolling) {
      this.setVelocityY(this.speed);
      this.play("dwWalk", true);
      this.setFlipX(true);
    } else if (
      !this.wasdKeys.left.isDown &&
      !this.wasdKeys.right.isDown &&
      !this.wasdKeys.up.isDown &&
      !this.wasdKeys.down.isDown &&
      !this.isRolling
    ) {
      this.setVelocity(0);
      this.play("idle", true);
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.wasdKeys.space) &&
      !this.isRolling
    ) {
      this.roll();
    }
    this.handleCombat(); // Call the combat handler
  }
}
