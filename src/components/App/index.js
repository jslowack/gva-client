
// src/components/App/index.js
import React, { Component } from 'react';
import classnames from 'classnames';

import './style.css';
import Registration from './../Registration';

class App extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <Registration />
    );
  }
}

export default App;