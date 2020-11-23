import { SceneKeys, GameOptions } from 'src/consts/index';
export class TopicType extends Phaser.Scene {
  topics = [
    '柯南主题',
    '小薪主题',
    '海贼王主题',
    '斗破主题',
    '风景主题',
    '宝宝主题',
    '影忍者主题',
    '友人帐主题',
    '尾巴主题'
  ];
  constructor() {
    super('topic-type');
  }

  preload() {
    this.load.image('item', 'assets/images/item.png');
  }

  create() {
    const { width, height } = this.scale;
    const size = 234, spacing = 12;
    let itemSprite, itemTextSprite, i = 0;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        itemSprite = this.add.image(size * 0.5 + spacing + (size + spacing) * col, height * 0.5 - size * 1.5 + (size + spacing) * row, 'item');
        itemSprite.setDisplaySize(size, size);
        itemSprite.setInteractive();

        itemTextSprite = this.add.text(itemSprite.x, itemSprite.y, this.topics[i++], { fontSize: 38 });
        itemTextSprite.setOrigin(0.5);

        itemSprite.on('pointerdown', () => {
          this.scene.start('topic-list');
        });
      }
    }
    // this.scene.start('topic-list');

    this.layoutActions()
  }

  layoutActions() {
    const { width, height } = this.scale;
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
