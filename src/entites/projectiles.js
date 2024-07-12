// @ts-nocheck

import Phaser from "../lib/phaser.js";

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, player) {
    super(scene, player.x, player.y, "projectile");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setOrigin(0.3, 0.3);
    this.speed = 500;
    this.createEmitter(scene);
  }

  createEmitter(scene) {
    // Create a particle emitter and attach it to the projectile
    this.emitter = scene.add.particles(this.x, this.y, "wSmoke", {
      speed: 100, // Speed of the particles
      lifespan: 300, // How long the particles will live
      angle: { min: -30, max: 30 }, // Angle of the particles
      scale: { start: 0.5, end: 0 }, // Scale of the particles
      ease: "Power2.easeOut", // Easing of the particles
      blendMode: "ADD", // Blend mode of the particles
    });

    // Set the emitter to follow the projectile
  }

  fire(player, pointer) {
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

    this.setTexture("bullet");
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
  }
}
