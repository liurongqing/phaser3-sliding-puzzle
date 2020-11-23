import 'phaser';

import scene from 'src/scenes';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'root',
    width: 750,
    height: 1334
  },
  scene
};

export default new Phaser.Game(config);
