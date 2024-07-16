// @ts-nocheck
import Goblin from "./goblin.js";

export default class EnemySpawner {
  //scene is the main scene passed as an argument
  constructor(scene) {
    this.scene = scene;
    this.spawn = this.spawn.bind(this); // bind the spawn function to the instance of the spawner
  }

  spawn() {
    const x = Math.floor(Math.random() * 1000); //spawn off screen
    const y = Math.floor(Math.random() * 800);
    const enemy = new Goblin(this.scene, x, y);
    enemy.setImmovable(true); //makes the enemy solid
    this.scene.enemies.add(enemy);
  }

  start() {
    this.scene.time.addEvent({
      delay: 2000, // spawn an enemy every 2000ms
      callback: this.spawn, // calls to the function spawn
      callbackScope: this, // scope of the callback is the scene Im passing in so the instance of the spawner is tied to the scene
      loop: true,
    });
  }
}
