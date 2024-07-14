// @ts-nocheck
import Goblin from "./goblin.js";

export default class EnemySpawner {
  constructor(scene) {
    this.scene = scene;
    this.spawn = this.spawn.bind(this);
  }

  spawn() {
    console.log("this:", this);

    const x = Math.floor(Math.random() * 800);
    const y = Math.floor(Math.random() * 600);
    const enemy = new Goblin(this.scene, x, y);
    enemy.setImmovable(true);
    this.scene.enemies.add(enemy);
  }

  start() {
    this.scene.time.addEvent({
      delay: 5000, // spawn an enemy every 1000ms
      callback: this.spawn,
      callbackScope: this,
      loop: true,
    });
  }
}
