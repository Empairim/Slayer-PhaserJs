// @ts-nocheck
import Phaser from '../../lib/phaser.js';

export default class EnemyProjectile extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, player, damage) {
		super(scene, x, y);

		this.graphics = scene.add.graphics({ fillStyle: { color: 0xff0000 } });
		this.graphics.x = x;
		this.graphics.y = y;
		this.circle = new Phaser.Geom.Circle(0, 0, 10); //x and y is relative to the graphics object position like a texture
		this.graphics.fillCircleShape(this.circle);
		scene.physics.world.enable(this.graphics);
		this.body = this.graphics.body; // have to enable body first
		this.body.setCircle(this.circle.radius, -5, -7);
		this.player = player;
		this.player = this.scene.player;

		this.damage = damage;
	}
	update() {
		// Create a circle for the projectile
		const projectileCircle = new Phaser.Geom.Circle(this.graphics.x, this.graphics.y, this.circle.radius);

		// Create a rectangle for the player
		const playerRectangle = this.scene.player.getBounds();

		// Check if the projectile circle is intersecting with the player rectangle
		if (Phaser.Geom.Intersects.CircleToRectangle(projectileCircle, playerRectangle)) {
			// If they're intersecting, apply damage and destroy this projectile
			this.hitPlayer(this.player);
		}
	}
	hitPlayer(player) {
		player.takeDamage(this.damage);
		this.graphics.destroy();
	}

	fire(x, y, player) {
		this.setPosition(x, y);
		this.setActive(true);
		this.setVisible(true);
		this.scene.physics.moveToObject(this, this.scene.player, 300);

		// this.createEmitter(this.scene);
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);
		// Handle what happens when the projectile leaves the screen
		if (this.y < 0 || this.y > this.scene.scale.height || this.x < 0 || this.x > this.scene.scale.width) {
			this.setActive(false);
			this.setVisible(true);
			// if (this.emitter) {
			// 	this.emitter.stop();
			// 	this.emitter.remove();
			// 	this.emitter = null;
			// }
		}
	}
}

export class SpreadProjectile extends EnemyProjectile {
	fire(x, y, player) {
		// Implement spread pattern
		this.setPosition(x, y);
		this.setActive(true);
		this.setVisible(true);
		this.scene.physics.moveToObject(this, this.scene.player, 300);
	}
	fire() {
		// Number of projectiles to fire at once
		const numProjectiles = 5;

		// Angle between each projectile
		const angleStep = Math.PI / numProjectiles;

		for (let i = 0; i < numProjectiles; i++) {
			// Create a new projectile
			const projectile = new EnemyProjectile(this.scene, x, y, this.scene.player, this.damage);

			// Calculate the angle for this projectile
			const angle = i * angleStep;

			// Set the velocity of the projectile based on the angle
			this.scene.physics.velocityFromAngle(angle, 300, projectile.body.velocity);

			// Add the projectile to the scene
			this.projectiles.add(projectile);
		}
	}
}

export class SpiralProjectile extends EnemyProjectile {
	fire(x, y, player) {
		// Implement spiral pattern
	}
}

export class BurstProjectile extends EnemyProjectile {
	fire(x, y, player) {
		// Implement burst pattern
	}
}
// export const EnemyTypes = {
// 	spitter: {
// 		//graphics
// 		texture: 'spit',
// 		particleTexture: 'spit',
// 		//combat
// 		damage: { min: 5, max: 8 },
// 		//effects
// 		particleProperties: {
// 			color: 0x00ff00, // Green
// 			size: 1
// 		}
// 	}
// 	// Add more enemy types as needed
// };
