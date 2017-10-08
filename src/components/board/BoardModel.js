

export default class BoardModel {
  constructor() {
    this.turnCounter = {
      chess: 0,
      checkers: 0,
    }
    // chess is 0, checkers is 1
    this.teamTurn = 'chess';
    this.locations = [];
    this.pieceSelected = false;
    this.moveableSpace = null;
    for (let i=0; i<8; i++) {
      const row = this.locations[i] = [];
      for (let j=0; j<8; j++) {
        row[j] = {};
      }
    }
  }

  click(row, col) {
    console.log('row', row, 'col', col);
    const piece = this.locations[row][col];
    if (piece.team === this.teamTurn) {
      console.log('your piece now');
      this.pieceSelected = true;
      this.moveableSpaces = piece.click(this.locations);
    } else if (this.pieceSelected) {
      console.log('check if this is a place you can move to');
    } else {
      console.log('nothing should happen here');
    }
  }

  getState() {
    return this.locations.map(x => x);
  }
}

class BoardPiece {
  constructor(position, team) {
    // position x: and y:
    this.position = position;
    this.team = team
  }

  click() {
    // show the possible places I can go
    console.error('override this function');
  }
}

class CheckerPiece extends BoardPiece {
  constructor(position, team) {
    super(position, team);

  }

  click() {

  }
}

class ChessPiece extends BoardPiece {
  constructor(position, team) {
    super(position, team);
  }

  click() {

  }
}
