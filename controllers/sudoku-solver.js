var returnSol = require('@mattflow/sudoku-solver');
class SudokuSolver {
  validate(puzzleString) {}

  getRowFromCoordinates(coordinate) {
    const low = coordinate.toLowerCase();
    const match = low.match(/[a-z]/g);

    if (match[0] === 'a') {
      return 1;
    } else if (match[0] === 'b') {
      return 2;
    } else if (match[0] === 'c') {
      return 3;
    } else if (match[0] === 'd') {
      return 4;
    } else if (match[0] === 'e') {
      return 5;
    } else if (match[0] === 'f') {
      return 6;
    } else if (match[0] === 'g') {
      return 7;
    } else if (match[0] === 'h') {
      return 8;
    } else return 9;
  }

  getColFromCoordinates(coordinate) {
    const match = coordinate.match(/[1-9]/g);
    return match[0];
  }

  checkRowPlacement(puzzleString, row, column, value) {
    // const puzzleString = puzzleArray.join('');
    const rows = puzzleString.match(/.{1,9}/g);
    var regex = new RegExp(value, 'g');
    var result = regex.test(rows[row - 1]);

    // Return true if element is present in the row
    return result;
  }

  checkColPlacement(puzzleString, row, column, value) {
    // const puzzleString = puzzleArray.join('');
    let colums = [[], [], [], [], [], [], [], [], []];

    for (var i = 0; i < puzzleString.length; i++) {
      i % 9 === 0
        ? colums[0].push(puzzleString[i])
        : (i - 1) % 9 === 0
        ? colums[1].push(puzzleString[i])
        : (i - 2) % 9 === 0
        ? colums[2].push(puzzleString[i])
        : (i - 3) % 9 === 0
        ? colums[3].push(puzzleString[i])
        : (i - 4) % 9 === 0
        ? colums[4].push(puzzleString[i])
        : (i - 5) % 9 === 0
        ? colums[5].push(puzzleString[i])
        : (i - 6) % 9 === 0
        ? colums[6].push(puzzleString[i])
        : (i - 7) % 9 === 0
        ? colums[7].push(puzzleString[i])
        : colums[8].push(puzzleString[i]);
    }
    var regex = new RegExp(value, 'g');
    var result = regex.test(colums[column - 1]);

    // Return true if element is present in the column
    return result;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // const puzzleString = puzzleArray.join('');
    const tris = puzzleString.match(/.{1,3}/g);

    let regions = [[], [], []];

    // Divide in columns
    for (var i = 0; i < 27; i++) {
      i % 3 === 0
        ? regions[0].push(tris[i])
        : (i - 1) % 3 === 0
        ? regions[1].push(tris[i])
        : (i - 2) % 3 === 0
        ? regions[2].push(tris[i])
        : (i - 3) % 3 === 0;
    }

    // Divide by Regions
    let final = [];

    for (var i = 0; i < regions.length; i++) {
      const n = 3;
      regions[i] = new Array(Math.ceil(regions[i].length / n))
        .fill()
        .map((_) => regions[i].splice(0, n));
      final.push(regions[i][0]);
      final.push(regions[i][1]);
      final.push(regions[i][2]);
    }

    // join strings
    for (var i = 0; i < final.length; i++) {
      final[i] = final[i].join('');
    }

    // Determine witch region should be checked
    let regionToCheck = 0;

    if (column - 1 < 3) {
      if (row - 1 < 3) {
        regionToCheck = 0;
      } else if (row - 1 < 6) {
        regionToCheck = 1;
      } else if (row - 1 < 9) {
        regionToCheck = 2;
      }
    } else if (column - 1 < 6) {
      if (row - 1 < 3) {
        regionToCheck = 3;
      } else if (row - 1 < 6) {
        regionToCheck = 4;
      } else if (row - 1 < 9) {
        regionToCheck = 5;
      }
    } else if (column - 1 < 9) {
      if (row - 1 < 3) {
        regionToCheck = 6;
      } else if (row - 1 < 6) {
        regionToCheck = 7;
      } else if (row - 1 < 9) {
        regionToCheck = 8;
      }
    }

    // Finally check if value is present in final array
    var regex = new RegExp(value, 'g');
    var result = regex.test(final[regionToCheck]);

    // Return true if element is present in the Region
    return result;
  }

  solve(puzzleString) {
    try {
      let solution = returnSol(puzzleString, { emptyValue: '.' });
      return solution;
    } catch (error) {
      if (error) return false;
    }
  }
}

module.exports = SudokuSolver;
