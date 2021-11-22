import { Square } from "./square";

const size = 9;

export class Board {

  readonly board = [
    [0, 6, 7, 0, 0, 0, 3, 1, 2],
    [1, 0, 4, 7, 6, 0, 8, 5, 0],
    [0, 0, 0, 0, 2, 0, 0, 7, 6],
    [7, 9, 2, 0, 8, 5, 0, 0, 1],
    [6, 0, 0, 0, 7, 0, 5, 0, 3],
    [3, 0, 5, 6, 0, 0, 0, 0, 0],
    [2, 8, 0, 0, 3, 7, 9, 0, 0],
    [4, 7, 6, 0, 0, 9, 1, 3, 0],
    [0, 0, 3, 0, 1, 0, 0, 2, 0],
  ]
  private rows: Set<number>[] = [];
  private cols: Set<number>[] = [];
  squares: Square[] = [];


  constructor() {
    this.makeRowsAndCols();
    this.makeSquares();
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

}
