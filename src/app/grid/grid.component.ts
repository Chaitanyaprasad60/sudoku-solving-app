import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {
  sudokugrid: any[] = [];
  solved: boolean = false;
  boxWidth = "3.2"
  validationError = false;
  ans: any[] = [];
  row: any[] = [];
  col: any[] = [];
  box: any[] = [];
  inLastCondition = false;
  counter = 0;
  notSolvable = false;
  invalidSudoku = false;
  rowColBox = [-1, -1];
  zeroes = [[0, 0, 0, 0, 0, 0, 0, 0, 0],  //9*9 grid that represents the empty sudoku.
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]];

  constructor() {

    this.initializeArrays();

  }

  ngOnInit(): void {
  }

  //this function first checks whether the sudoku is valid and then solves the grid. 
  solveSudoku() {
    this.invalidSudoku = false;
    this.ans = JSON.parse(JSON.stringify(this.sudokugrid));
    this.rowColBox = this.updateRowColBox();
    if (this.rowColBox[0] == -1 && this.rowColBox[1] == -1) {
      this.intialSetup();
      this.solve();
    }
    else {
      this.invalidSudoku = true;
    }


  }

  getI(i: number, j: number) {
    return Math.floor(i / 3) * 3 + Math.floor(j / 3);
  }

  getJ(i: number, j: number) {
    return (i % 3) * 3 + j % 3;
  }

  //Solves the whole Sudoku grid based on Backtracking. 
  solve(start = [0, 0]): boolean | undefined {
    this.counter += 1;
    if (this.counter > 10000000) {
      //console.log("This Sudoku is not solvable",this.counter)
      this.solved = true;
      this.notSolvable = true;
      return false;
    }
    if (this.ans[start[0]][start[1]] != '0' && this.ans[start[0]][start[1]]!='') {
      let k;
      if (start[0] === 8 && start[1] === 8) {
        //console.log('Solved Sudoku Successfully!!', this.counter);
        this.solved = true;
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
      if (!insideLoop) {
        this.ans[start[0]][start[1]] = '0';
        return false;
      }
      return k;
    }
  }

  //This is a helper function for sudoku Solving 
  //This function returns the box number given i,j in sudoku grid
  getBox(cor: [number, number]) {
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
  

  //This Functions checks the whole sudoku Grid and return the first invalid element
  //Examples of Invalid Elements - Same numbers in row/column/box, Any number or letter except 1-9
  updateRowColBox() {
    this.row = JSON.parse(JSON.stringify(this.zeroes));
    this.col = JSON.parse(JSON.stringify(this.zeroes));
    this.box = JSON.parse(JSON.stringify(this.zeroes));
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.ans[i][j] != '0'  && this.ans[i][j] !== '') {
          if(isNaN(parseInt(this.ans[i][j]))){   //To restrict users from entering any Letters
            return [i,j]
          }
          const cor = parseInt(this.ans[i][j]) - 1;
          if(cor > 8 || cor < 0){ //To restrict users from entering any number other than 1-9
            return [i,j]
          }
          if (this.row[i][cor] == 1 || this.col[j][cor] == 1 || this.box[this.getBox([i, j])][cor] == 1) {
            console.log(i, j, this.row, this.col, this.box)
            return [i, j]
          }
          else {
            this.row[i][cor] = 1;
            this.col[j][cor] = 1;
            this.box[this.getBox([i, j])][cor] = 1;
          }

        }
      }
    }
    return [-1, -1]
  }

  //This function freshly assigns rows,columns and boxes which will help in solving sudoku
  intialSetup() {
    try {
    this.row = JSON.parse(JSON.stringify(this.zeroes));
    this.col = JSON.parse(JSON.stringify(this.zeroes));
    this.box = JSON.parse(JSON.stringify(this.zeroes));
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (this.ans[i][j] !== '0' && this.ans[i][j] !== '') {
            const cor = parseInt(this.ans[i][j]) - 1;
            this.row[i][cor] = 1;
            this.col[j][cor] = 1;
            this.box[this.getBox([i, j])][cor] = 1;
          }
        }
      }

    }
    catch (error) {

    }

  }
  //This function initializes all arrays to reset state. 
  initializeArrays() {
    this.invalidSudoku = false;
    this.rowColBox = [-1, -1];
    this.counter = 0;
    this.notSolvable = false;
    this.solved = false;
   
    this.sudokugrid =  [['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],];
    this.ans = JSON.parse(JSON.stringify(this.zeroes));
    this.row = JSON.parse(JSON.stringify(this.zeroes));
    this.col = JSON.parse(JSON.stringify(this.zeroes));
    this.box = JSON.parse(JSON.stringify(this.zeroes));
  }

  reset() {
    this.initializeArrays();
  }

  isBold(i:number,j:number){
    let x = this.getI(i,j);
    let y = this.getJ(i,j);
    return this.sudokugrid[x][y]!='0' && this.sudokugrid[x][y]!=''
  }



}
