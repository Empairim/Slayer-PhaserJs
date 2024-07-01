
import Phaser from "../lib/phaser";


export class PreloadScene extends Phaser.Scene {
    constructor() {
        //key for the scene and passes Phaser.Scene to the constructor
        super({ key: 'PreloadScene' });
        
    }

    preload() { console.log('PreloadScene preload')}
    create() {  console.log('PreloadScene create');}
    update() {console.log('PreloadScene update'); }
}