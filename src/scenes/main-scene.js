// @ts-nocheck

import Phaser from "../lib/phaser.js";
import Player from "../entites/player.js";
import Bat from "../entites/bat.js";
import Enemy from "../entites/enemy.js";


export class MainScene extends Phaser.Scene {
    constructor() {
        //key for the scene and passes Phaser.Scene to the constructor
        super({ key: 'MainScene' });
        
    }

// Create things for the scene
create() {

    // Create player
    this.player = new Player(this, 100, 100);
    this.player.createAnimations();
    this.player.on('animationcomplete', (animation) => {
            this.player.onAnimationComplete(animation);
        });
    // Create bat
    this.bat = new Bat(this, 0, 0);
    this.bat.createAnimations();

    // Create enemy
    this.enemy = new Enemy(this, 500, 500);
    
    
    
}
    

    // Update things for the scene
    update() { 
         // Update player
        this.player.update();
        // Update bat
        this.bat.update(this.player);
        // Update enemy
        this.enemy.update(this.player);
    }

}