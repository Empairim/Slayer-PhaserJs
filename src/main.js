//so I can reference phaser instead of using global window
import Phaser from './lib/phaser.js'
import { PreloadScene } from './scenes/preload-scene.js'
import { SceneKeys } from './scenes/scene-keys.js'


const game = new Phaser.Game({
    type: Phaser.AUTO,
  pixelArt: true,//disable anti-aliasing
  scale: {
    parent: 'game-container',
    width: 1024,
    height: 576,
    mode: Phaser.Scale.FIT, //resize the game to fit the screen
    autoCenter: Phaser.Scale.CENTER_BOTH,//center the game on the screen
  },
    backgroundColor: '#000000',
    // scene: [PreloadScene],//preload scene is the first scene to load
})

game.scene.add(SceneKeys.PRELOAD_SCENE, PreloadScene) //reduant if I dont add the scene in the game object
game.scene.start(SceneKeys.PRELOAD_SCENE) //start the scene