//@ts-nocheck
export class UIScene extends Phaser.Scene {
	constructor() {
		super({ key: 'UIScene' });
	}

	// init(data) {
	// 	this.player = data.player;
	// 	this.wave = data.enemySpawner;
	// }
	preload() {}
	create() {
		// Create a text object for each ammo type
		const textStyle = {
			font: '16px customFont',
			fill: '#ffffff',
			shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 2, stroke: true, fill: true }
		};
		this.currentAmmoText = this.add.text(10, 10, '', textStyle);
		this.pistolAmmoText = this.add.text(10, 50, '', textStyle);
		this.shotgunAmmoText = this.add.text(10, 70, '', textStyle);
		this.machineAmmoText = this.add.text(10, 90, '', textStyle);
		this.creditAmmoText = this.add.text(10, 130, '', textStyle);
		this.waveText = this.add.text(10, 110, '', textStyle);
	}

	update() {
		// Get the player from the game scene
		const player = this.scene.get('MainScene').player;
		const wave = this.scene.get('MainScene').enemySpawner.waveNumber;

		// Update the text objects with the current ammo counts
		this.currentAmmoText.setText('Current Weapon: ' + player.currentAmmoType);
		this.pistolAmmoText.setText('Pistol Ammo: ' + player.ammoInventory['pistol']);
		this.shotgunAmmoText.setText('Shotgun Ammo: ' + player.ammoInventory['shotgun']);
		this.machineAmmoText.setText('Machine Gun Ammo: ' + player.ammoInventory['machine']);
		this.creditAmmoText.setText('Credits: ' + player.ammoInventory['credit']);
		this.waveText.setText('Wave: ' + wave);
	}
}
