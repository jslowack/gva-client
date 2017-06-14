import React, { PropTypes } from 'react';
import { Tooltip } from 'react-bootstrap';
import classNames from 'classnames';
import './style.css';
import icon from './heart.png';

const MapMarker = (props) => {
  const toolTipProps = {
    placement: 'top',
    className: props.classes && props.classes.active ? 'in' : '',
    id: 'tooltip'
  };

  return (
    <div className={`c-gmap-marker ${classNames(props.classes)}`}>
      <div>
        <img className="c-gmap-marker__img" alt="" src={props.image ? props.image : icon} />
      </div>
      <Tooltip {...toolTipProps}>{props.name}</Tooltip>
    </div>
  );
}

MapMarker.propTypes = {
  classes: PropTypes.any,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default MapMarker;