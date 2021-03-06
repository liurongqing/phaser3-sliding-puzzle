import { SceneKeys, GameOptions } from 'src/consts/index';

export class Game extends Phaser.Scene {
  board_rows: number;
  board_cols: number;
  tileActive: any;
  tileSum: number;
  tileGroup: any;
  constructor() {
    super(SceneKeys.GAME);
  }

  init() {
    const { width } = this.scale;
    // this.board_cols = Math.floor(width / GameOptions.TILE_SIZE);
    // this.board_rows = this.board_cols
    this.board_rows = 3;
    this.board_cols = 4;
    this.tileSum = this.board_rows * this.board_cols;
    this.tileGroup = this.add.group();
  }

  preload() { }

  create() {
    this.layout();

    this.layoutActions();

    this.input.on('gameobjectdown', this.handleTile, this);
  }



  // 初始化布局
  layout() {
    const shuffledIndexArray = this.createShuffledIndexArray();
    let tileIndex = 0;
    let tileSprite: any;
    const { width, height } = this.scale;
    const initHeight = height * 0.5 - GameOptions.TILE_SIZE * 3 / 2 + 100;
    for (let row = 0; row < this.board_rows; row++) {
      for (let col = 0; col < this.board_cols; col++) {
        tileSprite = this.tileGroup.create(col * GameOptions.TILE_SIZE, initHeight + row * GameOptions.TILE_SIZE, 'bg', shuffledIndexArray[tileIndex]);

        // 剔除为0的那一块
        if (shuffledIndexArray[tileIndex] === this.tileSum - 1) {
          tileSprite.blank = true;
          tileSprite.setVisible(false);
          tileSprite.setDepth(-1);
        }

        tileSprite.setOrigin(0);
        tileSprite.setInteractive();
        tileSprite.row = row;
        tileSprite.col = col;
        tileSprite.tileIndex = tileIndex;
        tileSprite.rightIndex = shuffledIndexArray[tileIndex];
        tileIndex++;
      }
    }

    this.minimap();
  }

  minimap() {
    this.add.image(this.scale.width - 30, 80, 'minibg').setScale(0.36).setOrigin(1, 0);
  }

  layoutActions() {
    const { width, height } = this.scale;
    // back
    const textSprite = this.add.text(30, 30, '返回列表', {
      fontSize: 30
    });
    textSprite.setInteractive();
    textSprite.on('pointerdown', () => {
      this.scene.start('topic-list');
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

    const text3Sprite = this.add.text(width * 0.5, 380, '时间：01:20', {
      fontSize: 40
    }).setOrigin(0.5);
    text3Sprite.setInteractive();
    text3Sprite.on('pointerdown', () => {
      // this.scene.start('topic-list')
      console.log('开启关闭音乐');
    });

    const text4Sprite = this.add.text(30, 100, '排行榜\n 张三 01:20\n 李四 01: 23 \n 王五 01: 30', {
      fontSize: 40
    });
    text4Sprite.setInteractive();
    text4Sprite.on('pointerdown', () => {
      // this.scene.start('topic-list')
      console.log('开启关闭音乐');
    });
  }

  handleTile(pointer: any, gameObject: any) {
    const blankTileSprite = this.canMove(gameObject);
    if (blankTileSprite) {
      this.moveTile(gameObject, blankTileSprite);
    }
  }

  // 如果可以移动，找出那个空白块的位置
  canMove(activeTileSprite: any) {
    let blankTileSprite = null;
    const { row: activeRow, col: activeCol } = activeTileSprite;

    // TODO: 可优化， 获取到空白块直接判断
    Phaser.Actions.Call(this.tileGroup.getChildren(), function (tileSprite: any) {
      if (tileSprite.blank) {
        // 判断空白块是否在当前块的上、下、左、右，是的话，可以移动
        if (tileSprite.row === activeRow - 1 && tileSprite.col === activeCol ||
          tileSprite.row === activeRow + 1 && tileSprite.col === activeCol ||
          tileSprite.col === activeCol - 1 && tileSprite.row === activeRow ||
          tileSprite.col === activeCol + 1 && tileSprite.row === activeRow) {
          blankTileSprite = tileSprite;
        }
      }
    }, this);
    return blankTileSprite;
  }

  moveTile(activeTileSprite: any, blankTileSprite: any) {

    const originActiveTileSprite = {
      x: activeTileSprite.x,
      y: activeTileSprite.y,
      row: activeTileSprite.row,
      col: activeTileSprite.col,
      tileIndex: activeTileSprite.tileIndex
    };

    this.add.tween({
      targets: activeTileSprite,
      x: blankTileSprite.x,
      y: blankTileSprite.y,
      duration: 300,
      onComplete: () => {
        // 将当前块与空白块交换
        this.swapeProps(activeTileSprite, blankTileSprite, originActiveTileSprite);
        this.checkFinished();
      }
    });
  }

  swapeProps(activeTileSprite: any, blankTileSprite: any, originActiveTileSprite: any) {
    // 交换x、y、col、row、tileIndex 属性
    activeTileSprite.row = blankTileSprite.row;
    activeTileSprite.col = blankTileSprite.col;
    activeTileSprite.tileIndex = blankTileSprite.tileIndex;

    blankTileSprite.x = originActiveTileSprite.x;
    blankTileSprite.y = originActiveTileSprite.y;
    blankTileSprite.row = originActiveTileSprite.row;
    blankTileSprite.col = originActiveTileSprite.col;
    blankTileSprite.tileIndex = originActiveTileSprite.tileIndex;
  }

  checkFinished() {
    let isFinished = true;
    Phaser.Actions.Call(this.tileGroup.getChildren(), function (tileSprite: any) {
      if (tileSprite.tileIndex !== tileSprite.rightIndex) {
        isFinished = false;
        return;
      }
    }, this);

    if (isFinished) {
      console.log('成功了');
      // this.showFinishedText();
    }
  }

  createShuffledIndexArray() {
    let indexArray = [];
    for (let i = 0; i < this.tileSum; i++) {
      indexArray.push(i);
    }
    return this.shuffle(indexArray);
  }

  shuffle(arr: any) {
    let i = arr.length;
    while (i) {
      let j = Math.floor(Math.random() * i--);
      ;[arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }
}
