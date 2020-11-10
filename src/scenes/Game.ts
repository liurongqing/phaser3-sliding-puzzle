import { SceneKeys } from '~/consts/index'



const PIECE_WIDTH = 200
const PIECE_HEIGHT = 200
let BOARD_COLS, BOARD_ROWS

let piecesGroup
let piecesAmount
let shuffledIndexArray = []


export default class Game extends Phaser.Scene {
  constructor() {
    super(SceneKeys.GAME)
  }
  preload() { }
  create() {
    this.prepareBoard()

  }
  update() { }

  prepareBoard() {

    var piecesIndex = 0,
      i, j,
      piece;

    const { width, height } = this.scale

    BOARD_COLS = Math.floor(width / PIECE_WIDTH);
    BOARD_ROWS = Math.floor(height / PIECE_HEIGHT);

    piecesAmount = BOARD_COLS * BOARD_ROWS;

    shuffledIndexArray = this.createShuffledIndexArray();

    piecesGroup = this.add.group();

    for (i = 0; i < BOARD_ROWS; i++) {
      for (j = 0; j < BOARD_COLS; j++) {
        if (shuffledIndexArray[piecesIndex]) {
          piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT, "bg", shuffledIndexArray[piecesIndex]);
        } else {
          piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT, 'test');
          piece.blank = true
        }
        // piece.name = 'piece' + i + 'x' + j;
        piece.currentIndex = piecesIndex;
        piece.destIndex = shuffledIndexArray[piecesIndex];
        piece.setInteractive()
        piece.setOrigin(0)
        piece.row = i
        piece.col = j
        piecesIndex++;
      }
    }

    this.input.on('gameobjectdown', (pointer, gameObject) => {
      this.selectPiece(gameObject)
    })
  }

  selectPiece(piece) {
    var blackPiece = this.canMove(piece);
    if (blackPiece) {
      this.movePiece(piece, blackPiece);
    }

  }

  canMove(piece) {
    var foundBlackElem = null;
    const { row, col } = piece
    Phaser.Actions.Call(piecesGroup.getChildren(), function (element: any) {
      console.log(element.row, element.col)
      if (element.row === row - 1 && element.col === col && element.blank ||
        element.row === row + 1 && element.col === col && element.blank ||
        element.col === col - 1 && element.row === row && element.blank ||
        element.col === col + 1 && element.row === row && element.blank
      ) {
        foundBlackElem = element
      }
    }, this)
    return foundBlackElem;
  }

  movePiece(piece, blackPiece) {

    const { x, y, row, col, currentIndex } = piece
    const {row: blackRow, col: blackCol} = blackPiece
    this.add.tween({
      targets: piece,
      x: blackPiece.x,
      y: blackPiece.y,
      duration: 300,
      onComplete: () => {
        blackPiece.x = x
        blackPiece.y = y
        blackPiece.row = row
        blackPiece.col = col

        piece.currentIndex = blackPiece.currentIndex
        piece.row = blackRow
        piece.col = blackCol
        blackPiece.currentIndex = currentIndex
        // piece.name = 'piece' + x + 'x' + y;
        this.checkIfFinished();
      }
    })


  }

  checkIfFinished() {

    // return false
    var isFinished = true;

    // 有一个不在就是未结束
    Phaser.Actions.Call(piecesGroup.getChildren(), function (element: any) {
      if (element.currentIndex !== element.destIndex) {
        isFinished = true;
        return;
      }
    }, this)

    if (isFinished) {
      this.showFinishedText();
    }

  }

  showFinishedText() {
    var style = { font: "40px Arial", fill: "#fff", align: "center" };
    const { width, height } = this.scale

    var text = this.add.text(width * 0.5, height * 0.5, "Congratulations! \nYou made it!", style);
    text.setOrigin(0.5)
  }

  createShuffledIndexArray() {

    var indexArray = [];

    for (var i = 0; i < piecesAmount; i++) {
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
