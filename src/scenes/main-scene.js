// @ts-nocheck

import Phaser from "../lib/phaser.js";
import Player from "../entites/player.js";
import Bat from "../entites/bat.js";
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
    // Create player
    this.player = new Player(this, 100, 100);
    // Create player collision group
    this.playerCollisionGroup = this.physics.add.group();
    this.playerCollisionGroup.add(this.player);

    // Create spell animations
    this.anims.create({
      key: "fire1",
      frames: this.anims.generateFrameNumbers("fire1", { start: 0, end: 10 }),
      frameRate: 30,
      repeat: -1,
    });

    // Create bat
    this.bat = new Bat(this, 0, 0);

    // Create enemy animations
    this.anims.create({
      key: "goblin",
      frames: this.anims.generateFrameNumbers("goblin", { start: 0, end: 7 }),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: "goblinDie",
      frames: this.anims.generateFrameNumbers("goblinDie", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: 0,
    });

    // Create enemies
    this.enemies = this.physics.add.group(); //special phaser array that has physics enabled
    // Create enemy collision group
    this.enemyCollisionGroup = this.physics.add.group();
    for (let i = 0; i < 10; i++) {
      const x = Math.floor(Math.random() * 800);
      const y = Math.floor(Math.random() * 600);
      const enemy = new Goblin(this, x, y);
      enemy.setImmovable(true);
      this.enemies.add(enemy);
      this.enemyCollisionGroup.add(enemy);
    }

    // Add a collider between the enemies group and itself. Efficient way to check for collisions between enemies without having to check each enemy against each other which would be O(n^2)
    this.physics.add.collider(this.enemies, this.enemies);

    // Input
    this.input.on("pointerdown", this.shootProjectile, this);

    // Create projectiles group
    this.projectiles = this.physics.add.group({
        classType: Projectile, //class to create new instances of the group
      runChildUpdate: true,//automatically calls update on each child in the group
    }); //special phaser array that has physics enabled
  }

  // Update things for the scene
  update() {
    // Update player
    this.player.update();
    // Update bat
    this.bat.update(this.player); // Pass player as target to follow
    // Update enemies
    this.enemies.children.iterate((enemy) => {
      enemy.update(this.player); // Pass player as target to follow
    });
    // Check for collisions between projectiles and enemies
    this.projectiles.children.iterate((projectile) => {
      this.enemies.children.iterate((enemy) => {
        this.physics.collide(projectile, enemy, this.hitEnemy, null, this);
      });
    });
  }

  // Game methods
  shootProjectile(pointer) {
    const projectile = this.projectiles.get(
      this.player.x,
      this.player.y,
      "projectile"
    );
    if (projectile) {
      projectile.fire(this.player, pointer);
      this.physics.add.collider(
        this.projectiles,
        this.enemyCollisionGroup,
        this.hitEnemy,
        null,
        this
      );
    }
  }

  hitEnemy(projectile, enemy) {
    enemy.die();
    projectile.destroy();
  }
}
