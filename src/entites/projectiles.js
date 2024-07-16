// @ts-nocheck

import Phaser from "../lib/phaser.js";
import { AmmoTypes } from "../data/ammoTypes.js";

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, player, ammoType) {
    super(scene, player.x, player.y, "projectile");

    // Create a graphics object
    const graphics = scene.make.graphics();
    graphics.fillStyle(ammoType.particleProperties.color, 1); // Set the color of the bullet to the color of the ammo type
    const radius = Math.max(
      ammoType.bulletSize.width,
      ammoType.bulletSize.height
    );
    graphics.fillRect(ammoType.bulletSize.width, ammoType.bulletSize.height);

    // Generate a texture from the graphics object
    graphics.generateTexture(
      ammoType.particleTexture,
      ammoType.bulletSize.width,
      ammoType.bulletSize.height
    );
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.visible = true; //hide the projectile but keep its body
    this.setOrigin(0.5, 0.5); //set the origin to the center of the projectile
    this.body.checkCollision = true;
    this.body.onWorldBounds = true;
    this.body.collideWorldBounds = true;
    // Set the size of the projectile's image
    this.setScale(
      ammoType.bulletSize.width / this.width,
      ammoType.bulletSize.height / this.height
    );

    // Set the size of the projectile's physics body
    this.body.setSize(ammoType.bulletSize.width, ammoType.bulletSize.height);

    this.createEmitter(scene, ammoType); //will be used for "bullet" visual effects
    //Bullet combat properties
    this.ammoType = ammoType;
    this.damage = ammoType.damage;
    this.speed = ammoType.bulletSpeed;
    this.penetrates = ammoType.penetrates;
  }

  createEmitter(scene, ammoType) {
    // Create a particle emitter and attach it to the projectile
    // Create a graphics object for the particles
    const particleGraphics = scene.make.graphics();
    // particleGraphics.fillStyle(ammoType.particleProperties.color, 1);
    // particleGraphics.fillCircle(0, 0, ammoType.particleProperties.size);
    particleGraphics.generateTexture(
      ammoType.particleTexture,
      ammoType.particleProperties.size,
      ammoType.particleProperties.size
    );

    this.emitter = scene.add.particles(
      this.x,
      this.y,
      ammoType.particleTexture,
      {
        ...ammoType.emitterProperties,
        ease: "Sine.easeOut", // Easing of the particles
        blendMode: "ADD", // Blend mode of the particles
      }
    );

    // Set the emitter to follow the projectile
  }

  fire(player, pointer, ammoType) {
    // Calculate the offset for the starting position of the projectile

    const offsetX = player.flipX ? -23 : 23;
    const offsetY = 22;

    // Set the position of the projectile to the end of the gun's barrel
    this.setPosition(player.x + offsetX, player.y + offsetY);
    let direction = new Phaser.Math.Vector2(
      pointer.x - player.x,
      pointer.y - player.y
    );
    direction.normalize();

    this.body.velocity.x = direction.x * this.speed;
    this.body.velocity.y = direction.y * this.speed;

    // Calculate the angle in degrees and set the projectile's angle
    const angle = Phaser.Math.RadToDeg(Math.atan2(direction.y, direction.x));
    this.setAngle(angle);

    this.setTexture(ammoType.particleTexture);
  }
  update() {
    this.emitter.setPosition(this.x, this.y);
    // Set the emitter to follow the projectile
    if (this.body) {
      const angle = Phaser.Math.RadToDeg(
        Math.atan2(this.body.velocity.y, this.body.velocity.x)
      );
      //math.atan2 returns the angle in radians, so we convert it to degrees, we pass y first because it's the vertical axis to the x horizontal axis to get the angle.
      this.emitter.setAngle(angle);
      //then pass that angle to the emitter
    }
    // Destroy the projectile if it goes out of bounds for optimization
    if (
      this.x < 0 ||
      this.y < 0 ||
      this.x > this.scene.game.config.width ||
      this.y > this.scene.game.config.height
    ) {
      // console.log("A projectile has been destroyed due to world bounds");
      this.body.collideWorldBounds = false;
      if (this.emitter) {
        this.emitter.destroy(); // Destroy the emitter when the projectile is destroyed
      }
      this.destroy();
    }
  }
}
