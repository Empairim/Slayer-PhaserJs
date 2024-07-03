// @ts-nocheck

import Phaser from "../lib/phaser.js";
import { AssetKeys } from "../assets/asset-keys.js";


export class PreloadScene extends Phaser.Scene {
    constructor() {
        //key for the scene and passes Phaser.Scene to the constructor
        super({ key: 'PreloadScene' });
        
    }

    // Load assets for the scene
    preload() {
        //side roll
        this.load.spritesheet('xRoll', AssetKeys.CHARACTER.MOVEMENT.XROLL, { frameWidth: 64, frameHeight: 64 });
        //up roll
        this.load.spritesheet('yRoll', AssetKeys.CHARACTER.MOVEMENT.YROLL, { frameWidth: 64, frameHeight: 64 });
        //down walk
        this.load.spritesheet('dwWalk', AssetKeys.CHARACTER.MOVEMENT.DWWALK, { frameWidth: 64, frameHeight: 64 });
        //up walk
        this.load.spritesheet('upWalk', AssetKeys.CHARACTER.MOVEMENT.UPWALK, { frameWidth: 64, frameHeight: 64 });
        //side walk
        this.load.spritesheet('xWalk', AssetKeys.CHARACTER.MOVEMENT.XWALK, { frameWidth: 64, frameHeight: 64 });
        //idle
    this.load.spritesheet('idle', AssetKeys.CHARACTER.MOVEMENT.IDLE, { frameWidth: 64, frameHeight: 64 });
}

// Create things for the scene
create() {

    //wasd keys
    this.wasdKeys = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });

    //will cause types error but can be ignores just from the phaser ts config file in types folder meh -shrug- ;) Ill just put a no types check up top

    //Rolling Check
   




    //idle
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 11 }), // Adjust frame numbers as needed
        frameRate: 3,
        repeat: -1
    });
    //side walk
    this.anims.create({
        key: 'xwalk',
        frames: this.anims.generateFrameNumbers('xWalk', { start: 0, end: 5 }), // Adjust frame numbers as needed
        frameRate: 10,
        repeat: -1
    });
    //up walk
    this.anims.create({
        key: 'uwalk',
        frames: this.anims.generateFrameNumbers('upWalk', { start: 0, end: 5 }), // Adjust frame numbers as needed
        frameRate: 10,
        repeat: -1
    });
    //down walk
     this.anims.create({
        key: 'dwWalk',
        frames: this.anims.generateFrameNumbers('dwWalk', { start: 0, end: 5 }), // Adjust frame numbers as needed
        frameRate: 10,
        repeat: -1
    });

    //horizontal roll
    this.anims.create({
        key: 'xRoll',
        frames: this.anims.generateFrameNumbers('xRoll', { start: 0, end: 6 }), // Adjust frame numbers as needed
        frameRate: 10,
        repeat: 0
    });

    //vertical roll
    this.anims.create({
        key: 'yRoll',
        frames: this.anims.generateFrameNumbers('yRoll', { start: 0, end: 6 }), // Adjust frame numbers as needed
        frameRate: 10,
        repeat: 0
    })

    this.player = this.physics.add.sprite(100, 100, 'idle').setScale(2);//scale the sprite
     this.player.isRolling = false;
}
    

    // Update things for the scene
    update() { 
        const cursors = this.input.keyboard.createCursorKeys();
        

        //left
    if ((cursors.left.isDown || this.wasdKeys.left.isDown) && !this.player.isRolling) {
        this.player.setVelocityX(-160);
        this.player.play('xwalk', true);
        this.player.setFlipX(true);
        //right
    } else if ((cursors.right.isDown || this.wasdKeys.right.isDown) && !this.player.isRolling) {
        this.player.setVelocityX(160);
        this.player.play('xwalk', true);
        this.player.setFlipX(false);
        //up
    } else if ((cursors.up.isDown || this.wasdKeys.up.isDown) && !this.player.isRolling) {
        this.player.setVelocityY(-160);
        this.player.play('uwalk', true);
        this.player.setFlipX(false);
        //down
    } else if ((cursors.down.isDown || this.wasdKeys.down.isDown) && !this.player.isRolling) {
        this.player.setVelocityY(160);
        this.player.play('dwWalk', true);
        this.player.setFlipX(true);
        
        }
        //idle
    if (!cursors.left.isDown && !cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown && !this.player.isRolling) {
        this.player.setVelocity(0);
        this.player.play('idle', true);
    }

       //space/roll
   if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.player.isRolling) {
    let endX = this.player.x;
    let endY = this.player.y;

    if (this.player.body.velocity.y !== 0) {
        // If the player is moving vertically, play the yRoll animation
        this.player.play('yRoll', true);

        // If the player is moving up, move up
        if (this.player.body.velocity.y < 0) {
            endY = this.player.y - 160;
        } else {
            // If the player is moving down, move down
            endY = this.player.y + 160;
        }
    } else {
        // If the player is not moving vertically, play the xRoll animation
        this.player.play('xRoll', true);

        // If the player is facing left, move left
        if (this.player.flipX) {
            endX = this.player.x - 160;
        } else {
            // If the player is facing right, move right
            endX = this.player.x + 160;
        }
    }

    this.player.isRolling = true;

    // Create a tween that animates the player's position to the end position over the duration of the roll animation
    this.tweens.add({
        targets: this.player,
        x: endX,
        y: endY,
        duration: this.player.anims.currentAnim.duration,
        ease: 'Power1'
    });
}

this.player.on('animationcomplete', (animation) => {
    if (animation.key === 'xRoll' || animation.key === 'yRoll') {
        this.player.setVelocity(0);
        this.player.isRolling = false;
        this.player.play('idle', true);
    }
});
    }
}