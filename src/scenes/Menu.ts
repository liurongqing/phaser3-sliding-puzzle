import { SceneKeys, GameOptions } from '~/consts/index'
export class Menu extends Phaser.Scene {
  constructor() {
    super('menu')
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
