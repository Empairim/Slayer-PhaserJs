// @ts-nocheck
import Phaser from '../../lib/phaser.js';
import { AmmoTypes } from '../../data/ammoTypes.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, behavior) {
		super(scene, x, y, 'enemy');
		this.scene = scene;
		this.player = scene.player;

		// Enable physics and scale
		this.scene.physics.world.enable(this);
		this.setScale(2);
		this.body.setCollideWorldBounds(true);
		// Add the enemy to the scene
		this.scene.add.existing(this);
		this.isAlive = true;
		this.isDying = false;
		this.setBounce(0);
		this.playChaseAnimation();

		//Health and damage system
		this.health = 100;
		this.speed = 100;
		this.defense = 1;
		this.state = 'normal';
		this.hitStun = 100;
		this.damage = 1;
		//Behavioral properties
		this.behavior = behavior;
	}

	// Update the enemy
	update(time, player) {
		if (this.isDying) {
			return;
		}
		if (this.state === 'hitStun') {
			return;
		}

		this.behavior.update(time, player);
	}
	//ENEMY ANIMATIONS
	die() {
		this.isAlive = false;
		this.isDying = true; // Add this line
		this.playDieAnimation();
	}

	playChaseAnimation() {
		// To be overridden by subclasses for unique animations
	}

	playDieAnimation() {
		// To be overridden by subclasses if needed
		this.play('die');
		this.body.enable = false;
		this.on(
			'animationcomplete',
			function(animation) {
				if (animation.key === 'die') {
					this.isDying = false;
					const ammoKeys = Object.keys(AmmoTypes);
					const randomAmmo = ammoKeys[Math.floor(Math.random() * ammoKeys.length)];
					// Create a pickup item for the ammo type
					if (this.active && this.scene) {
						//checks if the enemy is still active and the scene is still running
						const ammoPickup = new AmmoPickup(this.scene, this.x, this.y, randomAmmo);
						this.scene.add.existing(ammoPickup);
						this.scene.ammoPickups.add(ammoPickup); // add to main scene
						this.destroy();
					}
				}
			},
			this
		);
	}

	//  ENEMY GAMEPLAY LOGIC
	takeDamage(damage) {
		const actualDamage = Math.floor(Math.random() * (damage.max - damage.min + 1)) + damage.min;
		this.health -= actualDamage;
		if (this.health <= 0) {
			this.die();
		} else {
			this.setTint(0x000000); // Set the enemy to red
			this.state = 'hitStun';
			this.body.setVelocity(0, 0); // Stop the enemy
			this.scene.time.delayedCall(this.hitStun, () => {
				this.state = 'normal';
				this.clearTint(); // Clear the red tint
			});
		}
		return actualDamage;
	}
	hitPlayer(player) {
		player.takeDamage(this.damage);
		this.scene.cameras.main.shake(200, 0.005);
	}
}
//Helper class to create a pickup that will change the player's ammo type
export class AmmoPickup extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, ammoType) {
		super(scene, x, y, 'ammoPickup');
		this.ammoType = ammoType;
		scene.physics.world.enable(this);
	}
}