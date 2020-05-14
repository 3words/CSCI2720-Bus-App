import React from 'react';
import './MapView.css';

class Map extends React.Component {
    googleMapRef = React.createRef()

    componentDidMount() {
        const googleMapScript = document.createElement('script')
        googleScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDz8-bAExpW0c8gTCEdpTnmo-t4sycEHlc&libraries=places`
        window.document.body.appendChild(googleScript)
    
        googleScript.addEventListener('load', {
          googleMap = this.createGoogleMap() 
        })
        googleScript.addEventListener('load', {
            marker = this.createMarker()
          })
      }
      createGoogleMap = () =>
      new window.google.maps.Map(this.googleMapRef.current, {
        zoom: 16,
        center: {
          lat: 43.642567,
          lng: -79.387054,
        },
        disableDefaultUI: true,
      })
  
    createMarker = () =>
      new window.google.maps.Marker({
        position: { lat: 43.642567, lng: -79.387054 },
        map: this.googleMap,
      })

    render() {
        return (
            
            <div
            id="google-map"
            ref={this.googleMapRef}
            style={{ width: '400px', height: '300px' }}
          />
        );
      }
}

export default Map;
