//@ts-nocheck
export class UIScene extends Phaser.Scene {
	constructor() {
		super({ key: 'UIScene', active: true });
	}

	preload() {
		// Load the bitmap font
		this.load.bitmapFont('goldenFont', 'images/GoldFont.png', 'images/GoldFont.xml');
	}

	create() {
		// Create a bitmap text object for each ammo type
		this.pistolAmmoText = this.add.bitmapText(10, 10, 'goldenFont', '');
		this.shotgunAmmoText = this.add.bitmapText(10, 30, 'goldenFont', '');
		this.machineAmmoText = this.add.bitmapText(10, 50, 'goldenFont', '');
	}

	update() {
		// Get the player from the game scene
		const player = this.scene.get('MainScene').player;

		// Update the text objects with the current ammo counts
		this.pistolAmmoText.setText('Pistol Ammo: ' + player.ammoInventory['pistol']);
		this.shotgunAmmoText.setText('Shotgun Ammo: ' + player.ammoInventory['shotgun']);
		this.machineAmmoText.setText('Machine Gun Ammo: ' + player.ammoInventory['machine']);
	}
}
