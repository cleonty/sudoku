import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Board } from '../board';

const size = 9;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  readonly board = new Board();
  
  @ViewChildren('square')
  squareElements!: QueryList<ElementRef>;

  constructor() { }


  ngOnInit(): void {
  }
  
  solve(): void {
    this.board.solve();
  }
  
  step(): void {
    this.board.step();
  }
  
  getSquareClass(row: number, col: number): string {
    row = Math.floor(row / 3);
    col = Math.floor(col / 3);
    if ((row != 1 && col != 1) || (row == 1 && col == 1)) {
      return 'high';
    }
    return 'low';
  }
  
  onKeydown(row: number, col: number, event: KeyboardEvent): void {
    if (event.key.match(/\d/)) {
      const val = +event.key;
      this.board.setIfPossible(row, col, val);
    }
  }
  
  focus(row: number, col: number): void {
    const index = row * size + col;
    const element = this.squareElements.get(index);
    if (element) {
      element.nativeElement.focus();
    }
  }
  
  empty(): void {
    this.board.initWithEmptyBoard();
  }
  
  sample(): void {
    this.board.initWithSampleBoard();
  }
  
}
