// @ts-nocheck
import Phaser from '../../lib/phaser.js';
import Projectile from './projectiles.js';
import { AmmoTypes } from '../../data/ammoTypes.js';
import UI from '../misc/ui.js';
import Emitter from '../misc/emitter.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'idle');
		//phaser Player game properties
		this.scene = scene;
		this.scene.add.existing(this); //add to the scene display list
		this.scene.physics.world.enable(this); //enable physics on creation
		this.body.setCollideWorldBounds(true); //set the player to collide with the world bounds
		this.setScale(2);
		this.body.setSize(this.width * 2 / 3, this.height * 2 / 3);
		// this.body.setOffset(13, 10);

		//FX
		this.setPipeline('Light2D');
		this.postFX.addShadow(0, 0, 0.1, 5, 0x000000, 8, 0.5);
		this.light = this.scene.lights.addLight(this.x, this.y, 5, 0xffffff, 1.3); //add a light to the player

		//create animations and key bindings on creation
		this.createAnimations();
		this.on('animationcomplete', this.onAnimationComplete.bind(this), this); //to check if the animation is complete before doing something else bind it to that specific instance of player
		this.wasdKeys = this.scene.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
			space: Phaser.Input.Keyboard.KeyCodes.SPACE
		});

		//Combat properties
		this.pointer = this.scene.input.activePointer;
		this.lastFired = 0;
		this.damage = 0;
		this.maxHealth = 5;
		this.health = 5;
		this.isInvincible = false;
		this.invincibilityDuration = 1500;
		this.isRolling = false;
		this.speed = 200;
		this.defense = 1;

		//Ammo System
		this.currentAmmoType = 'pistol'; // Default ammo type
		this.ammoInventory = { pistol: 10, shotgun: 10, machine: 10, credit: 0 }; // Default ammo inventory object will provide better speed and memory usage
		this.fireDelay = AmmoTypes[this.currentAmmoType].fireDelay;

		//player ui
		this.ui = new UI(this.scene);
		this.emitter = new Emitter(this.scene, this.x, this.y);
	}
	//MISC METHODS
	//check if player is facing a point can be used for combat or movement checks
	isFacingPoint(pointX, pointY) {
		const angleToPoint = Phaser.Math.Angle.Between(this.x, this.y, pointX, pointY);
		const playerAngle = this.flipX ? Math.PI : 0; // 0 radians if facing right, PI radians if facing left

		// Calculate the angle difference
		const angleDiff = Phaser.Math.Angle.Wrap(angleToPoint - playerAngle);

		// Check if the angle difference is within a certain range (e.g., 90 degrees in radians)
		return Math.abs(angleDiff) < Phaser.Math.DegToRad(90);
	}

	//PLAYER SKILLS ACTIONS TBD IF I WANT TO ADD MORE
	//COMBAT SKILLS
	handleCombat() {
		const currentTime = this.scene.time.now;
		if (this.scene.input.activePointer.isDown && currentTime - this.lastFired > this.fireDelay) {
			// Enough time has passed, the player can fire a projectile
			const distance = Phaser.Math.Distance.Between(this.x, this.y, this.pointer.worldX, this.pointer.worldY);
			if (distance < 20) {
				this.performMeleeAttack();
			} else {
				this.performRangedAttack();
			}
			// Update the lastFired property
			this.lastFired = currentTime;
		}
	}

	performMeleeAttack() {
		//TBD
	}

	performRangedAttack() {
		if (this.ammoInventory[this.currentAmmoType] > 0) {
			const ammoType = AmmoTypes[this.currentAmmoType]; // Use the current ammo type
			// Random damage within the range of the current ammo type
			const damageRange = ammoType.damage;
			this.damage = Math.floor(Math.random() * (damageRange.max - damageRange.min + 1)) + damageRange.min; // Random damage within the range of the current ammo type

			// Convert pointer screen coordinates to world coordinates
			let worldPoint = this.scene.cameras.main.getWorldPoint(this.pointer.x, this.pointer.y);

			// Create a new projectile and add it to the scene
			const projectile = new Projectile(this.scene, this, ammoType);
			this.fireBullet();
			this.scene.projectiles.add(projectile);
			projectile.fire(this, worldPoint, ammoType);
			projectile.update(this);
		}

		// // Check if the player has run out of ammo for the current ammo type and switch to the default ammo type if necessary
		// if (this.ammoInventory[this.currentAmmoType] === 0 && this.currentAmmoType !== 'pistol') {
		// 	this.currentAmmoType = 'pistol'; // Switch back to the default ammo type
		// 	this.fireDelay = AmmoTypes[this.currentAmmoType].fireDelay;
		// 	this.bulletSpeed = AmmoTypes[this.currentAmmoType].bulletSpeed;
		// 	this.damage = AmmoTypes[this.currentAmmoType].damage;
		// 	this.bulletSize = AmmoTypes[this.currentAmmoType].bulletSize;
		// }
		//for now I prefer it not swapping out the ammo type
	}
	//Gun ammo system
	fireBullet() {
		// Check if the player has ammo
		if (this.ammoInventory[this.currentAmmoType] > 0) {
			// Decrement the ammo count
			this.ammoInventory[this.currentAmmoType]--;
		}
	}

	//AMMO PICKUP SYSTEM
	collectAmmo(player, ammoPickup) {
		player.addAmmo(ammoPickup.ammoType, ammoPickup.quantity);
		//add text to show what ammo was picked up then destroy it
		// gonna add graphics to show what ammo is on floor

		// Destroy the ammo pickup after it's collected
		ammoPickup.destroy();
	}

	//AMMO SYSTEM
	addAmmo(ammoTypeKey, quantity) {
		// Get the ammo type from the AmmoTypes object
		console.log('ammoTypeKey:', ammoTypeKey);
		const ammoType = AmmoTypes[ammoTypeKey];
		console.log('AmmoTypes:', AmmoTypes);
		console.log('ammoType:', ammoType);

		// Add ammo to the clip
		const clipSpace = ammoType.clip.size - ammoType.clip.bullets.length;
		const ammoToAddToClip = Math.min(clipSpace, quantity);
		ammoType.clip.bullets = [ ...ammoType.clip.bullets, ...new Array(ammoToAddToClip).fill({}) ];

		// Add remaining ammo to the inventory
		const remainingAmmo = quantity - ammoToAddToClip;
		if (this.ammoInventory[ammoTypeKey]) {
			this.ammoInventory[ammoTypeKey] += remainingAmmo;
		} else {
			this.ammoInventory[ammoTypeKey] = remainingAmmo;
		}
	}

	//AMMO SYSTEM
	changeAmmoType(ammoTypeKey) {
		// Change the current ammo type only if the player has that ammo type in their inventory
		if (this.ammoInventory[ammoTypeKey]) {
			this.currentAmmoType = ammoTypeKey;
		}
	}

	//AMMO SYSTEM
	swapWeapon() {
		// Get the keys of the ammo types
		const ammoKeys = Object.keys(AmmoTypes);

		// Find the index of the current ammo type
		let currentIndex = ammoKeys.indexOf(this.currentAmmoType);

		// Get the index of the next ammo type, wrapping around to the start of the array if necessary
		let nextIndex;
		do {
			currentIndex = (currentIndex + 1) % ammoKeys.length;
			nextIndex = ammoKeys[currentIndex];
		} while (nextIndex === 'credit');

		// Set the current ammo type to the next ammo type
		this.currentAmmoType = nextIndex;

		// Update the fire delay to match the new ammo type
		this.fireDelay = AmmoTypes[this.currentAmmoType].fireDelay;
		//Text above player to show current weapon
		this.weaponText = this.scene.add.text(this.x, this.y - 50, this.currentAmmoType, {
			fontSize: '16px',
			fill: '#ff0000'
		});
		this.weaponText.setAlpha(0.8);
		this.ui.floatingText(this.weaponText);
	}

	updateReloadBar() {
		// Clear the previous reload bar
		this.reloadBar.clear();

		// Calculate the reload progress
		const reloadProgress = Math.min((this.time.now - this.lastReloaded) / this.currentAmmoType.reloadSpeed, 1);

		// Set the color of the reload bar
		this.reloadBar.fillStyle(0xffffff, reloadProgress === 1 ? 1 : 0.2); // Draw the reload bar
		this.reloadBar.fillRect(this.x - 10, this.y - 13, 100 * reloadProgress / 5, 3);
	}

	//PLAYER HEALTH AND DAMAGE SYSTEM////////
	takeDamage(damage) {
		if (!this.isInvincible) {
			this.health -= damage - this.defense;
			this.setTint(0xff0000); // Red
			this.isInvincible = true;

			// Set a timer to remove invincibility after the duration
			setTimeout(() => {
				this.isInvincible = false;
				this.clearTint();
			}, this.invincibilityDuration);
		}
		if (this.health <= 0) {
			this.destroy();
		}
	}

	//MOVEMENT METHODS
	// roll method
	roll() {
		let endX = this.x;
		let endY = this.y;
		let diagSpeed = this.speed / Math.sqrt(2); //speed for diagonal movement is the speed divided by the square root of 2 since the player is moving in two directions at once

		if (this.wasdKeys.up.isDown && this.wasdKeys.right.isDown) {
			// Diagonal roll up-right
			this.play('yRoll', true);
			endX = this.x + diagSpeed;
			endY = this.y - diagSpeed;
		} else if (this.wasdKeys.up.isDown && this.wasdKeys.left.isDown) {
			// Diagonal roll up-left
			this.play('yRoll', true);
			endX = this.x - diagSpeed;
			endY = this.y - diagSpeed;
		} else if (this.wasdKeys.down.isDown && this.wasdKeys.right.isDown) {
			// Diagonal roll down-right
			this.play('xRoll', true);
			endX = this.x + diagSpeed;
			endY = this.y + diagSpeed;
		} else if (this.wasdKeys.down.isDown && this.wasdKeys.left.isDown) {
			// Diagonal roll down-left
			this.play('xRoll', true);
			endX = this.x - diagSpeed;
			endY = this.y + diagSpeed;
		} else if (this.body.velocity.y !== 0) {
			this.play('yRoll', true);
			if (this.body.velocity.y < 0) {
				endY = this.y - this.speed;
				this.setFlipY(false);
			} else {
				endY = this.y + this.speed;
				this.setFlipY(false);
			}
		} else {
			this.play('xRoll', true);
			if (this.flipX) {
				endX = this.x - this.speed;
			} else {
				endX = this.x + this.speed;
			}
		}

		this.isRolling = true;
		this.isInvincible = true; // Set invincibility when rolling starts

		this.scene.tweens.add({
			targets: this,
			x: endX,
			y: endY,
			duration: this.anims.currentAnim.duration,
			ease: 'Cubic.easeOut', // or "Expo.easeOut", or "Sine.easeOut"
			onComplete: () => {
				this.isInvincible = false; // Remove invincibility when roll animation ends
			}
		});
	}

	onAnimationComplete(animation) {
		if (animation.key === 'xRoll' || animation.key === 'yRoll') {
			this.setVelocity(0);
			this.isRolling = false;
			this.setFlipY(false);
			this.play('idle', true);
		}
	}

	// createAnimations() {
	// 	//PLAYER MOVEMENT ANIMATIONS
	// 	//idle
	// 	this.anims.create({
	// 		key: 'idle',
	// 		frames: this.anims.generateFrameNumbers('gunner', { start: 0, end: 5 }), // Adjust frame numbers as needed
	// 		frameRate: 5,
	// 		repeat: -1
	// 	});
	// 	//side walk
	// 	this.anims.create({
	// 		key: 'xwalk',
	// 		frames: this.anims.generateFrameNumbers('gunner', { start: 45, end: 52 }), // Adjust frame numbers as needed
	// 		frameRate: 5,
	// 		repeat: -1
	// 	});
	// 	//up walk
	// 	this.anims.create({
	// 		key: 'uwalk',
	// 		frames: this.anims.generateFrameNumbers('gunner', { start: 45, end: 52 }), // Adjust frame numbers as needed
	// 		frameRate: 5,
	// 		repeat: -1
	// 	});
	// 	//down walk
	// 	this.anims.create({
	// 		key: 'dwWalk',
	// 		frames: this.anims.generateFrameNumbers('gunner', { start: 45, end: 52 }), // Adjust frame numbers as needed
	// 		frameRate: 5,
	// 		repeat: -1
	// 	});

	// 	//horizontal roll
	// 	this.anims.create({
	// 		key: 'xRoll',
	// 		frames: this.anims.generateFrameNumbers('gunner', { start: 63, end: 67 }), // Adjust frame numbers as needed
	// 		frameRate: 9,
	// 		repeat: 0
	// 	});

	// 	//vertical roll
	// 	this.anims.create({
	// 		key: 'yRoll',
	// 		frames: this.anims.generateFrameNumbers('gunner', { start: 63, end: 67 }), // Adjust frame numbers as needed
	// 		frameRate: 9,
	// 		repeat: 0
	// 	});
	// }
	createAnimations() {
		//PLAYER MOVEMENT ANIMATIONS
		//idle
		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('gunnerIdle', { start: 0, end: 1 }), // Adjust frame numbers as needed
			frameRate: 2,
			repeat: -1
		});
		//side walk
		this.anims.create({
			key: 'rwalk',
			frames: this.anims.generateFrameNumbers('gunnerWalk', { start: 8, end: 11 }), // Adjust frame numbers as needed
			frameRate: 5,
			repeat: -1
		});
		this.anims.create({
			key: 'lwalk',
			frames: this.anims.generateFrameNumbers('gunnerWalk', { start: 12, end: 15 }), // Adjust frame numbers as needed
			frameRate: 5,
			repeat: -1
		});
		//up walk
		this.anims.create({
			key: 'uwalk',
			frames: this.anims.generateFrameNumbers('gunnerWalk', { start: 4, end: 7 }), // Adjust frame numbers as needed
			frameRate: 5,
			repeat: -1
		});
		//down walk
		this.anims.create({
			key: 'dwWalk',
			frames: this.anims.generateFrameNumbers('gunnerWalk', { start: 0, end: 3 }), // Adjust frame numbers as needed
			frameRate: 5,
			repeat: -1
		});

		//horizontal roll
		this.anims.create({
			key: 'xRoll',
			frames: this.anims.generateFrameNumbers('gunner', { start: 63, end: 67 }), // Adjust frame numbers as needed
			frameRate: 9,
			repeat: 0
		});

		//vertical roll
		this.anims.create({
			key: 'yRoll',
			frames: this.anims.generateFrameNumbers('gunner', { start: 63, end: 67 }), // Adjust frame numbers as needed
			frameRate: 9,
			repeat: 0
		});
	}

	//UPDATE PLAYERS ACTIONS
	update() {
		if (!this.active) {
			return;
		}
		if (this.wasdKeys.left.isDown && !this.isRolling) {
			this.setVelocityX(-this.speed);
			this.play('lwalk', true);
			this.setFlipX(false);
		} else if (this.wasdKeys.right.isDown && !this.isRolling) {
			this.setVelocityX(this.speed);
			this.play('rwalk', true);
			this.setFlipX(false);
		} else if (this.wasdKeys.up.isDown && !this.isRolling) {
			this.setVelocityY(-this.speed);
			this.play('uwalk', true);
			this.setFlipX(false);
		} else if (this.wasdKeys.down.isDown && !this.isRolling) {
			this.setVelocityY(this.speed);
			this.play('dwWalk', true);
			this.setFlipX(false);
		} else if (
			!this.wasdKeys.left.isDown &&
			!this.wasdKeys.right.isDown &&
			!this.wasdKeys.up.isDown &&
			!this.wasdKeys.down.isDown &&
			!this.isRolling
		) {
			this.setVelocity(0);
			this.play('idle', true);
		}

		if (Phaser.Input.Keyboard.JustDown(this.wasdKeys.space) && !this.isRolling) {
			this.roll();
		}
		this.handleCombat(); // Call the combat handler
		this.light.x = this.x;
		this.light.y = this.y;
	}
}
