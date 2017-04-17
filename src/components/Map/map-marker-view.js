import React, { Component } from 'react';
import classNames from 'classnames';

import icon from './user.png';

export default class MapMarkerView extends Component {
  render() {
    return (
        <div className={`google-map-marker ${classNames(this.props.classes)}`}>
          <img src={this.props.image ? this.props.image : icon}/>
            {this.props.text}
        </div>
    );
  }
}
