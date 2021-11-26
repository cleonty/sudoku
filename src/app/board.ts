import { Square } from "./square";

const size = 9;

export class Board {

  readonly sampleBoard = [
    [0, 4, 2, 0, 0, 5, 0, 6, 7],
    [1, 0, 0, 8, 4, 0, 0, 0, 0],
    [0, 0, 3, 0, 0, 2, 0, 4, 0],
    [7, 0, 0, 5, 0, 3, 0, 9, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 0],
    [0, 6, 8, 0, 7, 4, 0, 0, 0],
    [0, 0, 0, 4, 3, 8, 0, 0, 6],
    [2, 3, 0, 0, 5, 0, 0, 0, 1],
    [0, 7, 6, 1, 0, 0, 4, 0, 3],
  ]

  readonly emptyBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
  
  readonly sampleBoard24 = [
    [0, 0, 0, 3, 0, 6, 0, 0, 2],
    [9, 0, 3, 7, 0, 0, 5, 0, 1],
    [5, 0, 0, 9, 0, 0, 0, 6, 0],
    [0, 0, 0, 0, 7, 0, 0, 0, 0],
    [0, 0, 4, 1, 0, 9, 2, 0, 0],
    [8, 0, 5, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 9, 1, 6, 0, 5],
    [4, 0, 0, 0, 3, 2, 7, 1, 0],
    [0, 0, 1, 0, 0, 7, 0, 4, 9],
  ]

  board: number[][] = this.emptyBoard;
  private rows: Set<number>[] = [];
  private cols: Set<number>[] = [];
  squares: Square[] = [];

  constructor() {
    this.initWithEmptyBoard();
  }

  init() {
    this.makeRowsAndCols();
    this.makeSquares();
  }

  public initWithBoard(board: number[][]) {
    this.board = [];
    for (const row of board) {
      this.board.push([...row]);
    }
    this.init();
  }

  public initWithSampleBoard() {
    this.initWithBoard(this.sampleBoard);
  }
  public initWithSampleBoard24() {
    this.initWithBoard(this.sampleBoard24);
  }

  public initWithEmptyBoard() {
    this.initWithBoard(this.emptyBoard);
  }

  private makeRowsAndCols() {
    this.rows = new Array(size);
    this.cols = new Array(size);
    for (let i = 0; i < size; i++) {
      this.rows[i] = new Set<number>();
      this.cols[i] = new Set<number>();
    }
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        const val = this.board[row][col];
        if (val !== 0) {
          this.rows[row].add(val);
          this.cols[col].add(val);
        }
      }
    }
  }

  makeSquares(): void {
    this.squares = [];
    for (let row = 0; row < size; row += 3) {
      for (let col = 0; col < size; col += 3) {
        this.squares.push(new Square(row, col, this));
      }
    }
  }

  get(row: number, col: number) {
    return this.board[row][col];
  }

  check(row: number, col: number, val: number): boolean {
    if (!this.rows[row].has(val) && !this.cols[col].has(val)) {
      return true;
    }
    return false;
  }

  set(row: number, col: number, val: number): void {
    this.rows[row].add(val);
    this.cols[col].add(val);
    this.board[row][col] = val;
  }

  setIfPossible(row: number, col: number, val: number): boolean {
    const square = this.getSquare(row, col);
    if (!this.rows[row].has(val) && !this.cols[col].has(val) && !square.has(val)) {
      this.rows[row].add(val);
      this.cols[col].add(val);
      square.add(val);
      this.board[row][col] = val;
      return true;
    }
    return false;
  }

  isComplete(): boolean {
    return this.squares.every(s => s.getMissingCount() === 0);
  }

  solve(): void {
    while (!this.isComplete()) {
      let success = false;
      for (let square of this.squares) {
        while (square.tryAllMissing()) {
          success = true;
          console.log(this.board);
        };
      }
      if (!success) {
        console.log('no solution');
        break;
      }
    }
  }

  step() {
    for (let square of this.squares) {
      if (square.tryFirstMissing()) {
        return;
      };
    }
  }

  getSquareIndex(row: number, col: number): number {
    return Math.ceil(row / 3) + Math.ceil(col / 3);
  }

  private getSquare(row: number, col: number): Square {
    const squareIndex = this.getSquareIndex(row, col);
    return this.squares[squareIndex];
  }

}
