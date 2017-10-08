import React, { Component } from 'react';

const styles = {
  header: {
    display: 'flex',
    
  },
  logoStyle: {
    width: '200px',
  },

};

export default class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="App">
        I am a tile
      </div>
    );
  }
}
