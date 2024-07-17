// @ts-nocheck

import Phaser from "../lib/phaser.js";
import Player from "../entites/player.js";
import Gat from "../entites/gat.js";
import Projectile from "../entites/projectiles.js";
import EnemySpawner from "../entites/enemySpawner.js";
import { AmmoPickup } from "../entites/enemy.js";

export class MainScene extends Phaser.Scene {
  constructor() {
    // Key for the scene and passes Phaser.Scene to the constructor
    super({ key: "MainScene" });
  }

  //PHASER SCENE LIFECYCLE METHODS
  // Create things for the scene
  create() {
    // Get the game configuration
    const config = this.sys.game.config;

    // Set the world bounds
    this.physics.world.setBounds(0, 0, config.width, config.height);

    // Create background
    // let bg = this.add.image(400, 300, "background");
    // bg.setScale(2);

    // CREATE ANIMATIONS
    this.createAnimations();
    // CREATE PLAYER
    this.player = new Player(this, 100, 100);
    this.playerHealthBar = this.add.graphics({
      fillStyle: { color: 0x00ff00 },
    });

    // CREATE PLAYER COLLISION GROUP
    this.playerCollisionGroup = this.physics.add.group({
      collideWorldBounds: true,
    });
    this.playerCollisionGroup.add(this.player);
    // CREATE PROJECTILE GROUP
    this.projectiles = this.physics.add.group({
      classType: Projectile, //class to create new instances of the group
      runChildUpdate: true, //automatically calls update on each child in the group
    });
    // CREATE GAT
    this.gat = new Gat(this, 0, 0);
    this.reloadBar = this.add.graphics({ fillStyle: { color: 0xffffff } });
    // CREATE ENEMIES GROUP
    this.enemies = this.physics.add.group(); //special phaser array that has physics enabled
    // CREATE ENEMY COLLISION GROUP
    this.enemySpawner = new EnemySpawner(this);
    this.enemySpawner.start();
    // CREATE AMMO PICKUPS GROUP
    this.ammoPickups = this.physics.add.group();

    // When an enemy dies and you create an ammo pickup
    const ammoPickup = new AmmoPickup(this, this.x, this.y);

    this.ammoPickups.add(ammoPickup);
    // MOUSE INPUT
    this.input.setDefaultCursor("crosshair");
    this.input.on(
      "pointerup",
      this.player.handleCombat.bind(this.player),
      this
    );

    // COLLISIONS

    // Add a collider between the enemies group and itself. Efficient way to check for collisions between enemies without having to check each enemy against each other which would be O(n^2)
    this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.collider(
      this.player,
      this.enemies,
      this.hitPlayer,
      null,
      this
    );
    //collide so the player can't walk through the enemies

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
    this.physics.add.collider(
      this.player,
      this.ammoPickups,
      this.player.collectAmmo.bind(this.player),
      null,
      this
    );
  }

  // Update things for the scene
  update() {
    // UPDATE PLAYER
    this.player.update();
    this.updatePlayerHealthBar();
    // UPDATE GAT
    this.gat.update(this.player); // Pass player as target to follow
    this.updatePlayerReloadBar();
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
  }

  // Custom methods

  //DAMAGE AND HEALTH METHODS
  updatePlayerHealthBar() {
    // Clear the previous health bar
    this.playerHealthBar.clear();

    // Calculate the width and percentage of the health bar
    let healthBarWidth = (this.player.health / this.player.maxHealth / 2) * 100;
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
    this.playerHealthBar.fillRect(
      this.player.x - 25,
      this.player.y + this.player.height,
      healthBarWidth,
      5
    );
  }
  updatePlayerReloadBar() {
    // Clear the previous reload bar
    this.reloadBar.clear();

    // Calculate the reload progress
    const reloadProgress = Math.min(
      (this.time.now - this.player.lastFired) / this.player.fireDelay,
      1
    );

    // Set the color of the reload bar
    this.reloadBar.fillStyle(0xffffff, reloadProgress === 1 ? 1 : 0.2); // Draw the reload bar
    this.reloadBar.fillRect(
      this.player.x - 10,
      this.player.y - 13,
      (100 * reloadProgress) / 5,
      3
    );
  }
  //if it gets too complicated factor it out into a separate class
  hitPlayer(player, enemy) {
    player.takeDamage(enemy.damage);
    this.cameras.main.shake(200, 0.005);
  }
  //GAMEPLAY METHODS

  // ANIMATION METHODS
  createAnimations() {
    // CREATE ENEMY ANIMATIONS
    this.anims.create({
      key: "goblin",
      frames: this.anims.generateFrameNumbers("goblin", { start: 0, end: 7 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "die",
      frames: this.anims.generateFrameNumbers("splatter", {
        start: 4,
        end: 0,
      }),
      frameRate: 12,
      repeat: 0,
      hideOnComplete: true,
    });
    this.anims.create({
      key: "ghoul",
      frames: this.anims.generateFrameNumbers("ghoul", { start: 0, end: 8 }),
      frameRate: 5,
      repeat: -1,
    });
  }
}
