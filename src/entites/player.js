// @ts-nocheck
import Phaser from "../lib/phaser.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'idle');
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setScale(2);
        this.isRolling = false;
        this.wasdKeys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
       
    }

   update() {
        if (this.wasdKeys.left.isDown && !this.isRolling) {
            this.setVelocityX(-160);
            this.play('xwalk', true);
            this.setFlipX(true);
        } else if (this.wasdKeys.right.isDown && !this.isRolling) {
            this.setVelocityX(160);
            this.play('xwalk', true);
            this.setFlipX(false);
        } else if (this.wasdKeys.up.isDown && !this.isRolling) {
            this.setVelocityY(-160);
            this.play('uwalk', true);
            this.setFlipX(false);
        } else if (this.wasdKeys.down.isDown && !this.isRolling) {
            this.setVelocityY(160);
            this.play('dwWalk', true);
            this.setFlipX(true);
        } else if (!this.wasdKeys.left.isDown && !this.wasdKeys.right.isDown && !this.wasdKeys.up.isDown && !this.wasdKeys.down.isDown && !this.isRolling) {
            this.setVelocity(0);
            this.play('idle', true);
        }

        if (Phaser.Input.Keyboard.JustDown(this.wasdKeys.space) && !this.isRolling) {
            this.roll();
        }
    }

    roll() {
        let endX = this.x;
        let endY = this.y;

        if (this.body.velocity.y !== 0) {
            this.play('yRoll', true);
            if (this.body.velocity.y < 0) {
                endY = this.y - 160;
                this.setFlipY(false);
            } else {
                endY = this.y + 160;
                this.setFlipY(true);
            }
        } else {
            this.play('xRoll', true);
            if (this.flipX) {
                endX = this.x - 160;
            } else {
                endX = this.x + 160;
            }
        }

        this.isRolling = true;

        this.scene.tweens.add({
            targets: this,
            x: endX,
            y: endY,
            duration: this.anims.currentAnim.duration,
            ease: 'Power1'
        });
    }

    onAnimationComplete(animation) {
        if (animation.key === 'xRoll' || animation.key === 'yRoll') {
            this.setVelocity(0);
            this.isRolling = false;
            this.setFlipY(false);
            this.play('idle', true);
        }
    }
}
