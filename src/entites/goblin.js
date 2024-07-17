// @ts-nocheck
import Enemy from "../entites/enemy.js";

export default class Goblin extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "goblin");
    this.body.setSize(this.width * 0.3, this.height * 0.3);
    this.body.setOffset(27, 30);
    this.health = 20;
    this.speed = 150;
    this.damage = 0.6;
  }

  playChaseAnimation() {
    this.play("goblin");
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
