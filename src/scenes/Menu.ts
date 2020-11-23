import { SceneKeys, GameOptions } from 'src/consts/index';
export class Menu extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  create() {

    const { width, height } = this.scale;
    const startText = this.add.text(width * 0.5, height * 0.5, '开 始', {
      fontSize: 50
    })
      .setOrigin(0.5)
      .setInteractive();

    this.add.text(width * 0.5, height * 0.5 + 130, '抵制不良游戏，拒绝盗版游戏。\n注意自我保护，谨防受骗上当。\n适度游戏益脑，沉迷游戏伤身。\n合理安排时间，享受健康生活。', {
      fontSize: 25,
      lineSpacing: 8
    })
      .setOrigin(0.5);

    this.scene.start('topic-type');
    startText.on('pointerdown', () => {
      this.scene.start('topic-type');
    });
  }
  update() { }
}
