import React from 'react';

class SingleLocation extends React.Component {



  render() {
    return (
      <div className="single-location">
        <h5>Location Name: {this.props.relatedStop[0].loc.name}</h5>
      </div>
    );
  }
}

export default SingleLocation
