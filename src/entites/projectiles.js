import Phaser from '../lib/phaser.js';

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'projectile');
        this.scene = scene; // so I dont have to pass scene to every method
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
    }

    fire(x, y, angle) {
        this.setPosition(x, y);
        this.setAngle(angle);
        this.scene.physics.velocityFromAngle(angle, 500, this.body.velocity);
    }
}