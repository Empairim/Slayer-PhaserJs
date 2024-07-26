class UpgradeScene extends Phaser.Scene {
	constructor() {
		super({ key: 'UpgradeScene' });
	}

	preload() {
		this.load.spritesheet('merchant', 'assets/merchant.png', { frameWidth: 32, frameHeight: 32 });
	}

	create() {
		// Create the merchant character
		const merchant = this.add.sprite(400, 150, 'merchant');

		// Create an animation for the merchant
		this.anims.create({
			key: 'appear',
			frames: this.anims.generateFrameNumbers('merchant', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: 0
		});

		// Play the animation
		merchant.play('appear');

		// Add interactivity
		merchant.setInteractive();
		merchant.on('pointerdown', () => {
			// Code to show the upgrade menu goes here
		});
	}
}
