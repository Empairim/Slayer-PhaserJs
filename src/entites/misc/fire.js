// @ts-nocheck

export default class Fire extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, color, intensity) {
		super(scene, x, y, texture);

		this.scene = scene;
		this.flicker = false;
		this.light = this.scene.lights.addLight(x, y, 200, color, intensity);
		this.scene.physics.world.enable(this);
		this.scene.physics.add.existing(this);
		this.body.setImmovable(true);

		// Add this sprite to the scene
		this.scene.add.existing(this);

		// If you have a sprite sheet, you can create an animation
		// this.scene.anims.create({
		//     key: 'burn',
		//     frames: this.scene.anims.generateFrameNumbers(texture, { start: 0, end: 3 }),
		//     frameRate: 10,
		//     repeat: -1
		// });

		// this.anims.play('burn');

		this.scene.time.addEvent({
			delay: 300, // Flicker every 300 milliseconds
			callback: this.toggleFlicker,
			callbackScope: this,
			loop: true
		});
	}

	toggleFlicker() {
		if (this.flicker) {
			this.light.setIntensity(50);
		} else {
			this.light.setIntensity(10);
		}

		// Toggle the flicker state
		this.flicker = !this.flicker;
	}
}
