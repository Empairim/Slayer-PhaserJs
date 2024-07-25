// @ts-nocheck

export default class Tree extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'woods');

		this.scene = scene;
		scene.add.existing(this);

		// scene.physics.add.existing(this);

		// Set the offset of the physics body to position it at the base of the tree

		// this.body.immovable = true;
		this.setDepth(5);

		// this.setPipeline('Light2D');
		// this.light = this.scene.lights.addLight(this.x, this.y, 50, 0xffffff, 1.5);
		this.postFX.addShadow(0, 0, 0.1, 5, 0x000000, 12, 0.5);
		this.setOrigin(0);
		// this.setDisplaySize(800, 600);
	}
}
