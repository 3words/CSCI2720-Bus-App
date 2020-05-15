import React from 'react';
import MapView from './MapView';
import Comment from './Comment';
import AddFavour from './AddFavour'
class SingleLocation extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      addFavour:false
    };
  }

  handleAddFavouriteLocation = ()=>{
    this.setState({
      addFavour:!this.state.addFavour
    })
 }


 
  render() {
    return (
      <div className="single-location">
      <button className="btn btn-primary btn-block" onClick={this.props.back}>Go Back</button>
      
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
        <Comment user={this.props.user} singleLocation={[this.props.relatedStop[0].loc]} ></Comment>

        <button className="btn btn-primary btn-block" onClick={this.handleAddFavouriteLocation}>Add favourite Location</button>
        {this.state.addFavour &&
            <AddFavour user={this.props.user} favourLocation={this.props.relatedStop[0].loc} ></AddFavour>
        }
        <MapView markerOnclick = {()=>false} allInfomation={[this.props.relatedStop[0].loc]}></MapView>
      </div>
    );
  }
}

export default SingleLocation
