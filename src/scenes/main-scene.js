// @ts-nocheck

import Phaser from '../lib/phaser.js';
import Player from '../entites/player/player.js';
import Gat from '../entites/player/gat.js';
import Projectile from '../entites/player/projectiles.js';
import EnemySpawner from '../entites/enemy/enemySpawner.js';
import { AmmoPickup } from '../entites/enemy/enemy.js';
import EnemyProjectile from '../entites/enemy/enemyProjectiles.js';
import Fire from '../entites/misc/fire.js';
import Tree from '../entites/misc/tree.js';
import UI from '../entites/misc/ui.js';
import Emitter, { Effects } from '../entites/misc/emitter.js';
import { AmmoTypes } from '../data/ammoTypes.js';

export class MainScene extends Phaser.Scene {
	constructor() {
		// Key for the scene and passes Phaser.Scene to the constructor
		super({ key: 'MainScene' });
	}

	//PHASER SCENE LIFECYCLE METHODS
	// Create things for the scene
	create() {
		this.emitter = new Emitter(this, 0, 0, 'fire1', Effects.rainConfig);
		this.emitter.runEmitter();
		//Start the UI scene and pass the player to it or any other data
		this.scene.launch('UIScene', { player: this.player, wave: this.enemySpawner });
		this.fpsText = this.add.text(700, 10, '').setDepth(10);

		// Get the game configuration
		// this.cameras.main.setBackgroundColor('#000000');

		const config = this.sys.game.config;

		// Set the world bounds
		this.physics.world.setBounds(0, 0, config.width, config.height);
		// this.rainEmitter = new Emitter(this, 645, 360, 'fire1', Effects.rainConfig);

		//SCENE LIGHTING/AESTHETICS
		const background = this.add.image(0, 0, 'ground').setOrigin(0, 0).setDisplaySize(1000, 800);
		this.cameras.main.setZoom(2);
		this.lights.enable();
		this.lights.setAmbientColor(0x333377); // Very dark blue for the night sky
		this.fire = new Fire(this, 500, 350, 600, 0x990000);
		this.fire2 = new Fire(this, 500, 350, 300, 0xffcc00);
		this.fire2.setVisible(false); //yellow so its not visible but lighting is still there
		this.tree = new Tree(this, 0, 0).setPipeline('Light2D'); // the outer wood area
		let graphics = this.add.graphics();
		graphics.lineStyle(4, 0xffd900, 1);
		graphics.strokeRect(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height);

		// CREATE ANIMATIONS
		this.createAnimations();
		// CREATE UI
		this.ui = new UI(this);
		// CREATE PLAYER
		this.player = new Player(this, 300, 300);
		// this.cameras.main.startFollow(this.player);
		// this.cameras.main.setZoom(1.2); // This will make the game screen appear twice as large or zoomed out

		// CREATE PLAYER HEALTH BAR
		this.playerHealthBar = this.add.graphics({
			fillStyle: { color: 0x00ff00 }
		});

		// CREATE PLAYER COLLISION GROUP
		this.playerCollisionGroup = this.physics.add.group({
			collideWorldBounds: true
		});
		this.playerCollisionGroup.add(this.player);

		// CREATE PROJECTILE GROUP
		this.projectiles = this.physics.add.group({
			classType: Projectile, //class to create new instances of the group
			runChildUpdate: true //automatically calls update on each child in the group
		});
		// CREATE GAT
		this.gat = new Gat(this, 0, 0);
		this.reloadBar = this.add.graphics({ fillStyle: { color: 0xffffff } });

		// CREATE ENEMY COLLISION GROUP
		this.enemySpawner = new EnemySpawner(this);
		this.enemySpawner.start();
		// CREATE ENEMIES GROUP
		this.enemies = this.physics.add.group(); //special phaser array that has physics enabled

		// CREATE ENEMY PROJECTILE GROUP

		// CREATE AMMO PICKUPS GROUP
		this.ammoPickups = this.physics.add.group();
		// When an enemy dies and you create an ammo pickup
		//use player to check current ammo type
		const ammoPickup = new AmmoPickup(this, this.x, this.y, this.player.currentAmmoType);
		this.ammoPickups.add(ammoPickup);
		// MOUSE INPUT
		this.input.setDefaultCursor('crosshair');
		this.input.on('pointerup', this.player.handleCombat.bind(this.player), this);

		// COLLISIONS

		// Add a collider between the enemies group and itself. Efficient way to check for collisions between enemies without having to check each enemy against each other which would be O(n^2)
		this.physics.add.collider(this.enemies, this.enemies);
		//collide so the player can't walk through the enemies
		this.physics.add.collider(
			this.player,
			this.enemies,
			(player, enemy) => {
				enemy.hitPlayer(player);
			},
			null,
			this
		);

		//overlap so the projectile can pass through the enemy
		this.physics.add.overlap(
			this.projectiles,
			this.enemies,
			(projectile, enemy) => {
				projectile.projectileHitEnemy(enemy);
			},
			null,
			this
		);

		// Add overlap between player and ammo pickups
		this.physics.add.collider(this.player, this.ammoPickups, this.player.collectAmmo.bind(this.player), null, this);

		//collider for tree
		this.physics.add.collider(this.player, this.tree);
		this.swapWeaponKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
	}

