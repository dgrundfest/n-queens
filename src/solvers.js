/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var matrix = window.makeEmptyMatrix(n);
  for (var i = 0; i < n; i++) {
    matrix[i][i] = 1;
  }
  return matrix;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var board = new Board(window.makeEmptyMatrix(n));

  var recursive = function(board , row) {
    for(var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if(!board.hasColConflictAt(i)) {
   // if(!board.hasRowConflictAt(row) && !board.hasColConflictAt(i)) {
        if(row === n-1) {
          solutionCount++;
        }
        else {
         recursive(board,row+1);
        }
      }
      board.togglePiece(row,i);
    }
  };
  recursive(board,0);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) return [];
  result = window.countNQueensSolutions(n,true);
  if (!Array.isArray(result)) {
    return makeEmptyMatrix(n);
  }
  return result;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n, firstSol) {
  if (n === 0) {
    return 1;
  }
  var solutionCount = 0;
  var martixContainer;
  var gotFirstMatrix = false;
  var firstSol =  firstSol || false;
  var board = new Board(window.makeEmptyMatrix(n));

  var recursive = function(board , row) {
    for(var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if(!board.hasAnyQueenConflictsOn(row,i)) {

        if(row === n-1) {
          solutionCount++;
          if (firstSol && !gotFirstMatrix) {
            matrixContainer = window.copyMatrix(board.rows());
            gotFirstMatrix = true;
          }
        }
        else {
         recursive(board,row+1);
        }
      }
      board.togglePiece(row,i);
    }
  };
  recursive(board,0);

  if (firstSol && gotFirstMatrix) {
      return matrixContainer;
  }
  return solutionCount;
};

window.makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
};

window.printMatrix = function(matrix){
  console.log('start matrix');
  for(var i = 0; i < matrix.length; i++){
    console.log(matrix[i].toString());
  }
  console.log('end matrix');
};

window.copyMatrix = function(matrix){
  var newMatrix = [];
  for(var i = 0;i < matrix.length; i++){
    var row = [];
    for(var j = 0;j < matrix.length; j++){
      row.push(matrix[i][j]);
    }
    newMatrix.push(row);
  }
  return newMatrix;
};
