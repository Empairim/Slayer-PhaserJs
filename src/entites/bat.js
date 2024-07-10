// @ts-nocheck

import Phaser from "../lib/phaser.js";
import ElementSystem from "./elementSystem.js";


export default class Bat extends Phaser.Physics.Arcade.Sprite {
   
    constructor(scene, x, y) {
        super(scene, x, y, 'bat');
        this.scene = scene;
        this.scene.add.existing(this);
        // this.scene.physics.world.enable(this); // may not need this
        this.setOrigin(0.5, 0.9);
        this.createAnimations();
        this.elementSystem = new ElementSystem();
        
    }



    update(player) {
        this.x = player.x;
        this.y = player.y;
        this.setElementHotkey();
    switch (this.elementSystem.getElement(this)) {
        case 'fire':
            this.setTint(0xff0000); // Red
            break;
        case 'water':
            this.setTint(0x0000ff); // Blue
            break;
        case 'earth':
            this.setTint(0xA52A2A); // Vibrant Brown
            break;
        case 'air':
            this.setTint(0x00ff00); // Green
            break;
        default:
            this.setTint(0x000000); // Black
            break;
    }
        this.play('bat', true);
        const pointer = this.scene.input.activePointer;
        const angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x, pointer.y);
        this.setRotation(angle);
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'bat',
            frames: this.scene.anims.generateFrameNumbers('bat', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1,
        });
        
    }

   setElementHotkey() {
    const keys = this.scene.input.keyboard.addKeys('ONE,TWO,THREE,FOUR');

    if (Phaser.Input.Keyboard.JustDown(keys.ONE)) {
        this.elementSystem.setElement(this, 'fire');
        console.log("Element set to fire");
    } else if (Phaser.Input.Keyboard.JustDown(keys.TWO)) {
        this.elementSystem.setElement(this, 'water');
        console.log("Element set to water");
    } else if (Phaser.Input.Keyboard.JustDown(keys.THREE)) {
        this.elementSystem.setElement(this, 'earth');
        console.log("Element set to earth");
    } else if (Phaser.Input.Keyboard.JustDown(keys.FOUR)) {
        this.elementSystem.setElement(this, 'air');
        console.log("Element set to air");
    // } else if (Phaser.Input.Keyboard.JustDown(keys.FIVE)) {
    //     this.elementSystem.setElement(this, 'none');
    //     console.log("Element set to none");
    // }
}

   }
}