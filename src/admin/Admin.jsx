import React, { useState, useRef } from 'react';
import './Admin.css';
import axios from 'axios';
import { render } from 'react-dom';

class CreateAccount extends React.Component {

  handleSubmit = (event) => {
    var userName = event.target["userName"].value;
    var pw = event.target["password"].value;
    var returnFunction = this.props.register;
    axios.post('/register', {
      userName: userName,
      password: pw
    }).then(function(res) {
      if(res.data === "User successfully registered.") {
        alert("Registered Successfully");
      } else {
        alert("Fail to Register");
      }
    });
  };
  
    render() {
      return (
        <div className='CreateAccount'>
          <form onSubmit={this.handleSubmit}>
            <h2> Create a User Account </h2>
  
            <div className="form-group">
                <label>New User Name:</label>
                <input id="userName" type="text" className="form-control" placeholder="Enter username" />
            </div>
  
            <div className="form-group">
                <label>New User Password:</label>
                <input id="password" type="password" className="form-control" placeholder="Enter password" />
            </div>
  
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      );
    }
}

class ChangeName extends React.Component {

    handleSubmit = (event) => {
      var userName = event.target["userName"].value;
      var NewName = event.target["newName"].value;
      axios.patch('/changeUserName', {
        userName: userName,
        newUserName: NewName
      }).then(function(res) {
        console.log(res.data);
        if(res.data === "valid") {
          alert("Change Successfully");
        } else if(res.data === "Please enter new username") {
          alert("Please fill in the fields") 
        }
          else {
            alert("Input invalid")
          };
        }
      );
    };
    
    render() {
      return (
          <div className='EditName'>
            <form onSubmit={this.handleSubmit}>
              <h2> Update User Name </h2>
    
              <div className="form-group">
                  <label>Current User Name:</label>
                  <input id="userName" type="text" className="form-control" placeholder="Enter username" />
              </div>
    
              <div className="form-group">
                  <label>New User Name:</label>
                  <input id="newName" type="text" className="form-control" placeholder="Enter new username" />
              </div>
    
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
      );
    }
}

class ChangeUserPW extends React.Component {

      handleSubmit = (event) => {
        var userName = event.target["userName"].value;
        var NewName = event.target["newPW"].value;
        axios.patch('/changePassword', {
          userName: userName,
          newPassword: NewName
        }).then(function(res) {
          console.log(res.data)
          if(res.data === "valid") {
            alert("Change Successfully");
          } else {
            alert("Fail to Change");
          }
        });
      };
      
      render() {
        return (
            <div className='EditPW'>
              <form onSubmit={this.handleSubmit}>
                <h2> Update User Password </h2>
      
                <div className="form-group">
                    <label>Current User Name:</label>
                    <input id="userName" type="text" className="form-control" placeholder="Enter username" />
                </div>
      
                <div className="form-group">
                    <label>New Password:</label>
                    <input id="newPW" type="password" className="form-control" placeholder="Enter new password" />
                </div>
      
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
        );
      }
 }

 class DeleteAccount extends React.Component {

  handleSubmit = (event) => {
    var userName = event.target["userName"].value;
    axios.delete('/deleteUser', {
      userName: userName
    }).then(function(res) {
      console.log(res.data);
      if(res.data === "valid") {
        alert("Delete Successfully");
      } else{
        alert("Fail to delete") 
      }
      }
    );
  };
  
  render() {
    return (
        <div className='DeleteAcc'>
          <form onSubmit={this.handleSubmit}>
            <h2> Delete User Account </h2>
  
            <div className="form-group">
                <label>User Name:</label>
                <input id="userName" type="text" className="form-control" placeholder="Enter username" />
            </div>
  
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    );
  }
}

class FlushData extends React.Component {

  handleSubmit = (event) => {
    axios.post('/flushData', {
    }).then(function(res) {
      if(res.data === "Data flush successful") {
        alert("Flush Successfully");
      } else {
        alert("Fail to flush");
      }
    });
  };
  
    render() {
      return (
        <div className='FlushData'>
          <form onSubmit={this.handleSubmit}>
            <h2> Flush Data </h2> 
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      );
    }
}



class Admin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      user:""
    };
  }
  

  handleLogout = (event) => {
    console.log("logout");
    this.setState({
      login: false,
      user:""
    });
  }

render(){
    return (
      <div className='Admin-interface'>
        <div className="header">
          <button className="logout-button btn btn-primary" onClick={this.props.logout}>Logout</button>
        }
          <span className="userName">Welcome, Admin</span>
        </div>
        <div className="CRUDLocation">
          <FlushData/>

        </div>
        <div className="CRUDUser">
          <CreateAccount/>
          <ChangeName/>
          <ChangeUserPW/>
          <DeleteAccount/>

        </div>


      </div>
    );
  }
}

export default Admin;

