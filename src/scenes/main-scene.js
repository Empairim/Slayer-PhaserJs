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
        // Create background
        // let bg = this.add.image(400, 300, "background");
        // bg.setScale(2);

    // Create game animations
    this.createAnimations();
    // Create player
    this.player = new Player(this, 100, 100);
    // Create player collision group
    this.playerCollisionGroup = this.physics.add.group({ collideWorldBounds: true });
     this.playerCollisionGroup.add(this.player);
    // Create projectiles group
    this.projectiles = this.physics.add.group({
        classType: Projectile, //class to create new instances of the group
      runChildUpdate: true,//automatically calls update on each child in the group
    });
    // Create Gat
    this.gat = new Gat(this, 0, 0);
    // Create enemies
    this.enemies = this.physics.add.group(); //special phaser array that has physics enabled
    // Create enemy collision group
    this.enemyCollisionGroup = this.physics.add.group();
    for (let i = 0; i < 1; i++) {
      const x = Math.floor(Math.random() * 800);
      const y = Math.floor(Math.random() * 600);
      const enemy = new Goblin(this, x, y);
      enemy.setImmovable(true);
      this.enemies.add(enemy);
      this.enemyCollisionGroup.add(enemy);
    }

    // Add a collider between the enemies group and itself. Efficient way to check for collisions between enemies without having to check each enemy against each other which would be O(n^2)
    this.physics.add.collider(this.enemies, this.enemies);

        // Mouse Input
    this.input.setDefaultCursor('crosshair')
    this.input.on("pointerup", this.player.handleCombat.bind(this.player), this);

    // In the create method
    this.physics.add.overlap(this.projectiles, this.enemyCollisionGroup, this.hitEnemy, null, this);
  
  }

  // Update things for the scene
  update() {
    // Update player
    this.player.update();
    // Update gat
    this.gat.update(this.player); // Pass player as target to follow
       // Update enemies
    this.enemies.children.iterate((enemy) => {
      enemy.update(this.player); // Pass player as target to follow
    });

      // Update projectiles
        this.projectiles.children.iterate((projectile) => {
        projectile.update();
        });
    
    // Check for collisions between projectiles and enemies
      this.physics.world.collide(this.projectiles, this.enemies, this.hitEnemy, null, this);
      
      
  }
    


  // Game methods


  hitEnemy(projectile, enemy) {
      enemy.die();
    projectile.emitter.explode();
    projectile.destroy();
  }

    
    
    // Animation creation
  createAnimations() {
      // Create spell animations
    this.anims.create({
      key: "fire1",
      frames: this.anims.generateFrameNumbers("fire1", { start: 0, end: 10 }),
      frameRate: 30,
      repeat: -1,
    });
  
    this.anims.create({
        key: 'water1_anim', // The name of the animation
        frames: this.anims.generateFrameNumbers('water1', { start: 0, end: -1 }), // Generate frames for all images in the spritesheet
        frameRate: 10, // The speed of the animation
        repeat: -1 // Repeat the animation indefinitely
    });

     
    // Create enemy animations
    this.anims.create({
      key: "goblin",
      frames: this.anims.generateFrameNumbers("goblin", { start: 0, end: 7 }),
      frameRate: 8,
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
  }

}
