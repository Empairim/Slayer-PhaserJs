// @ts-nocheck

import Phaser from "../lib/phaser.js";
import Enemy from "../entites/enemy.js";

export default class Goblin extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'goblin');
        this.body.setSize(this.width * 0.3, this.height * 0.3);
        this.body.setOffset(27, 30);
        this.on('animationcomplete', function (animation, frame) {
            if (animation.key === 'goblinDie') {
                this.destroy();
            }
        }, this);
    }

    
    playChaseAnimation() {
        this.play('goblin');
    }

    playDieAnimation() {
        // this.play('goblinDie');
        this.destroy();
    }
}