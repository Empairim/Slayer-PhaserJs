// @ts-nocheck

export default class Fire extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, radius, color, intensity) {
		super(scene, x, y, 'fire2');

		this.scene = scene;
		// Add the sprite
		scene.add.existing(this);
		// Add a physics body to the sprite
		// scene.physics.add.existing(this);
		// Set the sprite to be immovable
		// this.body.immovable = true;
		this.anims.create({
			key: 'fire2',
			frames: this.anims.generateFrameNumbers('fire2', { start: 0, end: 10 }),
			frameRate: 5,
			repeat: -1
		});
		this.play('fire2');

		this.flicker = false;
		this.light = this.scene.lights.addLight(x, y, radius, color, intensity);
		this.setScale(2);
		this.setRotation(90 * Math.PI / 180);
		this.setDepth(1);
		this.createEmitter(scene);

		this.scene.time.addEvent({
			delay: 500 + Math.random() * 1000, // flicker
			callback: this.toggleFlicker,
			callbackScope: this,
			loop: true
		});
		let delay = Phaser.Math.Between(500, 2000);

		// Add a delayed call to toggleFlicker
		this.scene.time.delayedCall(delay, this.toggleFlicker, [], this);
		const campfire = scene.add.image(x - 10, y, 'campfire');
		campfire.setScale(2);
		campfire.setPipeline('Light2D');
		campfire.postFX.addShadow(0, 0, 0.1, 5, 0x000000, 8, 0.4);

		campfire.setDepth(0);
	}

	createEmitter(scene) {
		this.emitter = scene.add.particles(this.x - 13, this.y - 13, 'fire1', {
			speed: { min: -5, max: 50 },
			angle: { min: -90, max: -45 },
			scale: { start: 0, end: 0.1 },
			blendMode: 'ADD',
			lifespan: 500,
			quantity: 10,
			emitZone: {
				type: 'random',
				source: new Phaser.Geom.Circle(0, 0, 50), // Use a circle as the emit zone
				quantity: 100,
				yoyo: true,
				stepRate: 5,
				seamless: true
			},
			tint: [ 0xff0000, 0xffa500, 0xffff00, 0xffffff ],

			alpha: { start: 0.5, end: 0, ease: 'Expo.easeIn' }
		});
	}

	toggleFlicker() {
		if (this.flicker) {
			this.light.setIntensity(1);
		} else {
			this.light.setIntensity(2);
		}

		// Toggle the flicker state
		this.flicker = !this.flicker;
	}
}
