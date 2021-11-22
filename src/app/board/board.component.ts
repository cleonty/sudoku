import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Board } from '../board';

const size = 9;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  readonly board = new Board();

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
  
}
