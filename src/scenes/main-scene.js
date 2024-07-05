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
    /////////////////PHASER METHODS//////////////////////////////////////////
// Create things for the scene
    create() {
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
   

    // Update things for the scene
    update() { 
         // Update player
        this.player.update();
        // Update bat
        this.bat.update(this.player);// pass player as target to follow
        // Update enemy
        if (this.enemy.isAlive) {
            this.enemy.update(this.player);// pass player as target to follow
        }
      // Check for collisions between projectiles and enemies
        this.physics.collide(this.projectiles, this.enemy, this.hitEnemy, null, this);
    }

    ////////////////GAMES METHODS///////////////////////////////////////////
    shootProjectile(pointer) {
    const projectile = new Projectile(this, this.player, pointer);
    this.projectiles.push(projectile);
    }

    hitEnemy(projectile, enemy) {
        enemy.die();
        projectile.destroy();
           
        }
   
    
    

}

