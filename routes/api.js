'use strict';

// Import the SudokuSolver class
const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  // Create a new instance of the SudokuSolver
  const solver = new SudokuSolver();

  // Regular expressions to validate coordinates and values
  const validCoordinateRegex = /^[A-I][1-9]$/i;
  const validValueRegex = /^[1-9]$/;

  // Endpoint to solve the Sudoku puzzle
  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;

      // Check if the puzzle is provided
      if (!puzzle) {
        return res.json({ error: 'Required field missing' });
      }

      // Validate the puzzle string
      if (solver.validate(puzzle).error) {
        return res.json(solver.validate(puzzle));
      }

      // Solve the puzzle
      const solved = solver.solve(puzzle);

      // Check if the puzzle can be solved
      if (!solved) {
        return res.json({ error: 'Puzzle cannot be solved' });
      }

      // Return the solved puzzle
      res.json({ solution: solved });
    });

  // Endpoint to check the placement of a value in the Sudoku puzzle
  app.route('/api/check')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      const value = req.body.value;
      const coordinate = req.body.coordinate;

      const response = {
        valid: true,
        conflict: []
      };

      // Check if the puzzle, value, and coordinate are provided
      if (!puzzle) {
        return res.json({ error: 'Required field(s) missing' });
      }

      // Validate the puzzle string
      if (solver.validate(puzzle).error) {
        return res.json(solver.validate(puzzle));
      }

      if (!value || !coordinate) {
        return res.json({ error: 'Required field(s) missing' });
      }

      // Validate the coordinate format
      if (!validCoordinateRegex.test(coordinate)) {
        return res.json({ error: 'Invalid coordinate' });
      }

      // Convert the coordinate to row and column indices
      let [row, col] = coordinate.split('');
      row = solver.getRowNum(row);
      col = parseInt(col) - 1;

      // Validate the value format
      if (!validValueRegex.test(value)) {
        return res.json({ error: 'Invalid value' });
      }

      // Convert the puzzle string to a 2D grid
      puzzle = solver.toGrid(puzzle);

      // Define the checks for row, column, and region placement
      const checks = {
        row: solver.checkRowPlacement,
        column: solver.checkColPlacement,
        region: solver.checkRegionPlacement
      };

      // Perform the checks and record any conflicts
      Object.entries(checks).forEach(([conflictName, check]) => {
        if (!check(puzzle, row, col, value)) {
          response.conflict.push(conflictName);
        }
      });

      // If there are conflicts, mark the placement as invalid
      if (response.conflict.length > 0) {
        response.valid = false;
      }

      // Return the response
      return res.json(response);
    });
};