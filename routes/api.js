'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {
    let { puzzle, coordinate, value } = req.body;

    if (/[^0-9.]/g.test(puzzle)) {
      return res.json({ error: 'Invalid characters in puzzle' });
    }

    if (puzzle.length != 81) {
      return res.json({ error: 'Expected puzzle to be 81 characters long' });
    }
    if (!puzzle || !value || !coordinate) {
      return res.json({ error: 'Required field(s) missing' });
    }

    if (coordinate.length > 2) {
      return res.json({ error: 'Invalid coordinate' });
    }

    if (value < 1 || value > 9) {
      return res.json({ error: 'Invalid value' });
    }

    if (/[^1-9]/g.test(value)) {
      return res.json({ error: 'Invalid value' });
    }

    const row = solver.getRowFromCoordinates(coordinate);
    const column = solver.getColFromCoordinates(coordinate);

    // if (!row || !column) {
    //   return res.json({ error: 'Invalid coordinate' });
    // }

    let conflict = [];

    if (solver.checkRowPlacement(puzzle, row, column, value)) {
      conflict.push('row');
    }

    if (solver.checkColPlacement(puzzle, row, column, value)) {
      conflict.push('column');
    }

    if (solver.checkRegionPlacement(puzzle, row, column, value)) {
      conflict.push('region');
    }

    if (conflict.length === 0) {
      return res.json({ valid: true });
    } else {
      return res.json({ valid: false, conflict });
    }
  });

  app.route('/api/solve').post((req, res) => {
    let puzzle = req.body.puzzle;

    if (!puzzle) {
      return res.json({ error: 'Required field missing' });
    }

    if (puzzle.length != 81) {
      return res.json({ error: 'Expected puzzle to be 81 characters long' });
    }
    if (/[^0-9.]/g.test(puzzle)) {
      return res.json({ error: 'Invalid characters in puzzle' });
    }

    // Find solution
    let solution = solver.solve(puzzle);

    if (solution) {
      return res.json({ solution });
    } else {
      return res.json({ error: 'Puzzle cannot be solved' });
    }
  });
};
