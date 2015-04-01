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
  var n = n || 3;
  var matrix = window.makeEmptyMatrix(n);
  for (var i = 0; i < n; i++) {
    matrix[i][i] = 1;
  }
  return matrix;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var n = n || 3;
  var solutionCount = 0;

  var board = new Board(window.makeEmptyMatrix(n));

  var recursive = function(board , row) {
    for(var i = 0; i < n; i++) {
      board.togglePiece(row, i);
        window.printMatrix(board.rows());
      if(!board.hasAnyRooksConflicts()) {

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
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
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
}

