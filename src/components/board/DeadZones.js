import React, { Component } from 'react';

const styles = {
  DeadZone: {
    backgroundColor: 'grey',
    marginTop: '20px',
    height: '50%',
    border: '2px solid black',
  },
};

export default class DeadZones extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      style
    } = this.props;

    return (
      <div style={style} className='DeadZones'>
        <div style={styles.DeadZone} className='Checkers-Dead-Zone'>
          <h4>Checkers Dead Zone</h4>

        </div>
        <div style={styles.DeadZone} className='Chess-Dead-Zone'>
          <h4>Chess Dead Zone</h4>

        </div>
      </div>
    );
  }
}
