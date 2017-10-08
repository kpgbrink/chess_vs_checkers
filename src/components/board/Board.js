import React, { Component } from 'react';
import Tile from './Tile';
import BoardModel from './BoardModel';

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
  }
};





export default class Board extends Component {
  constructor(props) {
    super(props);
    this.board = new BoardModel();
    this.state = {
      board: this.board.getState(),

    };
  }

  handleCellClick(row, col) {
    console.log('cells clicked');
    this.board.click(row, col);
  }

  render() {
    const {
      style
    } = this.props;

    return (
      <div style={styles.board} className="Board">
        <table style={styles.table}>
        <tbody style={styles.tbody}>
        {this.state.board.map((row, i) =>
          <tr key={i}>{row.map((cell, j) =>
            <td
              key={j}
              onClick={() => this.handleCellClick(i, j)}
              style={{...styles.tile,
                backgroundImage: 'url(' + process.env.PUBLIC_URL + ((i + j) % 2 === 0 ? '/LightTile.png': 'DarkTile.png') + ')'}}
                ></td>
          )}</tr>
        )}
      </tbody>
      </table>
      </div>
    );
  }
}
