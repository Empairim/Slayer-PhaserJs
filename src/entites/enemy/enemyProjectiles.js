// @ts-nocheck
import Phaser from '../../lib/phaser.js';

export default class EnemyProjectile extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'enemyProjectile');
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setActive(false);
		this.setVisible(false);
	}

	fire(x, y, player) {
		this.setPosition(x, y);
		this.setActive(true);
		this.setVisible(true);
		this.scene.physics.moveToObject(this, player, 300);
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);
		// Handle what happens when the projectile leaves the screen
		if (this.y < 0 || this.y > this.scene.scale.height || this.x < 0 || this.x > this.scene.scale.width) {
			this.setActive(false);
			this.setVisible(false);
		}
	}
}
