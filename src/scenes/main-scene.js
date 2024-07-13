// @ts-nocheck

import Phaser from "../lib/phaser.js";
import Player from "../entites/player.js";
import Gat from "../entites/gat.js";
import Goblin from "../entites/goblin.js";
import Projectile from "../entites/projectiles.js";

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
    console.log("World bounds set:", this.physics.world.bounds);

    // Create background
    // let bg = this.add.image(400, 300, "background");
    // bg.setScale(2);

    // CREATE ANIMATIONS
    this.createAnimations();
    // CREATE PLAYER
    this.player = new Player(this, 100, 100);
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
    // CREATE ENEMIES
    this.enemies = this.physics.add.group(); //special phaser array that has physics enabled
    // CREATE ENEMY COLLISION GROUP
    this.enemyCollisionGroup = this.physics.add.group();
    for (let i = 0; i < 2; i++) {
      const x = Math.floor(Math.random() * 800);
      const y = Math.floor(Math.random() * 600);
      const enemy = new Goblin(this, x, y);
      enemy.setImmovable(true);
      this.enemies.add(enemy);
      this.enemyCollisionGroup.add(enemy);
    }

    // Add a collider between the enemies group and itself. Efficient way to check for collisions between enemies without having to check each enemy against each other which would be O(n^2)
    this.physics.add.collider(this.enemies, this.enemies);

    // MOUSE INPUT
    this.input.setDefaultCursor("crosshair");
    this.input.on(
      "pointerup",
      this.player.handleCombat.bind(this.player),
      this
    );

    // In the create method
    this.physics.add.overlap(
      this.projectiles,
      this.enemyCollisionGroup,
      this.hitEnemy,
      null,
      this
    );
  }

  // Update things for the scene
  update() {
    // UPDATE PLAYER
    this.player.update();
    // UPDATE GAT
    this.gat.update(this.player); // Pass player as target to follow
    // UPDATE ENEMIES
    this.enemies.children.iterate((enemy) => {
      enemy.update(this.player); // Pass player as target to follow
    });

    // UPDATE PROJECTILES
    this.projectiles.children.iterate((projectile) => {
      projectile.update();
    });

    // Check for collisions between projectiles and enemies
    this.physics.world.collide(
      this.projectiles,
      this.enemies,
      this.hitEnemy,
      null,
      this
    );
  }

  // Custom methods

  hitEnemy(projectile, enemy) {
    enemy.takeDamage(projectile.damage);
    projectile.emitter.explode();
    projectile.destroy();
  }

  // ANIMATION METHODS
  createAnimations() {
    // Create spell animations
    this.anims.create({
      key: "fire1",
      frames: this.anims.generateFrameNumbers("fire1", { start: 0, end: 10 }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "water1_anim", // The name of the animation
      frames: this.anims.generateFrameNumbers("water1", { start: 0, end: -1 }), // Generate frames for all images in the spritesheet
      frameRate: 10, // The speed of the animation
      repeat: -1, // Repeat the animation indefinitely
    });

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
  }
}
