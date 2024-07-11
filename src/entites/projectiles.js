// // @ts-nocheck

// import Phaser from "../lib/phaser.js";

// export default class Projectile extends Phaser.Physics.Arcade.Sprite {
//   constructor(scene, player) {
//     super(scene, player.x, player.y, "projectile");
//     scene.add.existing(this);
//     scene.physics.add.existing(this);
//     this.body.setSize(this.width , this.height /2 );
//     this.body.setOffset(27, 30);
//     this.speed = 500;
    
//   }

//   fire(player, pointer) {
//     this.setPosition(player.x, player.y);
//     let direction = new Phaser.Math.Vector2(
//       pointer.x - player.x,
//       pointer.y - player.y
//     );
//     direction.normalize();
    
//     this.body.velocity.x = direction.x * this.speed;
//     this.body.velocity.y = direction.y * this.speed;
//     // Calculate the angle in degrees and set the projectile's angle
//     const angle = Phaser.Math.RadToDeg(Math.atan2(direction.y, direction.x));
//     this.setAngle(angle);
//     this.play("fire1", true);
//   }
// }

// @ts-nocheck
// @ts-nocheck

import Phaser from "../lib/phaser.js";

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, player) {
    super(scene, player.x, player.y, "projectile");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.speed = 500;
    this.createEmitter(scene);
  }
    

  createEmitter(scene) {
    // Create a particle emitter and attach it to the projectile
    this.emitter = scene.add.particles(this.x,this.y,'water1', {
      
      speed: 350, // Speed of the particles
      lifespan: 500, // How long the particles will live
      angle: { min: -30, max: 30 },// Angle of the particles
      scale: { start: .5, end: 0 },// Scale of the particles
      ease: 'Sine.easeOut',// Easing of the particles
      blendMode: 'ADD'// Blend mode of the particles
    });

    // Set the emitter to follow the projectile
    
  }


  fire(player, pointer) {
    this.setPosition(player.x, player.y);
    let direction = new Phaser.Math.Vector2(
      pointer.x - player.x,
      pointer.y - player.y
    );
    direction.normalize();

    this.body.velocity.x = direction.x * this.speed;
    this.body.velocity.y = direction.y * this.speed;

    // Calculate the angle in degrees and set the projectile's angle
    const angle = Phaser.Math.RadToDeg(Math.atan2(direction.y, direction.x));
    this.setAngle(angle);

    this.play("fire1", true);
  }
    update() {
        this.emitter.setPosition(this.x, this.y);
       
  }
}
