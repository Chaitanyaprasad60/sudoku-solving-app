# 9x9 Sudoku 
#Used RECURSION AND BACKTRACKING 
#Definite Cells approach worked for 4x4 but not 9x9. 

print("          SUDOKO SOLVER")
print("input sudoko",end='\n\n')

sudoku=['0 0 2  4 6 0  0 0 0'.split(),
   '9 8 5  0 0 0  0 0 0'.split(),
   '0 0 0  0 2 0  9 0 0'.split(),
   
   '7 0 0  0 0 0  0 2 0'.split(),
   '0 0 9  8 0 7  6 0 0'.split(),
   '0 4 0  0 0 0  0 0 3'.split(),
   
   '0 0 1  0 9 0  0 0 0'.split(),
   '0 0 0  0 0 0  5 7 4'.split(),
   '0 0 0  0 3 5  2 0 0'.split()]  #Evil Level



 
row = [[],[],[],[],[],[],[],[],[]]
col = [[],[],[],[],[],[],[],[],[]]
box = [[],[],[],[],[],[],[],[],[]]

def getBox(cor):
    if(0<=cor[0]<=2):
        if(0<=cor[1]<=2):
            ans = 0
        elif(3<=cor[1]<=5):
            ans = 1
        else:
            ans = 2
    elif(3<=cor[0]<=5):
        if(0<=cor[1]<=2):
            ans = 3
        elif(3<=cor[1]<=5):
            ans = 4
        else:
            ans = 5
    else:
        if(0<=cor[1]<=2):
            ans = 6
        elif(3<=cor[1]<=5):
            ans = 7
        else:
            ans = 8
    return ans
            
def intialSetup():
    for i in range(9):
        for j in range(9):
            row[i].append(0)
            col[i].append(0)
            box[i].append(0)
    for i in range(9):
        for j in range(9):
            if(sudoku[i][j]!='0'):
                cor = int(sudoku[i][j])-1
                row[i][cor]=1
                col[j][cor]=1
                box[getBox((i,j))][cor]=1
    
        

        
for i in sudoku:
    print(i)

# Backtracking Function
def solve(start=(0,0)):

    if(sudoku[start[0]][start[1]]!='0'):
        if(start==(8,8)):
            print("Solved Sudoko")
            for i in sudoku:
                print(i)
            return True
        if(start[1]+1<=8):
            k = solve((start[0],start[1]+1))
        if(start[1]==8):
            if(start[0]+1<=8):
                k = solve((start[0]+1,0))
        return k
       
    else:
        for i in range(1,10):
           
            one = row[start[0]][i-1]==0  #True if number not present in row
            two = col[start[1]][i-1]==0  #True if number not present in column
            three = box[getBox((start[0],start[1]))][i-1]==0 #True if number not present in Square
            
            if( one and two and three):              
                sudoku[start[0]][start[1]] = str(i)  #Try one number and see if it works
                row[start[0]][i-1] = 1               #Update Board Variables
                col[start[1]][i-1] = 1
                box[getBox((start[0],start[1]))][i-1] = 1                
                k = solve(start)
                if(k):
                    break
                else:
                    row[start[0]][i-1] = 0        #If k is False - Reset Board to original Position. 
                    col[start[1]][i-1] = 0
                    box[getBox((start[0],start[1]))][i-1] = 0
        
        sudoku[start[0]][start[1]]=str(0)
        return False  #As K is not set anytime            
                    
                
def sudokuSolver():
    intialSetup()   #Set rows,cols and Square bits
    solve()        #Solve using recursion


sudokuSolver()
                                 
                
        
        
        
        
    
