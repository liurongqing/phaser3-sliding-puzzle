import { SceneKeys, GameOptions } from '~/consts/index'
export class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.PRELOAD)
  }
  preload() {
    this.load.image('test', 'assets/images/moon.png')
    this.load.spritesheet('bg', 'assets/images/bg.jpg', {
      frameWidth: GameOptions.TILE_SIZE,
      frameHeight: GameOptions.TILE_SIZE
    })
  }
  create() {
    this.scene.start(SceneKeys.GAME)
  }
  update() { }
}
