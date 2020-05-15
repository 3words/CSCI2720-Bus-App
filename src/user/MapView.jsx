import React from 'react';
import './MapView.css';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '50%',
};
class MapView extends React.Component {
  constructor(props) {
    super(props);
  }

  displayMarkers = (markerOnclick,allInfomation) => {
    return allInfomation.map((singleLocation, index) => {
      return <Marker key={index} id={index} position={{
       lat: singleLocation.latitude,
       lng: singleLocation.longitude
     }}
     onClick={() => markerOnclick(singleLocation.locationID)} />
    })
  }

  render() {
    return (
        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          initialCenter={{ lat: 22.399290, lng: 114.169060}}
        >
        {this.displayMarkers(this.props.markerOnclick,this.props.allInfomation)}
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDz8-bAExpW0c8gTCEdpTnmo-t4sycEHlc'
})(MapView);