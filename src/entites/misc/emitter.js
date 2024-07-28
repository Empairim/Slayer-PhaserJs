// @ts-nocheck
export default class Emitter {
	constructor(scene, x, y, texture, config) {
		this.scene = scene;
		(this.x = { min: 0, max: this.scene.cameras.main.width }), (this.y = y);
		this.texture = texture;
		this.config = config;
		this.emitter = null;
		this.runEmitter();
	}

	runEmitter() {
		this.emitter = this.scene.add.particles(this.x, this.y, this.texture, this.config);
	}
}

export const Effects = {
	rainConfig: {
		lifespan: 100,
		speedY: { min: 20, max: 20 },
		speedX: { min: -30, max: 30 }, // Add this line

		speed: { min: -5, max: 50 },
		angle: { min: -90, max: -45 },
		scale: { start: 0, end: 0.1 },
		quantity: 1,
		blendMode: 'ADD',

		emitZone: {
			type: 'random',
			source: new Phaser.Geom.Circle(0, 0, 50), // Use a circle as the emit zone
			quantity: 10,
			yoyo: false,
			stepRate: 1,
			seamless: true
		}
	},
	fogConfig: {
		lifespan: 10000, // Fog particles last for a long time
		speedY: { min: 10000, max: 20000 }, // Fog moves slowly
		scale: { start: 1, end: 1 }, // Fog particles stay the same size
		quantity: 1, // Create one fog particle at a time
		alpha: { start: 0.1, end: 0 }, // Fog particles start semi-transparent and fade out
		blendMode: 'NORMAL' // Use normal blending mode
	}
};
