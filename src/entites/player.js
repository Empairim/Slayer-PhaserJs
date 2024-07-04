// @ts-nocheck
import Phaser from "../lib/phaser.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'idle');
        this.scene = scene;
        this.scene.add.existing(this); //add to the scene display list
        this.scene.physics.world.enable(this); //enable physics on creation
        this.setCollideWorldBounds(true);
        this.setScale(2);
        this.setBodySize(this.width * 0.3, this.height * 0.3); // Adjust the size of the body

        this.isRolling = false;
        this.speed = 300;

        //create animations and key bindings on creation
        this.createAnimations();
        this.on('animationcomplete', this.onAnimationComplete.bind(this), this); //to check if the animation is complete before doing something else bind it to that specific instance of player
        this.wasdKeys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
      

       
    }

    //UPDATE PLAYERS ACTIONS
    update() {
        if (this.wasdKeys.left.isDown && !this.isRolling) {
            this.setVelocityX(-this.speed);
            this.play('xwalk', true);
            this.setFlipX(true);
        } else if (this.wasdKeys.right.isDown && !this.isRolling) {
            this.setVelocityX(this.speed);
            this.play('xwalk', true);
            this.setFlipX(false);
        } else if (this.wasdKeys.up.isDown && !this.isRolling) {
            this.setVelocityY(-this.speed);
            this.play('uwalk', true);
            this.setFlipX(false);
        } else if (this.wasdKeys.down.isDown && !this.isRolling) {
            this.setVelocityY(this.speed);
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

    //PLAYER SKILLS ACTIONS TBD IF I WANT TO ADD MORE
    
    // roll method
    roll() {
        let endX = this.x;
        let endY = this.y;

        if (this.body.velocity.y !== 0) {
            this.play('yRoll', true);
            if (this.body.velocity.y < 0) {
                endY = this.y - this.speed;
                this.setFlipY(false);
            } else {
                endY = this.y + this.speed;
                this.setFlipY(true);
            }
        } else {
            this.play('xRoll', true);
            if (this.flipX) {
                endX = this.x - this.speed;
            } else {
                endX = this.x + this.speed;
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

    createAnimations() { 




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
        frameRate: 20,
        repeat: -1
    });
    //up walk
    this.anims.create({
        key: 'uwalk',
        frames: this.anims.generateFrameNumbers('upWalk', { start: 0, end: 5 }), // Adjust frame numbers as needed
        frameRate: 20,
        repeat: -1
    });
    //down walk
     this.anims.create({
        key: 'dwWalk',
        frames: this.anims.generateFrameNumbers('dwWalk', { start: 0, end: 5 }), // Adjust frame numbers as needed
        frameRate: 20,
        repeat: -1
    });

    //horizontal roll
    this.anims.create({
        key: 'xRoll',
        frames: this.anims.generateFrameNumbers('xRoll', { start: 0, end: 6 }), // Adjust frame numbers as needed
        frameRate: 11,
        repeat: 0
    });

    //vertical roll
    this.anims.create({
        key: 'yRoll',
        frames: this.anims.generateFrameNumbers('yRoll', { start: 0, end: 6 }), // Adjust frame numbers as needed
        frameRate: 11,
        repeat: 0
    })


    }

    

   
}