	// Update things for the scene
	update() {
		// UPDATE PLAYER
		this.player.update();
		this.updatePlayerHealthBar();
		// UPDATE GAT
		this.gat.update(this.player); // Pass player as target to follow

		// UPDATE ENEMIES
		this.enemies.children.iterate((enemy) => {
			enemy.update(this.player); // Pass player as target to follow
		});

		// UPDATE PROJECTILES
		this.projectiles.children.iterate((projectile) => {
			if (projectile && projectile.active) {
				projectile.update();
			}
		});
		// this.enemyProjectiles.children.iterate((projectile) => {
		// 	if (projectile && projectile.active) {
		// 		projectile.update();
		// 	}
		// });
		if (Phaser.Input.Keyboard.JustDown(this.swapWeaponKey)) {
			this.player.swapWeapon();
		}
		this.fpsText.setText('FPS: ' + Math.round(this.game.loop.actualFps));
	}

	// Custom methods usally for testing new features

	//DAMAGE AND HEALTH METHODS
	updatePlayerHealthBar() {
		// Clear the previous health bar
		this.playerHealthBar.clear();

		// Calculate the width and percentage of the health bar
		let healthBarWidth = this.player.health / this.player.maxHealth / 2 * 100;
		let healthPercent = this.player.health / this.player.maxHealth;

		// Change the color of the health bar based on the player's health
		let color;
		if (healthPercent > 0.5) {
			color = 0x00ff00; // Green
		} else if (healthPercent > 0.2) {
			color = 0xffff00; // Yellow
		} else {
			color = 0xff0000; // Red
		}

		// Set the color of the health bar
		this.playerHealthBar.fillStyle(color, 0.5);

		// Draw the health bar
		this.playerHealthBar.fillRect(this.player.x - 25, this.player.y + this.player.height, healthBarWidth, 5);
	}
	// updatePlayerReloadBar() {
	// 	// Clear the previous reload bar
	// 	this.reloadBar.clear();

	// 	// Calculate the reload progress
	// 	const reloadProgress = Math.min((this.time.now - this.player.lastFired) / this.player.fireDelay, 1);

	// 	// Set the color of the reload bar
	// 	this.reloadBar.fillStyle(0xffffff, reloadProgress === 1 ? 1 : 0.2); // Draw the reload bar
	// 	this.reloadBar.fillRect(this.player.x - 10, this.player.y - 13, 100 * reloadProgress / 5, 3);
	// }

	//GAMEPLAY METHODS

	// ANIMATION METHODS
	createAnimations() {
		//ITEMS ANIMATIONS
		this.anims.create({
			key: 'pisolAmmo',
			frames: this.anims.generateFrameNumbers('items', { start: 140, end: 145 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'shotgunAmmo',
			frames: this.anims.generateFrameNumbers('items', { start: 322, end: 331 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'machineAmmo',
			frames: this.anims.generateFrameNumbers('items', { start: 252, end: 261 }),
			frameRate: 10,
			repeat: -1
		});
		// CREATE ENEMY ANIMATIONS

		this.anims.create({
			key: 'die',
			frames: this.anims.generateFrameNumbers('splatter', {
				start: 4,
				end: 0
			}),
			frameRate: 12,
			repeat: 0,
			hideOnComplete: true
		});
		//ghoul
		this.anims.create({
			key: 'ghoul',
			frames: this.anims.generateFrameNumbers('ghoul', { start: 0, end: 8 }),
			frameRate: 3,
			repeat: -1
		});
		//spitter
		this.anims.create({
			key: 'spitterWalk',
			frames: this.anims.generateFrameNumbers('spitterWalk', {
				start: 0,
				end: 4
			}),
			frameRate: 50,
			repeat: -1
		});

		this.anims.create({
			key: 'spitterIdle',
			frames: this.anims.generateFrameNumbers('spitterIdle', {
				start: 0,
				end: 5
			}),
			frameRate: 3,
			repeat: -1
		});

		this.anims.create({
			key: 'spitterAttack',
			frames: this.anims.generateFrameNumbers('spitterAttack', {
				start: 0,
				end: 7
			}),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'enemyProjectile',
			frames: this.anims.generateFrameNumbers('enemyProjectile', {
				start: 0,
				end: 7
			}),
			frameRate: 10,
			repeat: -1
		});
	}
}
