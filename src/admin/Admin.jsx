import React, { useState, useRef } from 'react';
import './Admin.css';
import axios from 'axios';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

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
        alert("Failed to register");
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
          alert("Changed Successfully");
        } else {
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
            alert("Changed Successfully");
          } else {
            alert("Input Invalid");
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
    var deleteURL = '/deleteUser/'+userName;
    axios.delete(deleteURL, {
      userName: userName
    }).then(function(res) {
      console.log(res);
      if(res.data === "valid") {
        alert("Deleted Successfully");
      } else{
        alert("User not found!") 
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


class ChangeLocationName extends React.Component {

  handleSubmit = (event) => {
    var newLocationName = event.target["new"].value;
    var oldLocationName = event.target["current"].value;
    axios.patch('/changeLocationName', {
      newLocationName:newLocationName,
      oldLocationName:oldLocationName
    }).then(function(res) {
      if(res.data === "valid") {
        alert("Changed Successfully");
      } else {
        alert("Failed to Change");
      }
    });
  };
  
  render() {
    return (
        <div className='LocationName'>
          <form onSubmit={this.handleSubmit}>
            <h2> Change Location Name </h2>
  
            <div className="form-group">
                <label>Current Location Name:</label>
                <input id="current" type="text" className="form-control" placeholder="Enter old location" />
            </div>

            <div className="form-group">
                <label>New Location Name:</label>
                <input id="new" type="text" className="form-control" placeholder="Enter new location" />
            </div>
  
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    );
  }
}

class Admin extends React.Component{
  


render(){
    return (
      <div className='Admin-interface'>
        <div className="header">
        <Link to="/">
          <button className="logout-button btn btn-primary" onClick={this.props.logout}>Logout</button>
          </Link>
          <span className="userName">Welcome, Admin</span>
        </div>
        <div className="CRUDLocation">
          <FlushData/>
          <ChangeLocationName/>

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

