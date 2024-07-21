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
	createEmitter(scene, enemytype) {
		const particleGraphics = scene.make.graphics();
		particleGraphics.generateTexture(
			enemyType.particleTexture,
			enemyType.particleProperties.size,
			enemyType.particleProperties.size
		);

		this.emitter = scene.add.particles(enemyType.particleTexture).createEmitter({
			...enemyType.emitterProperties,
			ease: 'Sine.easeOut', // Easing of the particles
			blendMode: 'ADD' // Blend mode of the particles
		});

		// Set the emitter to follow the projectile
		this.emitter.startFollow(this);
	}

	fire(x, y, player) {
		this.setPosition(x, y);
		this.setActive(true);
		this.setVisible(true);
		this.scene.physics.moveToObject(this, player, 500);
		// this.createEmitter(this.scene);
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);
		// Handle what happens when the projectile leaves the screen
		if (this.y < 0 || this.y > this.scene.scale.height || this.x < 0 || this.x > this.scene.scale.width) {
			this.setActive(false);
			this.setVisible(false);
			if (this.emitter) {
				this.emitter.stop();
				this.emitter.remove();
				this.emitter = null;
			}
		}
	}
}
