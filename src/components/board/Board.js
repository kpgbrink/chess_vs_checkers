import React, { Component } from 'react';

const styles = {
  board: {
    height: '95%',
  },
  header: {
    display: 'flex',
  },
  logoStyle: {
    width: '200px',
  },
  table: {
    border: '10px solid black',
  },
  tbody: {
  },
  tile: {
    height: '9vh',
    width: '9vh',
  },
  piece: {
    height: '90%',
    width: '90%',
  }
};


export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.props.board.getState(),
      moveableSpaces: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('reeeee');
    this.getBoardState(nextProps.board);
  }

  getBoardState(board) {
    this.setState({
      board: board.getState(),
      moveableSpaces: board.getMoveableSpaces(),
    });
  }

  handleCellClick(row, col) {
    console.log('cells clicked');
    this.props.board.click(row, col);
    this.getBoardState(this.props.board);
  }

  render() {
    const state = this.state;
    console.log(state.moveableSpaces.find(spot => 0 === spot.row && 1 === spot.col));

    return (
      <div style={styles.board} className="Board">
        <table style={styles.table}>
        <tbody style={styles.tbody}>
        {state.board.map((row, i) =>
          <tr key={i}>{row.map((cell, j) => {
            const moveable = !!state.moveableSpaces.find(spot => i===spot.row && j===spot.col) ? 'Moveable' : '';
            const backgroundImage = 'url(' + process.env.PUBLIC_URL
            + ((i + j) % 2 === 0 ?
            '/LightTile' + moveable + '.png' :
            '/DarkTile' + moveable + '.png') + ')';
            console.log(!!state.moveableSpaces.find(spot => i===spot.row && j===spot.col) ? 'Moveable' : 'hey');
            return <td
              key={j}
              onClick={() => this.handleCellClick(i, j)}
              style={{...styles.tile,
                backgroundImage: backgroundImage
                }}
                >{this.state.board[i][j] && <img style={styles.piece} src={process.env.PUBLIC_URL + `/${this.state.board[i][j].image}`} alt={this.state.board[i][j].image}/>} </td>
            }
          )}</tr>
        )}
      </tbody>
      </table>
      </div>
    );
  }
}
