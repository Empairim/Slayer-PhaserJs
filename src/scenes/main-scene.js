// @ts-nocheck

import Phaser from "../lib/phaser.js";


export class MainScene extends Phaser.Scene {
    constructor() {
        //key for the scene and passes Phaser.Scene to the constructor
        super({ key: 'MainScene' });
        
    }

// Create things for the scene
create() {

    //wasd keys
    this.wasdKeys = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        space: Phaser.Input.Keyboard.KeyCodes.SPACE
        
    });

    //will cause types error but can be ignores just from the phaser ts config file in types folder meh -shrug- ;) Ill just put a no types check up top

    //Rolling Check
   




    //PLAYER MOVEMENT ANIMATIONS
    //idle
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 11 }), // Adjust frame numbers as needed
        frameRate: 5,
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
    
    //WEAPON
    this.anims.create({ key: 'bat', frames: this.anims.generateFrameNumbers('bat', { start: 0, end: 5 }), frameRate: 10, repeat: -1 });
    this.bat = this.add.sprite(0, 0, 'bat');
    this.bat.setOrigin(0.5, 0.9);
}
    

    // Update things for the scene
    update() { 
     //left
    if (this.wasdKeys.left.isDown && !this.player.isRolling) {
        this.player.setVelocityX(-160);
        this.player.play('xwalk', true);
        this.player.setFlipX(true);
    //right
    } else if (this.wasdKeys.right.isDown && !this.player.isRolling) {
        this.player.setVelocityX(160);
        this.player.play('xwalk', true);
        this.player.setFlipX(false);
    //up
    } else if (this.wasdKeys.up.isDown && !this.player.isRolling) {
        this.player.setVelocityY(-160);
        this.player.play('uwalk', true);
        this.player.setFlipX(false);
    //down
    } else if (this.wasdKeys.down.isDown && !this.player.isRolling) {
        this.player.setVelocityY(160);
        this.player.play('dwWalk', true);
        this.player.setFlipX(true);
    }
    //idle
    if (!this.wasdKeys.left.isDown && !this.wasdKeys.right.isDown && !this.wasdKeys.up.isDown && !this.wasdKeys.down.isDown && !this.player.isRolling) {
        this.player.setVelocity(0);
        this.player.play('idle', true);
    }

       //space/roll
   if (Phaser.Input.Keyboard.JustDown(this.wasdKeys.space) && !this.player.isRolling) {
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
        this.bat.x = this.player.x;
        this.bat.y = this.player.y;
        this.bat.setTint(0xff0000); // Tints the sprite red
        this.bat.play('bat', true);
        // In your update method
const pointer = this.input.activePointer;
const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.x, pointer.y);
this.bat.setRotation(angle);
    }
}