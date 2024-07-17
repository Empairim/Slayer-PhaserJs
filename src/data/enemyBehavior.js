// @ts-nocheck
class Behavior {
  constructor(enemy) {
    this.enemy = enemy;
  }

  update() {
    // Override this method in subclasses
  }
}

export class ChasingBehavior extends Behavior {
  update(target) {
    const angle = Phaser.Math.Angle.Between(
      this.enemy.x,
      this.enemy.y,
      target.x,
      target.y
    );
    this.enemy.body.setVelocity(
      Math.cos(angle) * this.enemy.speed,
      Math.sin(angle) * this.enemy.speed
    );
    this.enemy.flipX = this.enemy.x > target.x;
  }
}

export class ShootingBehavior extends Behavior {
  constructor(enemy, projectileClass, shootInterval) {
    super(enemy);
    this.projectileClass = projectileClass;
    this.shootInterval = shootInterval;
    this.lastShotTime = 0;
  }

  update(target, time) {
    if (time > this.lastShotTime + this.shootInterval) {
      this.lastShotTime = time;
      this.enemy.scene.add.existing(
        new this.projectileClass(
          this.enemy.scene,
          this.enemy.x,
          this.enemy.y,
          target.x,
          target.y
        )
      );
    }
  }
}
