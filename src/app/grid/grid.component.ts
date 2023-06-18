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
  ans:any[]=[];
  row:any[]=[];
  col:any[]=[];
  box:any[]=[];
  inLastCondition = false;

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
    this.ans = [[0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]]
    this.row = [[0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0]]
  

      this.col = [[0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0]]

      this.box = [[0,0,0,0,0,0,0,0,0],
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
    this.ans = JSON.parse(JSON.stringify(this.sudokugrid));
    this.intialSetup();    
    this.solve();    

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

  solve(start = [0, 0]):boolean|undefined {
    if (this.ans[start[0]][start[1]] != '0') {
      let k;
      if (start[0] === 8 && start[1] === 8) {
        console.log('Solved Sudoku Successfully!!');
        this.inLastCondition = true;
        return true;
      }
      if (start[1] + 1 <= 8) {
        k = this.solve([start[0], start[1] + 1]);
      }
      if (start[1] === 8) {
        if (start[0] + 1 <= 8) {
          k = this.solve([start[0] + 1, 0]);
        }
      }
      return k;
    } else {
      let k;
      let insideLoop = false;
      for (let i = 1; i <= 9; i++) {
        let one = this.row[start[0]][i - 1] === 0;
        let two = this.col[start[1]][i - 1] === 0;
        let three = this.box[this.getBox([start[0], start[1]])][i - 1] === 0;
  
        if (one && two && three) {
          this.ans[start[0]][start[1]] = i.toString();
          this.row[start[0]][i - 1] = 1;
          this.col[start[1]][i - 1] = 1;
          this.box[this.getBox([start[0], start[1]])][i - 1] = 1;
          k = this.solve(start);
          if (k) {
            insideLoop = true;
            break;
          } else {
            this.row[start[0]][i - 1] = 0;
            this.col[start[1]][i - 1] = 0;
            this.box[this.getBox([start[0], start[1]])][i - 1] = 0;
          }
        }
      }
      if(!insideLoop) {
        this.ans[start[0]][start[1]] = '0';
        return false;
      }
      return k;
    }
  }

  getBox(cor:[number,number]) {
    let ans;
    if (0 <= cor[0] && cor[0] <= 2) {
      if (0 <= cor[1] && cor[1] <= 2) {
        ans = 0;
      } else if (3 <= cor[1] && cor[1] <= 5) {
        ans = 1;
      } else {
        ans = 2;
      }
    } else if (3 <= cor[0] && cor[0] <= 5) {
      if (0 <= cor[1] && cor[1] <= 2) {
        ans = 3;
      } else if (3 <= cor[1] && cor[1] <= 5) {
        ans = 4;
      } else {
        ans = 5;
      }
    } else {
      if (0 <= cor[1] && cor[1] <= 2) {
        ans = 6;
      } else if (3 <= cor[1] && cor[1] <= 5) {
        ans = 7;
      } else {
        ans = 8;
      }
    }
    return ans;
  }

  intialSetup() {
    try{
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (this.ans[i][j] !== '0') {
            const cor = parseInt(this.ans[i][j]) - 1;
            this.row[i][cor] = 1;
            this.col[j][cor] = 1;
            this.box[this.getBox([i, j])][cor] = 1;
          }
        }
      }
   
    }
    catch(error){
 
    }
    
  }
  
  

}
