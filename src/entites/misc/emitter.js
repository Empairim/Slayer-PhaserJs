// @ts-nocheck
export default class Emitter {
	constructor(scene, x, y, texture, config) {
		this.scene = scene;
		this.x = x;
		this.y = y;
		this.texture = texture;
		this.config = config;
		this.emitter = null;
	}

	createEmitter() {
		this.emitter = this.scene.add.particles(this.x, this.y, this.texture, this.config);
	}
}
