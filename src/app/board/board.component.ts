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
  
}
