import React from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import Admin from './Admin';
import User from './User';
import NonUser from './NonUser';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      admin: false
    };
  }
  handleLoginOnclick = (event, who) => {
    this.setState({
      login: true,
      admin: who
    });
  }

  render() {
    return (
      <div className="App">
      <Button color="primary" onClick={(e) =>this.handleLoginOnclick(e,true)}>Temp Admin Login</Button>
      <br/>
      <Button color="secondary" onClick={(e) =>this.handleLoginOnclick(e,false)}>Temp User Login</Button>
        {!this.state.login &&
          <NonUser/>
        }
        {this.state.login && this.state.admin &&
          <Admin/>
        }
        {this.state.login && !this.state.admin &&
          <User/>
        }
      </div>
    );
  }
}

export default App;
