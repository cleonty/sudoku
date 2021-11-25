import { Board } from './board';

const size = 3;
export class Square {
  private missing = new Set<number>();

  constructor(
    private row: number,
    private col: number,
    private board: Board
  ) {
    this.init();
  }

  private init(): void {
    for (let i = 0; i < 9; i++) {
      this.missing.add(i+1);
    }
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const val = this.board.get(this.row + row, this.col + col);
        if (val !== 0) {
          this.missing.delete(val);
        }
      }
    }
  }

  getMissingCount(): number {
    return this.missing.size;
  }

  private tryMissing(val: number): boolean {
    let found = false;
    let matchedRow: number = -1;
    let matchedCol: number = -1;

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (this.board.get(this.row + row, this.col + col) === 0) {
          if (this.board.check(this.row + row, this.col + col, val)) {
            if (found) {
              return false;
            } else {
              matchedRow = this.row + row;
              matchedCol = this.col + col;
              found = true;
            }
          }
        }
      }
    }
    if (found) {
      this.board.set(matchedRow, matchedCol, val);
    }
    return found;
  }
  
  tryAllMissing(): boolean {
    let success = false;
    for (let val of this.missing) {
      if (this.tryMissing(val)) {
        this.missing.delete(val);
        success = true;
      }
    }
    return success;
  }
  
  tryFirstMissing(): boolean {
    for (let val of this.missing) {
      if (this.tryMissing(val)) {
        this.missing.delete(val);
        return true;
      }
    }
    return false;
  }
  
  has(val: number): boolean {
    return !this.missing.has(val);
  }
  
  add(val: number) {
    this.missing.delete(val);
  }
}
