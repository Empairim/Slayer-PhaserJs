// @ts-nocheck
class Behavior {
	constructor(enemy) {
		this.enemy = enemy;
	}

	update() {
		// Override this method in subclasses
	}
}
//default chasing behavior
export class ChasingBehavior extends Behavior {
	update(target) {
		const angle = Phaser.Math.Angle.Between(this.enemy.x, this.enemy.y, target.x, target.y);
		this.enemy.body.setVelocity(Math.cos(angle) * this.enemy.speed, Math.sin(angle) * this.enemy.speed);
		this.enemy.flipX = this.enemy.x > target.x;
	}
}
//spitter shooting behavior

// Spitter shooting behavior
export class SpitterShootingBehavior extends Behavior {
	constructor(enemy, projectileClass, shootInterval) {
		super(enemy);
		this.projectileClass = projectileClass;
		this.shootInterval = shootInterval;
		this.lastShotTime = 0;
	}

	update(time) {
		const player = this.enemy.player;
		const distance = Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, player.x, player.y);

		if (distance > 400) {
			// Enemy moves towards player
			const angle = Phaser.Math.Angle.Between(this.enemy.x, this.enemy.y, player.x, player.y);
			this.enemy.body.setVelocity(Math.cos(angle) * this.enemy.speed, Math.sin(angle) * this.enemy.speed);
			this.enemy.play('spitterWalk', true);
		} else if (distance < 200) {
			// Enemy moves away from player
			const angle = Phaser.Math.Angle.Between(this.enemy.x, this.enemy.y, player.x, player.y);
			this.enemy.body.setVelocity(Math.cos(angle) * -this.enemy.speed, Math.sin(angle) * -this.enemy.speed);
			this.enemy.play('spitterWalk', true);
		} else if (time > this.lastShotTime + this.shootInterval) {
			// Enemy shoots at player
			this.enemy.body.setVelocity(0); // Stop moving when attacking
			this.enemy.play('spitterAttack', true);
			new this.projectileClass(this.enemy.scene, this.enemy.x, this.enemy.y);
			this.lastShotTime = time;
		} else {
			// Enemy idles
			this.enemy.body.setVelocity(0);
			this.enemy.play('spitterIdle', true);
		}

		// Flip the enemy to face the player
		if (this.enemy.x > player.x) {
			this.enemy.flipX = true;
			this.enemy.body.setOffset(10, 13); // Adjust these values based on your sprite dimensions
		} else {
			this.enemy.flipX = false;
			this.enemy.body.setOffset(30, 13); // Adjust these values based on your sprite dimensions
		}
	}
}
