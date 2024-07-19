// @ts-nocheck
import Enemy from './enemy.js';

export default class Ghoul extends Enemy {
	constructor(scene, x, y) {
		super(scene, x, y, 'ghoul');
		this.body.setSize(this.width / 3, this.height);
		this.body.setOffset(20, 0);
		this.health = 50;
		this.speed = 50;
		this.damage = 3;
		this.hitStun = 1000;
	}

	playChaseAnimation() {
		this.play('ghoul');
	}
}

//for future reference
// playDieAnimation() {
//     // Play a unique die animation for Goblin
//     this.play("goblinDie");
//     this.body.enable = false;
//     this.on(
//       "animationcomplete",
//       function (animation) {
//         if (animation.key === "goblinDie") {
//           this.isDying = false;
//           // The ammo drop logic from the Enemy class will still be executed
//           super.playDieAnimation();
//         }
//       },
//       this
//     );
