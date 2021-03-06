const rl = require('readline-sync');

console.log(`\n\nLet's play some TIC TAC TOE!\n\n`);

playTicTacToe();

function playTicTacToe() {


  const board = [
    [`_`, `_`, `_`],
    [`_`, `_`, `_`],
    [`_`, `_`, `_`]
  ];
  let turn = `<-`
  let winner;
  takeTurn();
  playAgain();


  function playAgain() {
    let playAgain = rl.question(`Would you like to play again? (Y/N)`);
    if (answer.toLowercase() === `y`) {
      playTicTacToe();
    } else {
      rl.close();
    }
  }

  function takeTurn() {
    winner = checkBoard();
    if (winner) {
      console.log(`${winner} IS THE WINNER!!!`)
    } else {
      changeTurn();
      printBoard();
      makeMove(...getCoords())
      takeTurn();
    }
  }

  function makeMove(y,x) {
    if (x > 3 || y > 3 || x < 0 || y < 0 || board[y][x] !== '_') {
      console.log(`\n ${x},${y} are invalid coordinates.\n`);
      makeMove(getCoords());
    } else {
      board[y][x] = turn === `<-` ? 'O' : 'X';
    }
  }

  function getCoords () {
    const x = rl.question(`Please enter in coordinates (X,Y) for your move.

      X:`);
    const y = rl.question(`Y:`);
    return [y,x];
  }

  function changeTurn() {
    turn = turn === `<-` ? `->` : `<-`;
  }

  function printBoard() {
    console.log(`

            _ _ _
          2|${board[2][0]}|${board[2][1]}|${board[2][2]}|
        Y 1|${board[1][0]}|${board[1][1]}|${board[1][2]}|
          0|${board[0][0]}|${board[0][1]}|${board[0][2]}|
            0 1 2
              X

Player 1 (O) ${turn} Player 2 (X)

      `)
  }

  function checkBoard () {
    let marker = board[0][0];
    if (marker !== `_`) {
      if (board[0][1] === marker && board[0][2] === marker) return marker;
      if (board[1][0] === marker && board[2][0] === marker) return marker;
      if (board[1][1] === marker && board[2][2] === marker) return marker;
    }
    marker = board[1][1];
    if (marker !== `_`) {
      if (board[1][0] === marker && board[1][2] === marker) return marker;
      if (board[0][1] === marker && board[2][1] === marker) return marker;
      if (board[2][0] === marker && board[0][2] === marker) return marker;
    }
    marker = board[2][2];
    if (marker !== `_`) {
      if (board[2][0] === marker && board[2][1] === marker) return marker;
      if (board[0][2] === marker && board[1][2] === marker) return marker;
    }

    for (let y=0; y<3; y++) {
      for (let x=1; x<3; x++) {
        if (board[y][x] === `_`) {
          return;
        }
      }
    }
    return "No one"
  }
}