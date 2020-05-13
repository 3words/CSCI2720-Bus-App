import React from 'react';
import './User.css';

class User extends React.Component {

  render() {
    return (
      <div className='User-interface'>
        <div className="header">
          <button className="logout-button btn btn-primary" onClick={this.props.logout}>Logout</button>
          <span className="userName">Hello, {this.props.user}</span>
        </div>
      </div>
    );
  }
}

export default User
