
# Sudoku Solver

Build a full stack JavaScript app that is functionally similar to this: [https://sudoku-solver.freecodecamp.rocks/](https://sudoku-solver.freecodecamp.rocks/). 

* All puzzle logic can go into [`controllers/sudoku-solver.js`](controllers/sudoku-solver.js)

    * The `validate` function should take a given puzzle string and check it to see if it has 81 valid characters for the input.
   
    * The `check` functions should be validating against the _current_ state of the board.
   
    * The `solve` function should handle solving any given valid puzzle string, not just the test inputs and solutions. You are expected to write out the logic to solve this.

* All routing logic can go into [`routes/api.js`](routes/api.js)

* See the [`puzzle-strings.js`](controllers/puzzle-strings.js) file in `/controllers` for some sample puzzles your application should solve

* To run the challenge tests on this page, set `NODE_ENV` to `test` without quotes in the [`.env`](.env) file

* To run the tests in the console, use the command `npm run test`.

## Testing

### Unit testing

Write the following tests in [`tests/1_unit-tests.js`](tests/1_unit-tests.js):

* Logic handles a valid puzzle string of 81 characters

* Logic handles a puzzle string with invalid characters (not 1-9 or `.`)

* Logic handles a puzzle string that is not 81 characters in length

* Logic handles a valid row placement

* Logic handles an invalid row placement

* Logic handles a valid column placement

* Logic handles an invalid column placement

* Logic handles a valid region (3x3 grid) placement

* Logic handles an invalid region (3x3 grid) placement

* Valid puzzle strings pass the solver

* Invalid puzzle strings fail the solver

* Solver returns the expected solution for an incomplete puzzle

### Functional testing

Write the following tests in [`tests/2_functional-tests.js`](tests/2_functional-tests.js)

#### POST

* Solve a puzzle with valid puzzle string: POST request to `/api/solve`

* Solve a puzzle with missing puzzle string: POST request to `/api/solve`

* Solve a puzzle with invalid characters: POST request to `/api/solve`

* Solve a puzzle with incorrect length: POST request to `/api/solve`

* Solve a puzzle that cannot be solved: POST request to `/api/solve`

* Check a puzzle placement with all fields: POST request to `/api/check`

* Check a puzzle placement with single placement conflict: POST request to `/api/check`

* Check a puzzle placement with multiple placement conflicts: POST request to `/api/check`

* Check a puzzle placement with all placement conflicts: POST request to `/api/check`

* Check a puzzle placement with missing required fields: POST request to `/api/check`

* Check a puzzle placement with invalid characters: POST request to `/api/check`

* Check a puzzle placement with incorrect length: POST request to `/api/check`

* Check a puzzle placement with invalid placement coordinate: POST request to `/api/check`

* Check a puzzle placement with invalid placement value: POST request to `/api/check`

## FCC Testing
    
 1. You should provide your own project, not the example URL.  
    
 2. You can `POST` `/api/solve` with form data containing `puzzle` which will be a string containing a combination of numbers (1-9) and periods `.` to represent empty spaces. The returned object will contain a `solution` property with the solved puzzle.
    
 3. If the object submitted to `/api/solve` is missing `puzzle`, the returned value will be `{ error: 'Required field missing' }`
    
 4. If the puzzle submitted to `/api/solve` contains values which are not numbers or periods, the returned value will be `{ error: 'Invalid characters in puzzle' }`
    
 5. If the puzzle submitted to `/api/solve` is greater or less than 81 characters, the returned value will be `{ error: 'Expected puzzle to be 81 characters long' }`
    
 6. If the puzzle submitted to `/api/solve` is invalid or cannot be solved, the returned value will be `{ error: 'Puzzle cannot be solved' }`
    
 7. You can `POST` to `/api/check` an object containing `puzzle`, `coordinate`, and `value` where the `coordinate` is the letter A-I indicating the row, followed by a number 1-9 indicating the column, and `value` is a number from 1-9.
    
 8. The return value from the `POST` to `/api/check` will be an object containing a `valid` property, which is `true` if the number may be placed at the provided coordinate and `false` if the number may not. If false, the returned object will also contain a `conflict` property which is an array containing the strings `"row"`, `"column"`, and/or `"region"` depending on which makes the placement invalid.
    
 9. If `value` submitted to `/api/check` is already placed in `puzzle` on that `coordinate`, the returned value will be an object containing a `valid` property with `true` if `value` is not conflicting.
    
 10. If the puzzle submitted to `/api/check` contains values which are not numbers or periods, the returned value will be `{ error: 'Invalid characters in puzzle' }`
    
 11. If the puzzle submitted to `/api/check` is greater or less than 81 characters, the returned value will be `{ error: 'Expected puzzle to be 81 characters long' }`
    
 12. If the object submitted to `/api/check` is missing `puzzle`, `coordinate` or `value`, the returned value will be `{ error: 'Required field(s) missing' }`
    
 13. If the coordinate submitted to `api/check` does not point to an existing grid cell, the returned value will be `{ error: 'Invalid coordinate'}`
    
 14. If the `value` submitted to `/api/check` is not a number between 1 and 9, the returned value will be `{ error: 'Invalid value' }`
    
 15. All 12 unit tests are complete and passing.
    
 16. All 14 functional tests are complete and passing.