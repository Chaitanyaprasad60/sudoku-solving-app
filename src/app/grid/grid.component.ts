import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  sudokugrid:any[]=[];

  constructor() {
    this.sudokugrid = [[0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0]]
   }

  ngOnInit(): void {
  }

}
