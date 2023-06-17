import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {
  sudokugrid:any[]=[];
  solved:boolean;
  boxWidth="3.2"
  validationError = false;

  constructor() {
    this.solved = false;
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

  solveSudoku(){
    console.log(this.sudokugrid)

  }

  getI(i:number,j:number){
    return Math.floor(i/3)*3 + Math.floor(j/3);
  }

  getJ(i:number,j:number){
    return(i%3)*3 + j%3;
  }

  validateInput(i:number,j:number){
    if(Number(this.sudokugrid[i][j])<10 && Number(this.sudokugrid[i][j])>1){
      this.validationError = false;
    }
    else{
      this.validationError = true;
    }

  }

}
