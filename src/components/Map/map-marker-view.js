import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Overlay, Tooltip } from 'react-bootstrap';
import classNames from 'classnames';

import icon from './heart.png';

export default class MapMarkerView extends Component {
  render() {
    const sharedProps = {
      placement: 'top',
      show: this.props.classes && this.props.classes.active,
      container: this,
      target: () => ReactDOM.findDOMNode(this.refs.target)
    };

    return (
      <div className={`google-map-marker ${classNames(this.props.classes)}`}>
        <div>
          <img src={this.props.image ? this.props.image : icon} />
          {this.props.text}
        </div>
        <Overlay {...sharedProps}>
          <Tooltip id="tooltip">{this.props.name}</Tooltip>
        </Overlay>
      </div>
    );
  }
}
