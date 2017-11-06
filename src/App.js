import React, { Component } from 'react';
// import logo from './logo.svg';
import Board from './components/board/Board';
import BoardModel from './components/board/BoardModel';
import './App.css';

const styles = {
  app: {
    height: '100%',
  },
  header: {
    backgroundColor: '#C4C2A3',
    display: 'flex',
    height: '15%',
    fontSize: '4vh',
  },
  gameTable: {
    backgroundColor: '#341301',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%'
  },
  newGameButton: {
    fontSize: '3vh',
    height: '2.2vh',
    paddingBottom: '4vh',
    margin: '2vh',
  },
  logoStyle: {
    height: '30vh',
    zIndex: '1000',
  },
  Board: {
  },
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new BoardModel()
    };
  }

  newGame = () => {
    alert('I request a new game please');
    this.setState({
      board: new BoardModel()
    });
  }

  render() {
    return (
      <div style={styles.app} className="App">
        <header style={styles.header} className="App-header">
          <button style={styles.newGameButton} onClick={this.newGame}>New Game</button>
          <img style={styles.logoStyle} src={process.env.PUBLIC_URL + '/logo.png'} className="App-logo" alt="logo" />
          <h1 className="App-title">Chess vs Checkers</h1>
        </header>
        <div style={styles.gameTable} className='Game-Table'>
          <Board style={styles.Board} board={this.state.board}/>
        </div>
      </div>
    );
  }
}
