// @ts-nocheck
//so I can reference phaser instead of using global window
import Phaser from "./lib/phaser.js";
import { MainScene } from "./scenes/main-scene.js";
import { PreloadScene } from "./scenes/preload-scene.js";
import { SceneKeys } from "./scenes/scene-keys.js";

const game = new Phaser.Game({
  type: Phaser.AUTO,
  pixelArt: true, //disable anti-aliasing
  scale: {
    parent: "game-container",
    width: 800,
    height: 600,
    mode: Phaser.Scale.FIT, //resize the game to fit the screen
    autoCenter: Phaser.Scale.CENTER_BOTH, //center the game on the screen
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  backgroundColor: "#333333",
  scene: [PreloadScene, MainScene], //preload scene is the first scene to load
});
