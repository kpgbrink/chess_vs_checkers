import React, { Component } from 'react';

// const styles = {
//   header: {
//     display: 'flex',
//
//   },
//   logoStyle: {
//     width: '200px',
//   },
// };

export default class WhoseTurn extends Component {
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
      <div style={style} className="App">
        whose turn?
      </div>
    );
  }
}
