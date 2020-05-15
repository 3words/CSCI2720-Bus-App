/*
Group Memeber:
Yu Chun Fung Ray 1155094125
Pun Man Wing 1155092833
Ho Shing Fung 1155105818
Yip Kai Hin  1155105796
*/

import React from 'react';
import './App.css';
import User from './user/User';
import NonUser from './non_user/NonUser';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      user:""
    };
  }

  handleLogin = (uid) => {
    this.setState({
      login: true,
      user: uid
    });
  }

  handleLogout = (event) => {
    console.log("logout");
    this.setState({
      login: false,
      user: ""
    });
  }

  render() {
    return (
      <div className="App">
        {!this.state.login &&
          <NonUser login={this.handleLogin}/>
        }
        {this.state.login &&
          <User user={this.state.user} logout={this.handleLogout}/>
        }
      </div>
    );
  }
}

export default App;
