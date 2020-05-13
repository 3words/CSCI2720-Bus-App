import React from 'react';
import axios from 'axios';

class NonUser extends React.Component {

handleSubmit = (event) => {
  var userName = event.target["userName"].value;
  var pw = event.target["password"].value;
  var returnFunction = this.props.login;
  axios.post('/login', {
    userName: userName,
    password: pw
  }).then(function(res) {
    if(res.data === "valid") {
      returnFunction(userName);
    } else {
      alert("Wrong Password!");
    }
  });
};

  render() {
    return (
      <div className='NonUser-interface'>
        <form onSubmit={this.handleSubmit}>
          <h1> Login </h1>

          <div className="form-group">
              <label>Username</label>
              <input id="userName" type="text" className="form-control" placeholder="Enter username" />
          </div>

          <div className="form-group">
              <label>Password</label>
              <input id="password" type="password" className="form-control" placeholder="Enter password" />
          </div>

          <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </form>
      </div>
    );
  }
}

export default NonUser
