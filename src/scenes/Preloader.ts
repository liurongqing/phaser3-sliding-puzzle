import { SceneKeys } from '~/consts/index'
const PIECE_WIDTH = 200
const PIECE_HEIGHT = 200
export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.PRELOAD)
  }
  preload() {
    // this.load.image('bg', 'assets/images/bg.jpg')
    this.load.image('test', 'assets/images/moon.png')
    this.load.spritesheet('bg', 'assets/images/bg.jpg', {
      frameWidth: PIECE_WIDTH,
      frameHeight: PIECE_HEIGHT
    })
  }
  create() {
    this.scene.start(SceneKeys.GAME)
  }
  update() { }
}
