import React from 'react';
import axios from 'axios';
import './Map.css';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
const mapStyles = {
    width: '50%',
    height: '50%'
  };

  export class MapContainer extends Component {
      render() {
        return (
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
             lat: -1.2884,
             lng: 36.8233
        }}
          />
        );
  }
}

export default GoogleApiWrapper({
      apiKey: 'AIzaSyDz8-bAExpW0c8gTCEdpTnmo-t4sycEHlc'
})(MapContainer);


class Map extends React.Component {



    render() {
        return (
            
          <div id='map' className="map">
                
          </div>
        );
      }
}

export default Map;
