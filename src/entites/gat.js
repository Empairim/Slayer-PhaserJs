// @ts-nocheck
import Phaser from "../lib/phaser.js";

export default class Gat extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "bat");
    this.scene = scene;
    this.scene.add.existing(this);
    // this.scene.physics.world.enable(this); // may not need this
    // this.setOrigin(0.5, 0.9);
    this.createAnimations();
    //Damage System
  }

  update(player) {
    // Center the gun on the player
    // Flip the gun based on the camera's position relative to the player
    if (
      this.scene.cameras.main.scrollX + this.scene.cameras.main.width / 2 <
      player.x
    ) {
      this.x = player.x - 15;
      this.setFlipY(true);
    } else {
      this.x = player.x + 15;
      this.setFlipY(false);
    }
    this.y = player.y + 17.5;

    // Scale and set the texture of the gun
    this.setScale(2);
    this.setTexture("pistol");

    // Get the active pointer (mouse position)
    const pointer = this.scene.input.activePointer;

    // Calculate the angle between the player and the pointer
    const angle = Phaser.Math.Angle.Between(
      player.x,
      player.y,
      pointer.x,
      pointer.y
    );

    // Set the rotation of the gun to this angle
    this.setRotation(angle);
  }

  createAnimations() {
    //tbd
  }
}
