// @ts-nocheck
import Phaser from '../lib/phaser.js';
import EnemyProjectile from '../entites/enemy/enemyProjectiles.js';

class Behavior {
	constructor(enemy) {
		this.enemy = enemy;
	}

	update() {
		// Override this method in subclasses
	}
}

export class ChasingBehavior extends Behavior {
	update(target) {
		const angle = Phaser.Math.Angle.Between(this.enemy.x, this.enemy.y, target.x, target.y);
		this.enemy.body.setVelocity(Math.cos(angle) * this.enemy.speed, Math.sin(angle) * this.enemy.speed);
		this.enemy.flipX = this.enemy.x > target.x;
	}
}

export class SpitterShootingBehavior extends Behavior {
	constructor(enemy, shootInterval) {
		super(enemy);
		this.canShoot = true;

		// Create a group of projectiles
		this.projectiles = this.enemy.scene.physics.add.group({
			classType: EnemyProjectile,
			runChildUpdate: true
		});

		// Listen for animation updates to trigger shooting
		//these are coupled
		//listens for the animation update event then calls the function attached to it "animationUpdate" on this. this is the enemy using this class
		this.enemy.on('animationupdate', this.animationUpdate, this);
		//listens for when the anaimtion is complete and when it does call this function next.
		this.enemy.on('animationcomplete', this.animationComplete, this);
		//this .on is a phaser event listener and its very good for creating custom events like a psuedo state machine
		///
	}

	//THESE METHODS ARE COUPLED
	animationUpdate(animation, frame) {
		if (animation.key === 'spitterAttack' && frame.index === 5) {
			this.shootProjectile(this.enemy.x, this.enemy.y, this.enemy.player);
		}
	}
	animationComplete(animation) {
		if (animation.key === 'spitterAttack') {
			this.enemy.play('spitterIdle', true);
		}
	}
	////////
	update() {
		const player = this.enemy.player;
		const distance = Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, player.x, player.y);

		//check if player is facing the enemy
		const playerFacingEnemy = player.isFacingPoint(this.enemy.x, this.enemy.y);

		// If the player is close, run away
		if (distance < 400 && playerFacingEnemy) {
			this.runAwayFromPlayer(player);
			this.enemy.play('spitterWalk', true);
			// If the player is far away, shoot
		} else if (!playerFacingEnemy) {
			this.followPlayer(player);
			this.enemy.play('spitterWalk', true);
		} else if (distance > 300) {
			if (this.canShoot) {
				// this is a hidden conditonal that if spiterattack is played handleAnimationUpdate will be called and that will call shootProjectile
				this.enemy.play('spitterAttack', true);
			} else {
				this.enemy.body.setVelocity(0, 0);
				this.enemy.play('spitterIdle', true);
			}
		} else {
			this.enemy.body.setVelocity(0, 0);
			this.enemy.play('spitterIdle', true);
		}

		this.updateFlip(player);
	}

	runAwayFromPlayer(player) {
		const angle = Phaser.Math.Angle.Between(this.enemy.x, this.enemy.y, player.x, player.y);
		this.enemy.body.setVelocity(Math.cos(angle) * -this.enemy.speed, Math.sin(angle) * -this.enemy.speed);
	}
	followPlayer(player) {
		const angle = Phaser.Math.Angle.Between(this.enemy.x, this.enemy.y, player.x, player.y);
		this.enemy.body.setVelocity(Math.cos(angle) * this.enemy.speed, Math.sin(angle) * this.enemy.speed);
		this.enemy.flipX = this.enemy.x > player.x;
	}

	updateFlip(player) {
		if (this.enemy.x > player.x) {
			this.enemy.flipX = true;
			this.enemy.body.setOffset(10, 13);
		} else {
			this.enemy.flipX = false;
			this.enemy.body.setOffset(30, 13);
		}
	}

	shootProjectile(x, y, player) {
		if (this.canShoot) {
			const projectile = this.projectiles.get(x, y, 'enemyProjectile');
			if (projectile) {
				projectile.fire(x, y, player);
			}

			this.canShoot = false;

			// Add a delay before the enemy can shoot again
			this.enemy.scene.time.addEvent({
				delay: 5000, // Delay in ms
				callback: () => {
					this.canShoot = true;
				}
			});
		}
	}
}
