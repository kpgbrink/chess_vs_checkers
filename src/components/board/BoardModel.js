const friendSymbol = Symbol('friend');
const foeSymbol = Symbol('foe');

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
    this.moveableSpaces = [];
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
        row.map(piece => {
          if (piece) {
            if (piece.team === this.teamTurn) {
              return friendSymbol;
            }
            return foeSymbol;
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
      if (this.pieceSelected.checkIfMoveable(this.piecePos, {row:row, col:col}, this)) {
        // move the piece if it was moved
        this.locations[row][col] = this.locations[this.piecePos.row][this.piecePos.col];
        this.locations[this.piecePos.row][this.piecePos.col] = null;
        // switch turn.
        //this.teamTurn = this.teamTurn === 'checkers' ? 'chess' : 'checkers';
        this.moveableSpaces = [];
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
    throw new Error('you must override getMoveableSpots()');
  }

  checkIfMoveable(posFrom, posTo, board) {
    return this.getMoveableSpots(posFrom, board.getSimplifiedBoard()).find(spot => posTo.row === spot.row && posTo.col === spot.col);
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
    const checkNormal = function (rowDelta, colDelta) {
      const row = posFrom.row + rowDelta;
      const col = posFrom.col + colDelta;
      if (board[row] && board[row][col] === null) {
        moveableSpaces.push({row: row, col: col})
      }
    }
    const deltas = [
      [1, 1],
      [1, -1],
      // Illegal but just here for now
      [1, 0],
    ].concat(this.king ? [
      [-1, 1],
      [-1, -1],
    ] : []);
    deltas.forEach(pair => checkNormal(pair[0], pair[1]));
    console.log('moveableSpaces', moveableSpaces);
    return moveableSpaces;
  }

  checkIfMoveable(posFrom, posTo, board) {
    const moveable = super.checkIfMoveable(posFrom, posTo, board);
    // logic for making someone a king.
    if (moveable && posTo.row === 7) {
      this.king = true;
      this.image = 'CheckerKingPiece.png';
    }
    return moveable;
  }
}

class ChessPiece extends BoardPiece {
  constructor(team) {
    super(team);
  }

  /**
   * A move is considered valid if it would hit a foe or be an empty spot.
   */
   moveTargetIsValid(board, pos, moveType=null) {
    const [
      row,
      col
    ] = pos;
    const piece = board[row][col];
    if (piece === null || piece.team !== board.teamTurn) {
      if (!moveType) {
        return true;
      } else if (moveType === 'attack') {
        return piece !== null;
      } else if (moveType === 'empty') {
        return piece.team !== board.teamTurn;
      }
    }
    return false;
  }
}

class SimpleChessPiece extends ChessPiece {
  constructor(team, moveDeltas) {
    super(team);
    this.moveDeltas = moveDeltas;
  }

  getMoveableSpots(posFrom, board) {
    return [].concat.apply([], this.moveDeltas.map(moveDelta => {
      const moveRowDelta = moveDelta[0];
      const moveColDelta = moveDelta[1];
      const moveType = moveDelta[2];
      if (typeof moveRowDelta !== 'number' || typeof moveColDelta !== 'number') {
        throw new Error('Invalid move delta');
      }
      const moveToRow = moveRowDelta + posFrom.row;
      const moveToCol = moveColDelta + posFrom.col;
      const validMoves = [];
      if (this.moveTargetIsValid(board, [moveToRow, moveToCol], moveType)) {
        validMoves.push({row: moveToRow, col: moveToCol});
      }
      return validMoves;
    }))
  }
}

class SlidingChessPiece extends ChessPiece {
  constructor(team, slideDeltas) {
    super(team);
    this.slideDeltas = slideDeltas;
  }

  getMoveableSpots(posFrom, board) {
    return [].concat.apply([], this.slideDeltas.map(slideDelta => {
      const slideRowDelta = slideDelta[0];
      const slideColDelta = slideDelta[1];
      if (typeof slideRowDelta !== 'number' || typeof slideColDelta !== 'number') {
        throw new Error(`Invalid slideDelta!`);
      }
      let i = posFrom.row;
      let j = posFrom.col;
      const validMoves = [];
      while (i < 8 && i > -1 && j < 8 && j > -1) {
          i += slideRowDelta;
          j += slideColDelta;
          if (!this.moveTargetIsValid(board, [i, j])) {
            break;
          }
          validMoves.push({
            row: i,
            col: j,
          });
          // If we hit an enemy, stop.
          if (board[i][j]) {
            break;
          }
      }
      return validMoves;
    }));
  }
}

class KingChessPiece extends SimpleChessPiece {
  constructor(team) {
    const moveableSpots = [];
    for (let i = -1; i<2; i++) {
      for (let j= -1; j<2; j++) {
        if (i !== 0 && j !==0) {
          moveableSpots.push([i,j]);
        }
      }
    }
    super(team, moveableSpots);
    this.image = 'KingChessPiece.png';
  }
}

class PawnChessPiece extends SimpleChessPiece {
  constructor(team) {
    super(team, [
      [-1,0,'empty'],
      [-1,1,'attack'],
      [1,1,'attack']
    ]);
    this.image = 'PawnChessPiece.png';
  }
}

class KnightChessPiece extends SimpleChessPiece {
  constructor(team) {
    super(team, [
      [2,1],
      [2,-1],
      [1,2],
      [1,-2],
      [-2,1],
      [-2,-1],
      [-1,2],
      [-1,-2],
    ]);
    this.image = 'KnightChessPiece.png';
  }
}

class RookChessPiece extends SlidingChessPiece {
  constructor(team) {
    super(team, [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]);
    this.image = 'RookChessPiece.png';
  }
}

class QueenChessPiece extends SlidingChessPiece {
  constructor(team) {
    const moveableSpots = [];
    for (let i = -1; i<2; i++) {
      for (let j= -1; j<2; j++) {
        if (i !== 0 && j !==0) {
          moveableSpots.push([i,j]);
        }
      }
    }
    super(team, moveableSpots);
    this.image = 'QueenChessPiece.png';
  }
}

class BishopChessPiece extends SlidingChessPiece {
  constructor(team) {
    super(team, [
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1],
    ]);
    this.image = 'BishopChessPiece.png';
  }
}
