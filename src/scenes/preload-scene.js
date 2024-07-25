// @ts-nocheck

import Phaser from '../lib/phaser.js';
import { AssetKeys } from '../assets/asset-keys.js';

export class PreloadScene extends Phaser.Scene {
	constructor() {
		//key for the scene and passes Phaser.Scene to the constructor
		super({ key: 'PreloadScene' });
	}

	// Load assets for the scene
	preload() {
		//BACKGROUND ASSETS/////////////////////
		this.load.image('TX_Tileset_Grass', AssetKeys.ENVIORNMENT.BACKGROUND.GRASS);
		this.load.image('TX_Tileset_Wall', AssetKeys.ENVIORNMENT.BACKGROUND.WALL);
		this.load.tilemapTiledJSON('map', AssetKeys.ENVIORNMENT.BACKGROUND.MAP);
		this.load.image('tree', AssetKeys.ENVIORNMENT.BACKGROUND.TREE);
		this.load.image('log', AssetKeys.ENVIORNMENT.BACKGROUND.LOG);
		this.load.image('campfire', AssetKeys.ENVIORNMENT.BACKGROUND.CAMPFIRE);
		this.load.image('woods', AssetKeys.ENVIORNMENT.BACKGROUND.WOODS);
		this.load.image('ground', AssetKeys.ENVIORNMENT.BACKGROUND.GROUND);

		//MOVEMENT ASSETS///////////

		//CHARACTER ASSETS/////////////////////
		this.load.spritesheet('gunner', AssetKeys.CHARACTER.GUNNER.SPRITESHEET, {
			frameWidth: 48,
			frameHeight: 32
		});

		//WEAPON ASSETS/////////////////////
		this.load.image('pistol', AssetKeys.CHARACTER.GUN.PISTOL);
		this.load.image('shotgun', AssetKeys.CHARACTER.GUN.SHOTGUN);
		this.load.image('machine', AssetKeys.CHARACTER.GUN.MACHINE);
		this.load.spritesheet('items', AssetKeys.CHARACTER.AMMOTYPES.AMMO, {
			frameWidth: 16,
			frameHeight: 16
		});

		//BULLET ASSETS/////////////////////
		// this.load.image("wBullet", AssetKeys.BULLETS.WBULLET);
		// this.load.image("bullet", AssetKeys.BULLETS.BULLET);
		//not really needed particle system will handle this for now

		//PARTICLE ASSETS/////////////////////
		this.load.image('wSmoke', AssetKeys.PARTICLES.SMOKE.WSMOKE);
		/////////////////die asset
		this.load.spritesheet('splatter', AssetKeys.PARTICLES.BLOOD.SPLATTER, {
			frameWidth: 140,
			frameHeight: 60
		});
		this.load.spritesheet('flamer', AssetKeys.PARTICLES.FLAME.FLAMER, {
			frameWidth: 96,
			frameHeight: 64
		});

		//SPELL ASSETS/////////////////////
		this.load.spritesheet('fire1', AssetKeys.SPELLS.FIRE.FIRE1, {
			frameWidth: 100,
			frameHeight: 100
		});
		this.load.spritesheet('fire2', AssetKeys.SPELLS.FIRE.FIRE1, {
			frameWidth: 100,
			frameHeight: 100
		});
		this.load.spritesheet('enemyProjectile', AssetKeys.SPELLS.WATER.WATER1, {
			frameWidth: 144,
			frameHeight: 144
		});

		//ENEMY ASSETS/////////////////////
		//ghoul
		this.load.spritesheet('ghoul', AssetKeys.ENIMIES.GHOUL.PNG.WALK, {
			frameWidth: 62,
			frameHeight: 33
		});
		//spitter
		this.load.spritesheet('spitterWalk', AssetKeys.ENIMIES.SPITTER.PNG.WALK, {
			frameWidth: 57,
			frameHeight: 39
		});
		this.load.spritesheet('spitterIdle', AssetKeys.ENIMIES.SPITTER.PNG.IDLE, {
			frameWidth: 57,
			frameHeight: 39
		});
		this.load.spritesheet('spitterAttack', AssetKeys.ENIMIES.SPITTER.PNG.ATTACK, {
			frameWidth: 57,
			frameHeight: 39
		});
		//fill rect method tomake loading screen

		const progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(240, 270, 320, 50);
		const progressBar = this.add.graphics();

		// When the loader emits a 'progress' event, Phaser is telling us that it has updated the loading progress
		this.load.on('progress', (value) => {
			// Clear the previous progress bar
			progressBar.clear();

			// Set a new fill color
			progressBar.fillStyle(0xffffff, 1);

			// Draw the progress bar
			progressBar.fillRect(240, 270, 320 * value, 50);
		});

		// When the loader emits a 'complete' event, Phaser is telling us that all files have finished loading
		this.load.on('complete', () => {
			// Clear the progress bar once loading is complete
			progressBar.clear();
		});
	}
	create() {
		// this.scene.start("UIScene");
		this.scene.start('MainScene');
	}
}
