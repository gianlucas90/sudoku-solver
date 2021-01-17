const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('UnitTests', () => {
  test('valid puzzle string of 81 characters', function (done) {
    let input =
      '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let output =
      '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
    assert.equal(solver.solve(input), output);
    done();
  });

  test('puzzle string with invalid characters (not 1-9 or .)', function (done) {
    let input =
      '..9.X5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let output =
      '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
    assert.equal(solver.solve(input), output);
    done();
  });
});
