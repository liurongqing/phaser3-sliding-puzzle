import { SceneKeys, GameOptions } from '~/consts/index'

export class Game extends Phaser.Scene {
  board_rows: number
  board_cols: number
  tileActive: any
  tileSum: number
  tileGroup: any
  constructor() {
    super(SceneKeys.GAME)
  }

  init() {
    const { width } = this.scale
    this.board_cols = Math.floor(width / GameOptions.TILE_SIZE);
    // this.board_rows = this.board_cols
    this.board_rows = 3
    this.tileSum = this.board_rows * this.board_cols
    this.tileGroup = this.add.group()
  }

  preload() { }

  create() {
    // this.prepareBoard()
    this.layout()

    this.input.on('gameobjectdown', this.handleTile, this)
  }

  // 初始化布局
  layout() {
    const shuffledIndexArray = this.createShuffledIndexArray()
    let tileIndex = 0
    let tileSprite: any
    for (let row = 0; row < this.board_rows; row++) {
      for (let col = 0; col < this.board_cols; col++) {
        tileSprite = this.tileGroup.create(col * GameOptions.TILE_SIZE, row * GameOptions.TILE_SIZE, 'bg', shuffledIndexArray[tileIndex])

        // 剔除为0的那一块
        if (shuffledIndexArray[tileIndex] === this.tileSum - 1) {
          tileSprite.blank = true
          // tileSprite.setTint(0xff0000)
          // tileSprite.setAlpha(0)
          tileSprite.setVisible(false)
          tileSprite.setDepth(-1)
        }

        tileSprite.setOrigin(0)
        tileSprite.setInteractive()
        tileSprite.row = row
        tileSprite.col = col
        tileSprite.tileIndex = tileIndex
        tileSprite.rightIndex = shuffledIndexArray[tileIndex]
        tileIndex++
      }
    }
  }

  handleTile(pointer: any, gameObject: any) {
    const blankTileSprite = this.canMove(gameObject)
    if (blankTileSprite) {
      this.moveTile(gameObject, blankTileSprite)
    }
  }

  // 如果可以移动，找出那个空白块的位置
  canMove(activeTileSprite: any) {
    let blankTileSprite = null
    const { row: activeRow, col: activeCol } = activeTileSprite

    // TODO: 可优化， 获取到空白块直接判断
    Phaser.Actions.Call(this.tileGroup.getChildren(), function (tileSprite: any) {
      if (tileSprite.blank) {
        // 判断空白块是否在当前块的上、下、左、右，是的话，可以移动
        if (tileSprite.row === activeRow - 1 && tileSprite.col === activeCol ||
          tileSprite.row === activeRow + 1 && tileSprite.col === activeCol ||
          tileSprite.col === activeCol - 1 && tileSprite.row === activeRow ||
          tileSprite.col === activeCol + 1 && tileSprite.row === activeRow) {
          blankTileSprite = tileSprite
        }
      }
    }, this)
    return blankTileSprite
  }

  moveTile(activeTileSprite: any, blankTileSprite: any) {

    const originActiveTileSprite = {
      x: activeTileSprite.x,
      y: activeTileSprite.y,
      row: activeTileSprite.row,
      col: activeTileSprite.col,
      tileIndex: activeTileSprite.tileIndex
    }

    this.add.tween({
      targets: activeTileSprite,
      x: blankTileSprite.x,
      y: blankTileSprite.y,
      duration: 300,
      onComplete: () => {
        // 将当前块与空白块交换
        this.swapeProps(activeTileSprite, blankTileSprite, originActiveTileSprite)
        this.checkFinished()
      }
    })
  }

  swapeProps(activeTileSprite: any, blankTileSprite: any, originActiveTileSprite: any) {
    // 交换x、y、col、row、tileIndex 属性
    activeTileSprite.row = blankTileSprite.row
    activeTileSprite.col = blankTileSprite.col
    activeTileSprite.tileIndex = blankTileSprite.tileIndex

    blankTileSprite.x = originActiveTileSprite.x
    blankTileSprite.y = originActiveTileSprite.y
    blankTileSprite.row = originActiveTileSprite.row
    blankTileSprite.col = originActiveTileSprite.col
    blankTileSprite.tileIndex = originActiveTileSprite.tileIndex
  }

  checkFinished() {
    let isFinished = true
    Phaser.Actions.Call(this.tileGroup.getChildren(), function (tileSprite: any) {
      if (tileSprite.tileIndex !== tileSprite.rightIndex) {
        isFinished = false;
        return;
      }
    }, this)

    if (isFinished) {
      console.log('成功了')
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
      ;[arr[j], arr[i]] = [arr[i], arr[j]]
    }
    return arr
  }
}
