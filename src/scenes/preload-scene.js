// @ts-nocheck

import Phaser from "../lib/phaser.js";
import { AssetKeys } from "../assets/asset-keys.js";


export class PreloadScene extends Phaser.Scene {
    constructor() {
        //key for the scene and passes Phaser.Scene to the constructor
        super({ key: 'PreloadScene' });
        
    }

    // Load assets for the scene
    preload() {
        //MOVEMENT ASSETS
        //side roll
        this.load.spritesheet('xRoll', AssetKeys.CHARACTER.MOVEMENT.XROLL, { frameWidth: 64, frameHeight: 64 });
        //up roll
        this.load.spritesheet('yRoll', AssetKeys.CHARACTER.MOVEMENT.YROLL, { frameWidth: 64, frameHeight: 64 });
        //down walk
        this.load.spritesheet('dwWalk', AssetKeys.CHARACTER.MOVEMENT.DWWALK, { frameWidth: 64, frameHeight: 64 });
        //up walk
        this.load.spritesheet('upWalk', AssetKeys.CHARACTER.MOVEMENT.UPWALK, { frameWidth: 64, frameHeight: 64 });
        //side walk
        this.load.spritesheet('xWalk', AssetKeys.CHARACTER.MOVEMENT.XWALK, { frameWidth: 64, frameHeight: 64 });
        //idle
        this.load.spritesheet('idle', AssetKeys.CHARACTER.MOVEMENT.IDLE, { frameWidth: 64, frameHeight: 64 });

        //WEAPON ASSETS
        this.load.spritesheet('bat', AssetKeys.CHARACTER.WEAPON.BAT, { frameWidth: 96, frameHeight: 80 });
        
        //SPELL ASSETS
        this.load.spritesheet('fire1', AssetKeys.SPELLS.FIRE.FIRE1, { frameWidth: 100, frameHeight: 100 });
    } 
    create() {
        this.scene.start('MainScene');
    }
}