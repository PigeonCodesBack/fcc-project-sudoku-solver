const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

const okPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const solvedPuzzle = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';

suite('UnitTests', () => {
  test('Logic handles a valid puzzle string of 81 characters',function(done){
    assert.equal(solver.validate(okPuzzle).error, false);
    done();
  });
  
  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)',function(done){
    let puzzle = 'a.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.equal(solver.validate(puzzle).error,'Invalid characters in puzzle');
    done();
  });
  
  test('Logic handles a puzzle string that is not 81 characters in length', function(done){
    let puzzle = '1....5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.equal(solver.validate(puzzle).error, "Expected puzzle to be 81 characters long");
    done();
  });
  
  test('Logic handles a valid row placement', function(done) {
    let grid = solver.toGrid(okPuzzle);
    assert.equal(solver.checkRowPlacement(grid, 0, 1, 3), true);
    done();
  });
  
  test('Logic handles an invalid row placement', function(done) {
    let grid = solver.toGrid(okPuzzle);
    assert.equal(solver.checkRowPlacement(grid, 0, 1, 1), false);
    done();
  });
  
  test('Logic handles a valid column placement', function(done) {
    let grid = solver.toGrid(okPuzzle);
    assert.equal(solver.checkColPlacement(grid, 0, 1, 5), true);
    done();
  });
  
  test('Logic handles an invalid column placement', function(done) {
    let grid = solver.toGrid(okPuzzle);
    assert.equal(solver.checkColPlacement(grid, 0, 1, 6), false);
    done();
  });
  
  test('Logic handles a valid region (3x3 grid) placement', function(done) {
    let grid = solver.toGrid(okPuzzle);
    assert.equal(solver.checkRegionPlacement(grid, 0, 1, 7), true);
    done();
  });
  
  test('Logic handles an invalid region (3x3 grid) placement', function(done) {
    let grid = solver.toGrid(okPuzzle);
    assert.equal(solver.checkRegionPlacement(grid, 0, 3, 5), false);
    done();
  });
  
  test('Valid puzzle strings pass the solver', function(done) {
    assert.equal(solver.solve(solvedPuzzle), '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
    done();
  });
  
  test('Invalid puzzle strings fail the solver', function(done) {
    assert.equal(solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37..'),false);
    done();
  });
  
  test('Solver returns the expected solution for an incomplete puzzle', function(done) {
    assert.equal(solver.solve(okPuzzle), solvedPuzzle);
    done();
  });
});