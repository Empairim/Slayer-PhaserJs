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
			frameRate: 10,
			repeat: -1
		});
		this.play('fire2');

		this.flicker = false;
		this.light = this.scene.lights.addLight(x, y, radius, color, intensity);
		this.setScale(2);
		this.setRotation(90 * Math.PI / 180);
		this.createEmitter(scene);

		this.scene.time.addEvent({
			delay: 500 + Math.random() * 1000, // flicker
			callback: this.toggleFlicker,
			callbackScope: this,
			loop: true
		});
		this.toggleFlicker();
		// const graphics = scene.add.graphics();

		// // Set the fill color to brown
		// graphics.fillStyle(0x8b4513);

		// // Draw a rectangle under the fire
		// graphics.fillRect(x - 20, y + 20, 20, 10);
		const log = scene.add.image(x - 10, y + 25, 'log');
		log.setScale(1);
		log.setPipeline('Light2D');
	}

	createEmitter(scene) {
		this.emitter = scene.add.particles(this.x, this.y, 'fire1', {
			speed: { min: -5, max: 100 },
			angle: { min: -90, max: -45 },
			scale: { start: 0, end: 0.1 },
			blendMode: 'ADD',
			lifespan: 1000,
			quantity: 10,
			emitZone: {
				type: 'random',
				source: new Phaser.Geom.Circle(0, 0, 50), // Use a circle as the emit zone
				quantity: 100,
				yoyo: false,
				stepRate: 0,
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
