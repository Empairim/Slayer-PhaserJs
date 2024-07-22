// @ts-nocheck
import { ChasingBehavior, SpitterShootingBehavior } from '../../data/enemyBehavior.js';
import Ghoul from './ghoul.js';
import Spitter from './spitter.js';

export default class EnemySpawner {
	constructor(scene) {
		this.scene = scene;
		this.spawn = this.spawn.bind(this);
		this.waveNumber = 1; // Start at wave 1
		this.enemiesAlive = 0; // Number of enemies currently alive

		// Base properties for the first wave
		this.baseEnemyCount = 5; // Set the base number of enemies

		// Amount to increase each property per wave
		this.incrementEnemyCount = 2; // Increase the number of enemies by 2 each wave
	}

	spawn() {
		// Only spawn a new wave if all enemies from the previous wave are dead
		if (this.enemiesAlive > 0) {
			return;
		}

		// Calculate the number of enemies to spawn based on the wave number
		const enemyCount = this.baseEnemyCount + this.incrementEnemyCount * (this.waveNumber - 1);

		for (let i = 0; i < enemyCount; i++) {
			const enemyClasses = [
				{
					enemyClass: Ghoul,
					behaviorClass: ChasingBehavior,
					spawnPoint: {
						x: Math.floor(Math.random() * 1200),
						y: Math.floor(Math.random() * 1000)
					}
				}
				// Add more enemy classes here
			];

			const { enemyClass: EnemyClass, behaviorClass: BehaviorClass, spawnPoint } = enemyClasses[
				Math.floor(Math.random() * enemyClasses.length)
			];

			const enemy = new EnemyClass(this.scene, spawnPoint.x, spawnPoint.y);
			const behavior = new BehaviorClass(enemy);

			enemy.behavior = behavior;
			enemy.setImmovable(true);
			this.scene.enemies.add(enemy);
			this.enemiesAlive++; // Increase the number of enemies alive
		}

		this.waveNumber++; // Move to the next wave
	}

	start() {
		this.scene.time.addEvent({
			delay: 2000,
			callback: this.spawn,
			callbackScope: this,
			loop: true
		});
	}

	// Call this method when an enemy dies
	enemyDied() {
		this.enemiesAlive--; // Decrease the number of enemies alive
		console.log('Enemy died. Enemies alive:', this.enemiesAlive);
	}
}
