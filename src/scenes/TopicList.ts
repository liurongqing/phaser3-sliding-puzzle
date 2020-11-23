import { SceneKeys, GameOptions } from 'src/consts/index';
export class TopicList extends Phaser.Scene {
  constructor() {
    super('topic-list');
  }

  preload() {
    // this.load.image('item', 'assets/images/item.png');
  }

  create() {
    const { width, height } = this.scale;
    console.log('list...');
    const size = 234, spacing = 12;
    let itemSprite, itemTextSprite, i = 1;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        itemSprite = this.add.image(size * 0.5 + spacing + (size + spacing) * col, height * 0.5 - size * 1.5 + (size + spacing) * row, 'item');
        itemSprite.setDisplaySize(size, size);
        itemSprite.setInteractive();

        itemTextSprite = this.add.text(itemSprite.x, itemSprite.y, String(i++), { fontSize: 200 });
        itemTextSprite.setOrigin(0.5);


        itemSprite.on('pointerdown', () => {
          this.scene.start('game');
        });
      }
    }

    this.layoutActions();
    // this.scene.start('game');
  }
  layoutActions() {
    const { width, height } = this.scale;
    // back
    const textSprite = this.add.text(30, 30, '返回主题', {
      fontSize: 30
    });
    textSprite.setInteractive();
    textSprite.on('pointerdown', () => {
      this.scene.start('topic-type');
    });

    // 音乐
    const text2Sprite = this.add.text(width - 30, 30, '开启关闭音乐', {
      fontSize: 30
    }).setOrigin(1, 0);
    text2Sprite.setInteractive();
    text2Sprite.on('pointerdown', () => {
      // this.scene.start('topic-list')
      console.log('开启关闭音乐');
    });
  }
  update() { }
}
