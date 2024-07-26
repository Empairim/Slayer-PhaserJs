// @ts-nocheck
import Phaser from '../../lib/phaser.js';
import { AmmoTypes } from '../../data/ammoTypes.js';
import Emitter, { Effects } from '../misc/emitter.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, behavior) {
		super(scene, x, y, 'enemy');
		this.scene = scene;
		this.player = scene.player;
		//FX
		this.setPipeline('Light2D');

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
		this.hitStun = 0;
		this.damage = 1;
		//Behavioral properties
		this.behavior = behavior;
		this.enemySpawner = scene.enemySpawner; // Pass the EnemySpawner instance to the enemy
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
		this.enemySpawner.enemyDied(this);
	}

	playChaseAnimation() {
		// To be overridden by subclasses for unique animations
	}
	//  ENEMY GAMEPLAY LOGIC
	takeDamage(damage) {
		const actualDamage = Math.floor(Math.random() * (damage.max - damage.min + 1)) + damage.min;
		this.health -= actualDamage / 2; //quick fix since overlapping hitboxes cause double damage
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
	createAmmoPickup() {
		const ammoKeys = Object.keys(AmmoTypes);
		const randomAmmo = ammoKeys[Math.floor(Math.random() * ammoKeys.length)];
		// Create a pickup item for the ammo type
		if (this.active && this.scene) {
			//checks if the enemy is still active and the scene is still running
			const ammoPickup = new AmmoPickup(this.scene, this.x, this.y, randomAmmo);
			ammoPickup.quantity = Phaser.Math.Between(
				AmmoTypes[randomAmmo].quantity.min,
				AmmoTypes[randomAmmo].quantity.max
			); // Set the quantity here
			this.scene.add.existing(ammoPickup);
			this.scene.ammoPickups.add(ammoPickup); // add to main scene
		}
		//Get credit for killing the enemy along with a random amount of ammo
		if (this.active && this.scene) {
			let x = Math.random() * 50;
			let y = Math.random() * 50;
			const creditPickup = new AmmoPickup(this.scene, this.x + x, this.y + y, 'credit');
			creditPickup.quantity = Phaser.Math.Between(
				AmmoTypes['credit'].quantity.min,
				AmmoTypes['credit'].quantity.max
			);
			this.scene.add.existing(creditPickup);
			this.scene.ammoPickups.add(creditPickup);
		}

		this.destroy();
	}

	playDieAnimation() {
		// To be overridden by subclasses if needed
		this.play('die');
		this.body.enable = false;
		this.on('animationcomplete', function(animation) {
			if (animation.key === 'die') {
				this.isDying = false;
				this.createAmmoPickup();
			}
		});
	}
}
//Helper class to create a pickup that will change the player's ammo type
export class AmmoPickup extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, ammoType) {
		if (!AmmoTypes.hasOwnProperty(ammoType)) {
			throw new Error(`Invalid ammo type: ${ammoType}`);
		}
		super(scene, x, y, 'items', AmmoTypes[ammoType].frame);

		this.ammoType = ammoType;
		this.quantity = Phaser.Math.Between(AmmoTypes[ammoType].quantity.min, AmmoTypes[ammoType].quantity.max);

		scene.physics.world.enable(this);
		this.play(AmmoTypes[ammoType].animation);
		this.setScale(2);
		//FX
		this.setPipeline('Light2D');
		this.postFX.addShadow(0, 0, 0.1, 5, 0x000000, 3, 0.9);
		// this.emitter = new Emitter(scene, this.x, this.y, 'wSmoke', Effects.rainConfig);
	}
}
