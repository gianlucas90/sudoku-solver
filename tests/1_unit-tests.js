const chai = require('chai');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver();

suite('UnitTests', () => {
  test('Logic handles a valid puzzle string of 81 characters', function (done) {
    let input =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let output =
      '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
    assert.equal(solver.solve(input), output);
    done();
  });

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function (done) {
    let input =
      '..9..5.1.85.4...X2432.....R1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.equal(solver.solve(input), false);
    done();
  });

  test('Logic handles a puzzle string that is not 81 characters in length', function (done) {
    let input =
      '..9..5.1.85.4....2432......44651...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.equal(solver.solve(input), false);
    done();
  });

  test('Logic handles a valid row placement', function (done) {
    let puzzleString =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.equal(solver.checkRowPlacement(puzzleString, 1, 1, 3), false);
    done();
  });

  test('Logic handles an invalid row placement', function (done) {
    let puzzleString =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.equal(solver.checkRowPlacement(puzzleString, 1, 1, 9), true);
    done();
  });

  test('Logic handles a valid column placementt', function (done) {
    let puzzleString =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.equal(solver.checkColPlacement(puzzleString, 1, 1, 4), true);
    done();
  });

  test('Logic handles an invalid column placement', function (done) {
    let puzzleString =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.equal(solver.checkColPlacement(puzzleString, 1, 1, 9), false);
    done();
  });

  test('Logic handles a valid region (3x3 grid) placement', function (done) {
    let puzzleString =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.equal(solver.checkRegionPlacement(puzzleString, 1, 1, 7), false);
    done();
  });

  test('Logic handles an invalid region (3x3 grid) placement', function (done) {
    let puzzleString =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.equal(solver.checkRegionPlacement(puzzleString, 1, 1, 3), true);
    done();
  });

  test('Valid puzzle strings pass the solver', function (done) {
    let input =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let output =
      '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
    assert.equal(solver.solve(input), output);
    done();
  });

  test('Invalid puzzle strings fail the solver', function (done) {
    let input =
      '..9.X5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.equal(solver.solve(input), false);
    done();
  });

  test('Solver returns the the expected solution for an incomplete puzzzle', function (done) {
    let input =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let output =
      '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
    assert.equal(solver.solve(input), output);
    done();
  });
});
