// @ts-nocheck

export default class Tree extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'tree');

		this.scene = scene;
		scene.add.existing(this);

		scene.physics.add.existing(this);
		this.body.setSize(this.width / 6, this.height / 6);

		// Set the offset of the physics body to position it at the base of the tree
		this.body.setOffset(190, this.height / 2 + 45);
		this.body.immovable = true;
		this.setDepth(10);

		this.setPipeline('Light2D');
		// this.light = this.scene.lights.addLight(this.x, this.y, 50, 0xffffff, 1.5);
		this.postFX.addShadow(0, 0, 0.1, 5, 0x000000, 12, 0.5);
	}
}
