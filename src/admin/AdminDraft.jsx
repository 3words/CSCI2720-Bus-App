import React, { useState, useRef } from 'react';
//import './Admin.css';
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
      if(res.data === "valid") {
        returnFunction("Registered Successfully");
      } else {
        alert("Fail to Register");
      }
    });
  };
  
    render() {
      return (
        <div className='CreateAccount'>
          <form onSubmit={this.handleSubmit}>
            <h1> Create a user account </h1>
  
            <div className="form-group">
                <label>New User Name:</label>
                <input id="userName" type="text" className="form-control" placeholder="Enter username" />
            </div>
  
            <div className="form-group">
                <label>New User Password:</label>
                <input id="password" type="password" className="form-control" placeholder="Enter password" />
            </div>
  
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
          </form>
        </div>
      );
    }
}

class ChangeName extends React.Component {

    handleSubmit = (event) => {
      var userName = event.target["userName"].value;
      var NewName = event.target["newName"].value;
      var returnFunction = this.props.changeUserName;
      axios.patch('/changeUserName', {
        userName: userName,
        newUserName: NewName
      }).then(function(res) {
        if(res.data === "valid") {
          returnFunction("Change Successfully");
        } else {
          alert("Fail to Change");
        }
      });
    };
    
    render() {
      return (
          <div className='EditName'>
            <form onSubmit={this.handleSubmit}>
              <h1> Update user name </h1>
    
              <div className="form-group">
                  <label>Current User Name:</label>
                  <input id="userName" type="text" className="form-control" placeholder="Enter username" />
              </div>
    
              <div className="form-group">
                  <label>New User Name:</label>
                  <input id="newName" type="text" className="form-control" placeholder="Enter new username" />
              </div>
    
              <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
          </div>
      );
    }
}

class ChangeUserPW extends React.Component {

      handleSubmit = (event) => {
        var userName = event.target["userName"].value;
        var NewName = event.target["newPW"].value;
        var returnFunction = this.props.login;
        axios.patch('/changePassword', {
          userName: userName,
          newUserName: NewName
        }).then(function(res) {
          if(res.data === "valid") {
            returnFunction("Change Successfully");
          } else {
            alert("Fail to Change");
          }
        });
      };
      
      render() {
        return (
            <div className='EditPW'>
              <form onSubmit={this.handleSubmit}>
                <h1> update user password </h1>
      
                <div className="form-group">
                    <label>Current User Name:</label>
                    <input id="userName" type="text" className="form-control" placeholder="Enter username" />
                </div>
      
                <div className="form-group">
                    <label>New Password:</label>
                    <input id="newPW" type="password" className="form-control" placeholder="Enter new password" />
                </div>
      
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
              </form>
            </div>
        );
      }
 }

 class DeleteAccount extends React.Component {

  handleSubmit = (event) => {
    var userName = event.target["userName"].value;
    var returnFunction = this.props.deleteUser;
    axios.delete('/deleteUser', {
      userName: userName,
    }).then(function(res) {
      if(res.data === "valid") {
        returnFunction("Delete Successfully");
      } else {
        alert("Fail to Delete");
      }
    });
  };
  
  render() {
    return (
        <div className='DeleteAcc'>
          <form onSubmit={this.handleSubmit}>
            <h1> Delete User Account </h1>
  
            <div className="form-group">
                <label>User Name:</label>
                <input id="userName" type="text" className="form-control" placeholder="Enter username" />
            </div>
  
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
          </form>
        </div>
    );
  }
}

class UpdateLocation extends React.Component {

  handleSubmit = (event) => {
    var longitude = event.target["long"].value;
    var latitude = event.target["lat"].value;
    var returnFunction = this.props.register;
    axios.post('/homeLocation', {
      lat: latitude,
      long: longitude
    }).then(function(res) {
      if(res.data === "valid") {
        returnFunction("Update Successfully");
      } else {
        alert("Fail to update");
      }
    });
  };
  
    render() {
      return (
        <div className='updatelocation'>
          <form onSubmit={this.handleSubmit}>
            <h1> Update a location </h1>
  
            <div className="form-group">
                <label>longitude:</label>
                <input id="long" type="text" className="form-control" placeholder="Enter longitude" />
            </div>
  
            <div className="form-group">
                <label>latitude:</label>
                <input id="lat" type="text" className="form-control" placeholder="Enter latitude" />
            </div>
  
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
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
    };
  }


  handleLogout = (event) => {
    console.log("logout");
    this.setState({
      login: false,
    });
  }

render(){
    return (
      <div className='Admin-interface'>
        <div className="header">
          <button className="logout-button btn btn-primary" onClick={this.props.logout}>Logout</button>
          <span className="userName">Welcome, Admin</span>
        </div>
        <div className="CRUDLocation">
          <UpdateLocation/>

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


/*<div>Display Bus Data</div>
<button className="logout-button btn btn-primary" onClick={handlesBusData}>Display data</button>

<div>Create Location Data</div>
<div>Location Name: <input ref={CreateLocName} type="text" /></div>
<div>Location latitude: <input ref={CreateLoclat} type="text" /></div>
<div>Location longitude: <input ref={CreateLoclon} type="text" /></div>
<div>Business Arrivial Time: <input ref={CreateBusArr} type="text" /></div>
<button className="logout-button btn btn-primary" onClick={HandleNewLocation}>Create Location</button>

<div>Update Location Data</div>
<button className="logout-button btn btn-primary" onClick={handleupdateLoc}>Update Location</button>


<div>Delete Location Data</div>
<div>Deleted Location: <input ref={DeletedLocation} type="text" /></div>
<button className="logout-button btn btn-primary" onClick={handledeleteLoc}>Delete Location</button>
</div>

<div className="CRUDUser">
<div>Create a user account</div>
<div>New User Name: <input ref={CreateUserName} type="text" /></div>
<div>New User Password: <input ref={CreateUserPW} type="text" /></div>
<button className="logout-button btn btn-primary" onClick={handlecreate}>Create Account</button>

<div>Edit a user account</div>
<div>Targeted User Name: <input ref={EditUserName1} type="text" /></div>
<div>New User Name: <input ref={EditUserName2} type="text" /></div>
<div>New User Password: <input ref={EditUserPassword} type="text" /></div>
<button className="logout-button btn btn-primary" onClick={handleEdit}>Edit User Data</button>

<div>Delete a user account</div>          
<div>Delete User's Name: <input ref={DeleteUserName} type="text" /></div>
<button className="logout-button btn btn-primary" onClick={handleDelete}>Delete User Data</button>
*/