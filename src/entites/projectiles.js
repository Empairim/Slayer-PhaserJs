// @ts-nocheck

import Phaser from "../lib/phaser.js";

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, player, pointer) {
    super(scene, player.x, player.y, "projectile");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setSize(this.width , this.height /2 );
    this.body.setOffset(27, 30);
    this.setScale(2);
    
  }

  fire(player, pointer) {
    this.setPosition(player.x, player.y);
    let direction = new Phaser.Math.Vector2(
      pointer.x - player.x,
      pointer.y - player.y
    );
    direction.normalize();
    const speed = 500;
    this.body.velocity.x = direction.x * speed;
    this.body.velocity.y = direction.y * speed;
    // Calculate the angle in degrees and set the projectile's angle
    const angle = Phaser.Math.RadToDeg(Math.atan2(direction.y, direction.x));
    this.setAngle(angle);
    this.play("fire1", true);
  }
}