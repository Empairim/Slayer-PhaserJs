// @ts-nocheck

import Phaser from "../lib/phaser.js";
import Player from "../entites/player.js";
import Bat from "../entites/bat.js";
import Enemy from "../entites/enemy.js";
import Projectile from "../entites/projectiles.js";


export class MainScene extends Phaser.Scene {
    constructor() {
        //key for the scene and passes Phaser.Scene to the constructor
        super({ key: 'MainScene' });
        
    }

// Create things for the scene
    create() {

    //     this.anims.create({
    //     key: 'fire1',
    //     frames: this.anims.generateFrameNumbers('fire1', { start: 0, end: 10 }),
    //     frameRate: 30,
    //     repeat: -1,
    // });

        // Create player
        this.player = new Player(this, 100, 100);
        // Create bat
        this.bat = new Bat(this, 0, 0);
        // Create enemy
        this.enemy = new Enemy(this, 500, 500);
        //input
        this.input.on('pointerdown', this.shootProjectile, this);

        // Create projectiles group
        this.projectiles = []
        
    }
    //shoot
    shootProjectile(pointer) {
    const projectile = new Projectile(this, this.player, pointer);
    this.projectiles.push(projectile);
}

    

    
    
    

    

    // Update things for the scene
    update() { 
         // Update player
        this.player.update();
        // Update bat
        this.bat.update(this.player);
        // Update enemy
        this.enemy.update(this.player);

      // Check for collisions between projectiles and enemies
        this.physics.overlap(this.projectiles, this.enemy, this.hitEnemy, null, this);
    }

    hitEnemy(projectile, enemy) {
    projectile.destroy();
    
    }
}

