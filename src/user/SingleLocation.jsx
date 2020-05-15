import React from 'react';
import MapView from './MapView';

class SingleLocation extends React.Component {



  render() {
    return (
      <div className="single-location">
        <table style={{width:700 }}> 
            <tr> 
              <th>Location Name</th>
              <td>{this.props.relatedStop[0].loc.name}</td>
            </tr>
            <tr>
              <th>Longitude</th>
              <td>{this.props.relatedStop[0].loc.longitude}</td>
            </tr>
            <tr>
              <th>Latitude</th>
              <td>{this.props.relatedStop[0].loc.latitude}</td>
            </tr>   
        </table>
        <MapView markerOnclick = {null} allInfomation={[this.props.relatedStop[0].loc]}></MapView>
        
      </div>
    );
  }
}

export default SingleLocation
