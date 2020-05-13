import React from 'react';

class User extends React.Component {

  render() {
    return (
      <div className='User-interface'>
        <h1> Hello, {this.props.user} </h1>
        <button className="btn btn-primary btn-block" onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
}

export default User
