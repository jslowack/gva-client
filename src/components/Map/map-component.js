import React, { PropTypes } from 'react';
import GoogleMapReact from 'google-map-react';
import './style.css';
import MapMarker from './../MapMarker';

const MapComponent = (props) => {
  return (
    <div className="c-gmap-container">
      <GoogleMapReact
        center={props.center}
        zoom={props.zoom}
        mapTypeId='terrain'
      >
        {props.users.map((user, index) => (
          <MapMarker {...user} key={`markerid-${index}`} />
        ))}
      </GoogleMapReact>
      <div className="c-gmap-header">go to <b>{props.url}</b></div>
    </div>
  );
};

MapComponent.defaultProps = {
  center: { lat: 59.95, lng: 30.33 },
  zoom: 1,
  minZoom: 1
};

MapComponent.propTypes = {
  url: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired)
    .isRequired
};

export default MapComponent;
