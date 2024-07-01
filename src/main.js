//so I can reference phaser instead of using global window
import Phaser from './lib/phaser.js'

const game = new Phaser.Game({
    parent: 'game-container',
})