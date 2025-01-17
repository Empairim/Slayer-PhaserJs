// @ts-nocheck
import { ChasingBehavior } from '../../data/enemyBehavior.js';
import Enemy from './enemy.js';

export default class Ghoul extends Enemy {
	constructor(scene, x, y) {
		super(scene, x, y, 'ghoul');
		this.scene = scene;
		this.scene.physics.world.enable(this);
		this.scene.add.existing(this);
		this.body.setSize(this.width / 4 + 5, this.height / 1.5, true);
		this.body.setOffset(20, 10);

		this.health = 20;
		this.speed = 25;
		this.damage = 3;
		this.postFX.addGlow(0x80ff80, 2, 0, false, 0.00001, 5);
		// this.postFX.addShadow(0, 0, 0.1, 5, 0x000000, 3, 0.7);

		this.behavior = new ChasingBehavior(this);
	}
	reset(x, y) {
		if (!this.sys) {
			console.error('Ghoul object is not properly initialized');
			return;
		}

		this.x = x;
		this.y = y;
		this.scene = scene;
		this.scene.physics.world.enable(this).bind(this);
		this.scene.add.existing(this).bind(this);

		this.setTexture('ghoul');
		this.body.setSize(this.width / 4 + 5, this.height / 2);
		this.body.setOffset(20, 15);
		this.health = 20;
		this.speed = 25;
		this.damage = 3;
		this.postFX.addGlow(0x80ff80, 2, 0, false, 0.00001, 2);
		this.postFX.addShadow(0, 0, 0.1, 5, 0x000000, 3, 0.7);
		this.behavior = new ChasingBehavior(this);
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
