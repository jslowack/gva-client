import React, { Component, PropTypes } from 'react';
import controllable from 'react-controllables';
import GoogleMapReact from 'google-map-react';
import './style.css';
import MapMarkerView from './map-marker-view';
import shouldPureComponentUpdate from 'react-pure-render/function';

class MapView extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    static defaultProps = {
        center: {lat: 59.95, lng: 30.33},
        zoom: 1,
	    minZoom: 1
    };
    
    static propTypes = {
        users: PropTypes.arrayOf(
            PropTypes.shape({
            name: PropTypes.string.isRequired,
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired
            }).isRequired)
        .isRequired
    }

  render() {
    return (
      <div className="google-map-container">  
      <GoogleMapReact
        center={this.props.center}
        zoom={this.props.zoom}
        mapTypeId='terrain'
      >
        {this.props.users.map((user, index) => (
            <MapMarkerView {... user} key={`markerid-${index}`} />
        ))}
      </GoogleMapReact> 
      </div>
    );
  }
}

export default controllable(MapView, ['center', 'zoom', 'users', 'markers']);
