class SudokuSolver {

  // Validate the puzzle string
  validate(puzzleString) {
    const result = { error: false };
    // Check for invalid characters
    if (/[^1-9||\.]/g.test(puzzleString))
      result.error = "Invalid characters in puzzle";
    // Check for correct length
    if (puzzleString.length != 81)
      result.error = "Expected puzzle to be 81 characters long";
    return result;
  }

  // Convert row letter to row number
  getRowNum(row) {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
    row = row.toLowerCase();
    row = alphabet.indexOf(row);
    if (row < 0 || row > 8) return false;
    return row;
  }

  // Check if a value can be placed in the specified row
  checkRowPlacement(puzzleString, row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (i != column && puzzleString[row][i] == value)
        return false;
    }
    return true;
  }

  // Check if a value can be placed in the specified column
  checkColPlacement(puzzleString, row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (i != row && puzzleString[i][column] == value)
        return false;
    }
    return true;
  }

  // Check if a value can be placed in the specified 3x3 region
  checkRegionPlacement(puzzleString, row, column, value) {
    const rowStart = Math.floor(row / 3) * 3;
    const colStart = Math.floor(column / 3) * 3;
    for (let i = rowStart; i < rowStart + 3; i++) {
      for (let j = colStart; j < colStart + 3; j++) {
        if ((i != row || j != column) && puzzleString[i][j] == value)
          return false;
      }
    }
    return true;
  }

  // Convert puzzle string to 2D grid
  toGrid(puzzleString) {
    puzzleString = puzzleString.split("");
    
    const result = [];
    for (let i = 0; i < 9; i++) {
      result[i] = [];
      for (let j = 0; j < 9; j++) {
        result[i].push(puzzleString[9 * i + j]);
      }
    }
    return result;
  }

  // Check if it's safe to place a number in the specified cell
  isSafe(grid, row, col, num) {
    return (
      this.checkRowPlacement(grid, row, col, num) &&
      this.checkColPlacement(grid, row, col, num) &&
      this.checkRegionPlacement(grid, row, col, num)
    );
  }

  // Helper function to solve the puzzle using backtracking
  solveHelper(grid) {
    let row = -1;
    let col = -1;
    let checkRow, checkCol = -1;
    let value;
    let isEmpty = true;
    // Find an empty cell
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] == ".") {
          row = i;
          col = j;
          isEmpty = false;
          break;
        }
        else {
          checkRow = i;
          checkCol = j;
          value = grid[checkRow][checkCol];
          // Check if the current value is safe
          if (!this.isSafe(grid, checkRow, checkCol, value)) {
            return false;
          }
        }
      }
      if (!isEmpty) break;
    }
    // If no empty cell is found, the puzzle is solved
    if (isEmpty) return grid;
    // Try placing numbers 1-9 in the empty cell
    for (let num = 1; num < 10; num++) {
      if (this.isSafe(grid, row, col, num)) {
        grid[row][col] = num;
        // Recursively solve the rest of the puzzle
        if (this.solveHelper(grid)) return grid;
        else grid[row][col] = '.';
      }
    }
    return false;
  }

  // Solve the puzzle
  solve(puzzleString) {
    // Validate the puzzle string
    if (this.validate(puzzleString).error) return false;
    // Convert the puzzle string to a grid
    let grid = this.toGrid(puzzleString);
    // Solve the puzzle
    let solved = this.solveHelper(grid);
    if (!solved) return solved;
    // Convert the solved grid back to a string
    let res = [].concat(...solved);
    return res.join('');
  }
}

// Export the SudokuSolver class
module.exports = SudokuSolver;
