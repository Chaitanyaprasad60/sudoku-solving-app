# 4 by 4 SUDOKO SOLVER
# Initial Attempt to solve sudoku by marking all definite cells


def findSquareNumber(i,j):
    for squareNumber in ['1','2','3','4']:
        if (i,j) in squareMapping[squareNumber]:
            return squareNumber

def prints(a):
    for i in a:
        print(' '.join(i))
    print('')

print("          SUDOKO SOLVER")
print("Input sudoko - Enter 4 numbers in each line with a space",end='\n\n')

# Sudoku - Can be entered by User
# sudoku = []
# sudoku.append(input("Row 1 - ").split())
# sudoku.append(input("Row 2 - ").split())
# sudoku.append(input("Row 3 - ").split())
# sudoku.append(input("Row 4 - ").split())

# Sudoku - Default Input 
sudoku=['0 0 4 0'.split(),'4 0 3 0'.split(),'0 4 0 3'.split(),'0 1 0 0'.split()]

print("Entered Sudoko")
prints(sudoku)

# A Mapping Showing What Cells belong in which Square.
squareMapping = {'1': [(0, 0), (0, 1), (1, 0), (1, 1)], 
                 '2': [(2, 0), (2, 1), (3, 0), (3, 1)], 
                 '3': [(0, 2), (0, 3), (1, 2), (1, 3)], 
                 '4': [(2, 2), (2, 3), (3, 2), (3, 3)]}  
empty=[]
choice={}

# Step 1 - Collect all Empty Cells into a list. 
for i in range(4):
    for j in range(4): #adding data of which sqaure it belongs to
        if sudoku[i][j]=='0':
            empty.append((i,j))
            choice[(i,j)]=[]


# Step 2 - Iterate over all Empty Cells and see What choices are not possible. 
# Example - If a 2 is present in Square 1 then 2 can't be in any other cell of square 1. 
for i,j in empty:

    squareNumber = findSquareNumber(i,j)  #Find what Square does this i,j belong to.   
   
    notPossibleForThisCell = []
    for k,l in squareMapping[squareNumber]:  #Iteraing over all Cells in a Square to see which numbers are present
        if sudoku[k][l]!=0:
            notPossibleForThisCell.append(sudoku[k][l])
        
    for k in range(4):   #Iteraing over all Cells in a rows and col to see which numbers are present
        for l in range(4):
            if k==i:
                notPossibleForThisCell.append(sudoku[k][l])
            if l==j:
                notPossibleForThisCell.append(sudoku[k][l])
    notPossibleForThisCell=list(set(notPossibleForThisCell))

    for allPossibleNumbers in ['1','2','3','4']:
        if allPossibleNumbers not in notPossibleForThisCell:
            choice[(i,j)].append(allPossibleNumbers)



while True:
    flag=0
    rem=[]
    for i,j in empty:
        if len(choice[(i,j)])==1: #If one element is present in choice means that number can be filled in that place
            flag=1
            sudoku[i][j]=choice[(i,j)][0]
            rem.append((i,j))
            del choice[(i,j)]
            
            squareNumber = findSquareNumber(i,j)

            #Updating Choice Matrix of other cells in that square,row and col respectively. 
            for k,l in squareMapping[squareNumber]:
                if sudoku[k][l]=='0':
                    if (k,l) in choice.keys() and sudoku[i][j] in choice[(k,l)]:
                        choice[(k,l)].remove(sudoku[i][j])
            for k in range(4):
                if (i,k) in choice.keys() and sudoku[i][j] in choice[(i,k)]:
                    choice[(i,k)].remove(sudoku[i][j])
                
            for k in range(4):
                if (k,j) in choice.keys() and sudoku[i][j] in choice[(k,j)]:
                    choice[(k,j)].remove(sudoku[i][j])                        
                    

    for h,l in rem:
        empty.remove((h,l))
    if flag==0:
        break

print("Answer is solvable till here so far - ")
prints(sudoku)
                        
            
    
def solve(empty):
    if len(empty)==0:
        prints(sudoku)
        return 1
    

    

    
    
    

    
    
    

