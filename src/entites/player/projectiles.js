// @ts-nocheck

import Phaser from '../../lib/phaser.js';

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, player, ammoType) {
		super(scene, player.x, player.y, ammoType.particleTexture);
		this.hitEnemies = new Set();
		// Create a graphics object
		const graphics = scene.make.graphics();
		graphics.fillStyle(ammoType.particleProperties.color, 1); // Set the color of the bullet to the color of the ammo type
		graphics.fillRect(ammoType.bulletSize.width, ammoType.bulletSize.height);

		// Generate a texture from the graphics object
		graphics.generateTexture(ammoType.particleTexture, ammoType.bulletSize.width, ammoType.bulletSize.height);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.visible = false; //hide the projectile but keep its body
		this.setOrigin(0.5, 0.5); //set the origin to the center of the projectile

		// Set the projectile to collide with the world bounds
		this.body.checkCollision = true;
		this.body.onWorldBounds = true;
		this.body.collideWorldBounds = true;

		// Set the size of the projectile's image
		this.setScale(ammoType.bulletSize.width / this.width, ammoType.bulletSize.height / this.height);

		// Set the size of the projectile's physics body
		this.body.setSize(ammoType.bulletSize.width, ammoType.bulletSize.height);

		this.createEmitter(scene, ammoType); //will be used for "bullet" visual effects
		this.emitter.setVisible(true);
		//Bullet combat properties
		this.ammoType = ammoType;
		this.damage = ammoType.damage;
		this.speed = ammoType.bulletSpeed;
		this.penetrates = ammoType.penetrates;
		this.lifespan = ammoType.lifespan;
		this.creationTime = this.scene.time.now;

		//FX
		this.setPipeline('Light2D');
		this.postFX.addShadow(0, 0, 0.1, 5, 0x000000, 12, 0.5);

		scene.sys.updateList.add(this);
	}

	createEmitter(scene, ammoType) {
		const particleGraphics = scene.make.graphics();
		particleGraphics.generateTexture(
			ammoType.particleTexture,
			ammoType.particleProperties.size,
			ammoType.particleProperties.size
		);

		this.emitter = scene.add.particles(this.x, this.y, ammoType.particleTexture, {
			...ammoType.emitterProperties,
			// ease: 'Sine.easeOut', // Easing of the particles
			blendMode: 'ADD', // Blend mode of the particles
			alpha: { start: 1, end: 0, ease: 'Expo.easeIn' }, // Alpha value decreases over time
			emitZone: { source: new Phaser.Geom.Circle(0, 0, 25) }
		});
		this.emitter.setDepth(0); // Set a higher z-index for the emitter

		// Set the emitter to follow the projectile
	}

	fire(player, pointer, ammoType) {
		// Calculate the offset for the starting position of the projectile

		const offsetX = player.flipX ? -23 : 23;
		const offsetY = 22;

		// Set the position of the projectile to the end of the gun's barrel
		this.setPosition(player.x + offsetX, player.y + offsetY);
		let direction = new Phaser.Math.Vector2(pointer.x - player.x, pointer.y - player.y);
		direction.normalize();

		this.body.velocity.x = direction.x * this.speed;
		this.body.velocity.y = direction.y * this.speed;

		// Calculate the angle in degrees and set the projectile's angle
		const angle = Phaser.Math.RadToDeg(Math.atan2(direction.y, direction.x));
		this.setAngle(angle);
		this.light = this.scene.lights.addLight(this.x, this.y, 200, 0xffff00, 0.5);
		this.setTexture(ammoType.particleTexture);
		this.setDepth(1);
	}

	destroyProjectile() {
		this.body.collideWorldBounds = false;
		if (this.emitter) {
			this.emitter.explode(); // Destroy the emitter when the projectile is destroyed
		}
		this.destroy();
	}
	projectileHitEnemy(enemy) {
		// Check if the enemy has already been hit by this bullet
		if (this.hitEnemies.has(enemy)) {
			// The enemy has already been hit, so don't apply damage again
			return;
		}
		const actualDamage = enemy.takeDamage(this.damage);
		this.scene.cameras.main.shake(this.ammoType.screenShake.duration, this.ammoType.screenShake.intensity);
		let damageText = this.scene.add.text(enemy.x, enemy.y, actualDamage, {
			color: '#ff0000'
		});
		damageText.setDepth(1); // Set a higher z-index for the text object
		this.scene.tweens.add({
			targets: damageText,
			y: enemy.y - 50,
			duration: 1000,
			ease: 'Power1',
			onComplete: () => {
				damageText.destroy(); // Destroy the text object when the animation completes
			}
		});
		this.emitter.explode();
		if (!this.penetrates) {
			this.destroyProjectile();
		}

		// The enemy has not been hit yet, so apply damage and add the enemy to the list of hit enemies
		enemy.takeDamage(this.damage);
		this.hitEnemies.add(enemy);
	}
	update() {
		this.emitter.setPosition(this.x, this.y);
		// Set the emitter to follow the projectile
		if (this.body) {
			const angle = Phaser.Math.RadToDeg(Math.atan2(this.body.velocity.y, this.body.velocity.x));
			//math.atan2 returns the angle in radians, so we convert it to degrees, we pass y first because it's the vertical axis to the x horizontal axis to get the angle.
			this.emitter.setAngle(angle);
			//then pass that angle to the emitter
		}
		if (this.light) {
			this.light.x = this.x;
			this.light.y = this.y;
		}
		const elapsed = this.scene.time.now - this.creationTime;
		if (elapsed >= this.lifespan) {
			this.destroyProjectile();
		}
	}
}
