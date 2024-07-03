// @ts-nocheck
import Phaser from "../lib/phaser.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'idle');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(2);
        this.isRolling = false;

        // Add animations
        this.createAnimations(scene);
    }

    createAnimations(scene) {
        //idle
        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('idle', { start: 0, end: 11 }), // Adjust frame numbers as needed
            frameRate: 5,
            repeat: -1
        });
        //side walk
        scene.anims.create({
            key: 'xwalk',
            frames: scene.anims.generateFrameNumbers('xWalk', { start: 0, end: 5 }), // Adjust frame numbers as needed
            frameRate: 10,
            repeat: -1
        });
        //up walk
        scene.anims.create({
            key: 'uwalk',
            frames: scene.anims.generateFrameNumbers('upWalk', { start: 0, end: 5 }), // Adjust frame numbers as needed
            frameRate: 10,
            repeat: -1
        });
        //down walk
        scene.anims.create({
            key: 'dwWalk',
            frames: scene.anims.generateFrameNumbers('dwWalk', { start: 0, end: 5 }), // Adjust frame numbers as needed
            frameRate: 10,
            repeat: -1
        });

        //horizontal roll
        scene.anims.create({
            key: 'xRoll',
            frames: scene.anims.generateFrameNumbers('xRoll', { start: 0, end: 6 }), // Adjust frame numbers as needed
            frameRate: 10,
            repeat: 0
        });

        //vertical roll
        scene.anims.create({
            key: 'yRoll',
            frames: scene.anims.generateFrameNumbers('yRoll', { start: 0, end: 6 }), // Adjust frame numbers as needed
            frameRate: 10,
            repeat: 0
        });
    }

    handleInput(wasdKeys, cursors) {
        //left
        if (wasdKeys.left.isDown && !this.isRolling) {
            this.setVelocityX(-160);
            this.play('xwalk', true);
            this.setFlipX(true);
        //right
        } else if (wasdKeys.right.isDown && !this.isRolling) {
            this.setVelocityX(160);
            this.play('xwalk', true);
            this.setFlipX(false);
        //up
        } else if (wasdKeys.up.isDown && !this.isRolling) {
            this.setVelocityY(-160);
            this.play('uwalk', true);
            this.setFlipX(false);
        //down
        } else if (wasdKeys.down.isDown && !this.isRolling) {
            this.setVelocityY(160);
            this.play('dwWalk', true);
            this.setFlipX(true);
        }
        //idle
        if (!wasdKeys.left.isDown && !wasdKeys.right.isDown && !wasdKeys.up.isDown && !wasdKeys.down.isDown && !this.isRolling) {
            this.setVelocity(0);
            this.play('idle', true);
        }

        //space/roll
        if (Phaser.Input.Keyboard.JustDown(wasdKeys.space) && !this.isRolling) {
            let endX = this.x;
            let endY = this.y;

            if (this.body.velocity.y !== 0) {
                // If the player is moving vertically, play the yRoll animation
                this.play('yRoll', true);

                // If the player is moving up, move up
                if (this.body.velocity.y < 0) {
                    endY = this.y - 160;
                    this.setFlipY(false);
                } else {
                    // If the player is moving down, move down
                    endY = this.y + 160;
                    this.setFlipY(true);
                    
                }
            } else {
                // If the player is not moving vertically, play the xRoll animation
                this.play('xRoll', true);

                // If the player is facing left, move left
                if (this.flipX) {
                    endX = this.x - 160;
                } else {
                    // If the player is facing right, move right
                    endX = this.x + 160;
                }
            }

            this.isRolling = true;

            // Create a tween that animates the player's position to the end position over the duration of the roll animation
            this.scene.tweens.add({
                targets: this,
                x: endX,
                y: endY,
                duration: this.anims.currentAnim.duration,
                ease: 'Power1'
            });
        }

        this.on('animationcomplete', (animation) => {
            if (animation.key === 'xRoll' || animation.key === 'yRoll') {
                this.setVelocity(0);
                this.isRolling = false;
                this.play('idle', true);
            }
        });
    }
}
