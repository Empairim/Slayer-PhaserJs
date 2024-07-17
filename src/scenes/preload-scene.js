// @ts-nocheck

import Phaser from "../lib/phaser.js";
import { AssetKeys } from "../assets/asset-keys.js";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    //key for the scene and passes Phaser.Scene to the constructor
    super({ key: "PreloadScene" });
  }

  // Load assets for the scene
  preload() {
    //BACKGROUND ASSETS/////////////////////
    this.load.image("background", AssetKeys.ENVIORNMENT.BACKGROUND.MAIN);
    //MOVEMENT ASSETS///////////

    //CHARACTER ASSETS/////////////////////
    this.load.spritesheet("gunner", AssetKeys.CHARACTER.GUNNER.SPRITESHEET, {
      frameWidth: 48,
      frameHeight: 32,
    });

    //WEAPON ASSETS/////////////////////
    this.load.image("pistol", AssetKeys.CHARACTER.GUN.PISTOL);

    //BULLET ASSETS/////////////////////
    // this.load.image("wBullet", AssetKeys.BULLETS.WBULLET);
    // this.load.image("bullet", AssetKeys.BULLETS.BULLET);
    //not really needed particle system will handle this for now

    //PARTICLE ASSETS/////////////////////
    this.load.image("wSmoke", AssetKeys.PARTICLES.SMOKE.WSMOKE);
    this.load.spritesheet("splatter", AssetKeys.PARTICLES.BLOOD.SPLATTER, {
      frameWidth: 140,
      frameHeight: 60,
    });
    this.load.spritesheet("flamer", AssetKeys.PARTICLES.FLAME.FLAMER, {
      frameWidth: 96,
      frameHeight: 64,
    });

    //SPELL ASSETS/////////////////////
    this.load.spritesheet("fire1", AssetKeys.SPELLS.FIRE.FIRE1, {
      frameWidth: 100,
      frameHeight: 100,
    });
    this.load.spritesheet("water1", AssetKeys.SPELLS.WATER.WATER1, {
      frameWidth: 100,
      frameHeight: 100,
    });

    //ENEMY ASSETS/////////////////////

    //goblin
    this.load.spritesheet("goblin", AssetKeys.ENIMIES.GOBLIN.PNG.RUN, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("goblinDie", AssetKeys.ENIMIES.GOBLIN.PNG.DIE, {
      frameWidth: 64,
      frameHeight: 64,
    });
    //ghoul
    this.load.spritesheet("ghoul", AssetKeys.ENIMIES.GHOUL.PNG.WALK, {
      frameWidth: 62,
      frameHeight: 33,
    });
  }
  create() {
    // this.scene.start("UIScene");
    this.scene.start("MainScene");
  }
}
