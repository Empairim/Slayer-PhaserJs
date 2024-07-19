// @ts-nocheck
import { ChasingBehavior, SpitterShootingBehavior } from '../../data/enemyBehavior.js';
import Ghoul from './ghoul.js';
import Spitter from './spitter.js';

export default class EnemySpawner {
	//scene is the main scene passed as an argument
	constructor(scene) {
		this.scene = scene;
		this.spawn = this.spawn.bind(this); // bind the spawn function to the instance of the spawner
	}

	spawn() {
		// List of enemy classes, their behaviors, and spawn points
		const enemyClasses = [
			// {
			//   enemyClass: Ghoul,
			//   behaviorClass: ChasingBehavior,
			//   spawnPoint: {
			//     x: Math.floor(Math.random() * 1100),
			//     y: Math.floor(Math.random() * 1000),
			//   },
			// },
			{
				enemyClass: Spitter,
				behaviorClass: SpitterShootingBehavior,

				spawnPoint: {
					x: Math.floor(Math.random() * 800),
					y: Math.floor(Math.random() * 600)
				}
			}
		];

		// Randomly select an enemy class, behavior, and spawn point
		const { enemyClass: EnemyClass, behaviorClass: BehaviorClass, spawnPoint } = enemyClasses[
			Math.floor(Math.random() * enemyClasses.length)
		];

		// Create an instance of the selected enemy class and behavior at the selected spawn point
		const enemy = new EnemyClass(this.scene, spawnPoint.x, spawnPoint.y);
		const behavior = new BehaviorClass(enemy);

		enemy.behavior = behavior;
		enemy.setImmovable(true); //makes the enemy solid
		this.scene.enemies.add(enemy);
	}

	start() {
		this.scene.time.addEvent({
			delay: 2000, // spawn an enemy every 2000ms
			callback: this.spawn, // calls to the function spawn
			callbackScope: this, // scope of the callback is the scene Im passing in so the instance of the spawner is tied to the scene
			loop: false
		});
	}
}
