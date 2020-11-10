import { SceneKeys, GameOptions } from '~/consts/index'
export class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.PRELOAD)
  }
  preload() {
    this.load.image('minibg', 'assets/images/bg.jpg')
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
