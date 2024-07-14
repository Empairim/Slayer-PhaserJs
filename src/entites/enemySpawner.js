// @ts-nocheck
import Goblin from "./goblin.js";

export default class EnemySpawner {
  //scene is the main scene passed as an argument
  constructor(scene) {
    this.scene = scene;
    this.spawn = this.spawn.bind(this);
  }

  spawn() {
    const x = Math.floor(Math.random() * 800);
    const y = Math.floor(Math.random() * 600);
    const enemy = new Goblin(this.scene, x, y);
    enemy.setImmovable(true);
    this.scene.enemies.add(enemy);
  }

  start() {
    this.scene.time.addEvent({
      delay: 2000, // spawn an enemy every 1000ms
      callback: this.spawn, // calls to the function spawn
      callbackScope: this, // scope of the callback is the scene Im passing in so the instance of the spawner is tied to the scene
      loop: true,
    });
  }
}
