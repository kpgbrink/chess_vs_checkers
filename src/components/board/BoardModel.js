

export default class BoardModel {
  constructor() {
    this.turnCounter = {
      chess: 0,
      checkers: 0,
    }
    // chess is 0, checkers is 1
    this.teamTurn = 'checker';
    this.locations = [];
    this.pieceSelected = false;
    this.moveableSpaces = null;
    this.piecePos = null;
    for (let row=0; row<8; row++) {
      const rowObj = this.locations[row] = [];
      for (let col=0; col<8; col++) {
        if ((row+col) % 2 === 1 && row < 3) {
          // add checker piece
          console.log('placed it');
          rowObj[col] = new CheckerPiece('checker');
        } else {
          rowObj[col] = null;
        }
      }
    }
  }

  getSimplifiedBoard() {
    return this.locations.map(row => (
        row.map(tile => {
          if (tile) {
            if (tile.team === 'checker') {
              return 'checker';
            } else if (tile.team === 'chess') {
              return 'chess';
            }
          }
          return null;
        })
      ));
  }

  click(row, col) {
    console.log('row', row, 'col', col);
    const piece = this.locations[row][col];
    if (piece && piece.team === this.teamTurn) {
      console.log('your piece now');
      this.pieceSelected = piece;
      this.piecePos = {row: row, col: col};
      this.moveableSpaces = piece.getMoveableSpots({row: row, col:col}, this.getSimplifiedBoard());
    } else if (this.pieceSelected) {
      console.log('check if this is a place you can move to if it is move else do nothing');
      // the piece won't move if not possible
      if (this.pieceSelected.checkIfMoveable(this.piecePos, {row:row, col:col}, this.getSimplifiedBoard())) {
        // move the piece if it was moved
        this.locations[row][col] = this.locations[this.piecePos.row][this.piecePos.col];
        this.locations[this.piecePos.row][this.piecePos.col] = null;
        // switch turn.
        //this.teamTurn = this.teamTurn === 'checkers' ? 'chess' : 'checkers';
      }
    } else {
      console.log('nothing should happen here', this.locations[row][col]);
      this.pieceSelected = null;
    }
  }
  getMoveableSpaces() {
    return this.moveableSpaces;
  }

  getState() {
    return this.locations.map(row => row.map(tile => {
      // do some dat logic
      return tile;
    }));
  }
}

class BoardPiece {
  constructor(team) {
    // pos row: and col:
    this.team = team
  }

  getMoveableSpots(posFrom, board) {
    console.error('you must override getMoveableSpots()');
    return [];
  }

  checkIfMoveable(posFrom, posTo, board) {
    return this.getMoveableSpots(posFrom, board).find(spot => posTo.row === spot.row && posTo.col === spot.col);
  }

}

class CheckerPiece extends BoardPiece {
  constructor(team) {
    super(team);
    this.king = false;
    this.image = 'CheckerPiece.png';
  }

  getMoveableSpots(posFrom, board) {
    // for checkers if king then going down.
    console.log('board', board);
    const moveableSpaces = [];
    // normal movement
    const checkNormal = function (row, col) {
      if (board[row] && board[row][col] === null) {
        moveableSpaces.push({row: row, col: col})
      }
    }
    checkNormal(posFrom.row+1, posFrom.col+1);
    checkNormal(posFrom.row+1, posFrom.col-1);
    if (this.king) {
      checkNormal(posFrom.row-1, posFrom.col+1);
      checkNormal(posFrom.row-1, posFrom.col-1);
    }
    console.log('moveableSpaces', moveableSpaces);
    return moveableSpaces;
  }

}

class ChessPiece extends BoardPiece {
  constructor(team) {
    super(team);
  }

}
