import React, { Component } from 'react';
import logo from './logo.svg';
import Board from './components/board/Board';
import DeadZones from './components/board/DeadZones';
import WhoseTurn from './components/board/WhoseTurn';
import './App.css';

const styles = {
  app: {
    height: '100%',
  },
  header: {
    backgroundColor: '#C4C2A3',
    display: 'flex',
    height: '15%',
    fontSize: '80%',
  },
  gameTable: {
    backgroundColor: '#341301',
    display: 'flex',
    justifyContent: 'space-between',
    height: '90%'
  },
  newGameButton: {
    height: '40px',
    margin: '20px',
  },
  logoStyle: {
    height: '150px',
  },
  DeadZones: {
    height: '90%',
    widght: '25%',
    margin: '4px',
  },
  Board: {

  },
  WhoseTurn: {
    height: '90%',
    width: '10%',
    margin: '50px',
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  newGame = () => {
    alert('I request a new game please');
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
          <DeadZones style={styles.DeadZones}/>
          <Board style={styles.Board}/>
          <WhoseTurn style={styles.WhoseTurn}/>
        </div>
      </div>
    );
  }
}
