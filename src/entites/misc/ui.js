// @ts-nocheck
export default class UI {
	constructor(scene) {
		this.scene = scene;
	}

	floatingText(textObject) {
		this.scene.tweens.add({
			targets: textObject,
			alpha: { from: 1, to: 0 },
			ease: 'Linear',
			duration: 2000,
			repeat: 0,
			yoyo: false,
			onComplete: function(tween, targets) {
				// Destroy the text object once the tween is complete
				targets[0].destroy();
			}
		});
	}
}
