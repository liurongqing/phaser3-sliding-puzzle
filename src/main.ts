import 'phaser'

import scene from '~/scenes'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'root',
    width: 800,
    height: 1000
  },
  scene
}

export default new Phaser.Game(config)
