// @ts-nocheck
import { AmmoTypes } from '../../data/ammoTypes.js';
import Phaser from '../../lib/phaser.js';

export default class Gat extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'gat');
		this.scene = scene;
		this.scene.add.existing(this);
		this.fireDelay = AmmoTypes[this.scene.player.currentAmmoType].fireDelay;
		//FX
		this.setPipeline('Light2D');
		this.light = this.scene.lights.addLight(this.x, this.y, 5, 0xffffff, 1.3); //add a light to the player
		this.postFX.addShadow(0, 0, 0.14, 10, 0x000000, 10, 0.3);

		this.createAnimations();
		this.recoil = this.recoil.bind(this); //forces the recoil method to be bound to the instance of the gun

		//Damage System
		this.setScale(10);
		this.setVisible(false);
	}
	recoil() {
		// Check if the player exists and is not currently "reloading"
		if (this.scene.player && this.scene.time.now - this.scene.player.lastFired > this.scene.player.fireDelay) {
			this.x += Phaser.Math.Between(-10, 10);
			this.y += Phaser.Math.Between(-10, 10);
		}
		this.recoilEvent = null; // Clear the recoil event
	}

	update(player) {
		// Center the gun on the player
		// Flip the gun based on the camera's position relative to the player
		if (player.x < this.scene.cameras.main.width / 2) {
			this.x = player.x - 15;
			this.setFlipY(true);
		} else {
			this.x = player.x + 15;
			this.setFlipY(false);
		}
		this.y = player.y + 17.5;

		// Scale and set the texture of the gun
		this.setScale(2);
		this.setTexture(AmmoTypes[this.scene.player.currentAmmoType].gatTexture);
		this.fireDelay = AmmoTypes[this.scene.player.currentAmmoType].fireDelay;

		// Get the active pointer (mouse position)
		const pointer = this.scene.input.activePointer;
		let worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);

		if (pointer.isDown) {
			this.x += Phaser.Math.Between(-0.5, 0.5);
			this.y += Phaser.Math.Between(-5, 5);
		}

		// Calculate the angle between the player and the worldPoint
		const angle = Phaser.Math.Angle.Between(player.x, player.y, worldPoint.x, worldPoint.y);

		// Set the rotation of the gun to this angle
		this.setRotation(angle);
	}

	createAnimations() {
		//tbd
	}
}
