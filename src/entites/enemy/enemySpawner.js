// @ts-nocheck
import { ChasingBehavior, SpitterShootingBehavior } from '../../data/enemyBehavior.js';
import Ghoul from './ghoul.js';
import Spitter from './spitter.js';

export default class EnemySpawner {
	constructor(scene) {
		this.scene = scene;
		this.spawn = this.spawn.bind(this);
		this.waveNumber = 1; // Start at wave 1
		this.activeEnemies = []; // Number of enemies currently alive
		this.isSpawning = false; // Flag to check if spawn function is running

		// Base properties for the first wave
		this.baseEnemyCount = 5; // Set the base number of enemies

		// Amount to increase each property per wave
		this.incrementEnemyCount = Math.random() * 2 + 1; // Increase the number of enemies by 1 to 3 each wave
	}

	start() {
		this.spawnWave();
	}
	spawn() {
		// Only spawn a new wave if all enemies from the previous wave are dead
		if (this.activeEnemies.length > 0 || this.isSpawning) {
			return;
		}
		//future check for now
		// if (this.waveNumber > 10) {
		// 	this.scene.scene.start('WinScene');
		// 	return;
		// }
		this.isSpawning = true;

		// Calculate the number of enemies to spawn based on the wave number
		const enemyCount = this.baseEnemyCount + this.incrementEnemyCount * (this.waveNumber - 1);
		let screenWidth = 1200; // replace with your actual screen width
		let screenHeight = 720; // replace with your actual screen height
		let buffer = 100;
		let x, y;

		// Spawn enemies randomly around the screen
		for (let i = 0; i < enemyCount; i++) {
			if (Math.random() < 0.5) {
				// Spawn off-screen from the left or right
				x =
					Math.random() < 0.5
						? Math.floor(Math.random() * buffer) * -1
						: Math.floor(Math.random() * buffer) + screenWidth;
				y = Math.floor(Math.random() * screenHeight);
			} else {
				// Spawn off-screen from the top or bottom
				x = Math.floor(Math.random() * screenWidth);
				y =
					Math.random() < 0.5
						? Math.floor(Math.random() * buffer) * -1
						: Math.floor(Math.random() * buffer) + screenHeight;
			}

			const enemy = new Ghoul(this.scene, x, y);

			this.scene.enemies.add(enemy);
			this.activeEnemies.push(enemy); // Add this line // Increase the number of enemies alive
		}

		this.waveNumber++; // Move to the next wave
		this.spawnTimer.remove(); // Stop the current timer event
		this.isSpawning = false; // Reset
	}

	spawnWave() {
		if (this.enemiesAlive > 0) {
			return;
		}
		this.spawnTimer = this.scene.time.addEvent({
			delay: 2000,
			callback: this.spawn,
			callbackScope: this,
			loop: true
		});
	}

	// Call this method when an enemy dies
	enemyDied(enemy) {
		// Remove the dead enemy from the list of active enemies
		const index = this.activeEnemies.indexOf(enemy);
		if (index > -1) {
			this.activeEnemies.splice(index, 1);
		}

		if (this.activeEnemies.length === 0) {
			// If all enemies are dead, start a new timer event to spawn the next wave after a delay
			this.scene.time.delayedCall(2000, this.spawnWave, [], this);
		}
	}
}
