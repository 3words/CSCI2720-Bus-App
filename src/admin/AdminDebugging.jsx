import React, { useState, useRef, Component } from 'react';
import './Admin.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import csv from 'csv'

class CreateAccount extends React.Component {

  handleSubmit = (event) => {
    var userName = event.target["userName"].value;
    var pw = event.target["password"].value;
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


class ChangeLocationName extends React.Component {

  handleSubmit = (event) => {
    var newLocationName = event.target["new"].value;
    var oldLocationName = event.target["current"].value;
    axios.patch('/changeLocationName', {
      newLocationName:newLocationName,
      oldLocationName:oldLocationName
    }).then(function(res) {
      if(res.data === "valid") {
        alert("Change Successfully");
      } else {
        alert("Fail to Change");
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

class UploadCSV extends Component {
  onDrop(files) {
    console.log("nice")
    this.setState({ files });
    var file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        var location = [];
        for (var i = 0; i < data.length; i++) {
          const locationID = data[i][0];
          const name = data[i][1];
          const longitude = data[i][2];
          const latitude = data[i][3];

          const newLocation = { "locationID": locationID, "name": name, "long": longitude,"lat": latitude};
          var JSLocation = JSON.stringify(newLocation)
          location.push(JSLocation);
        };
        axios.post('/uploadFile', {
          data: location
        }).then(function(res) {
          console.log("nice")
          if(res.data === "valid") {
            alert("Create Successfully");
          } else {
            alert("Fail to Create");
          }
        });
      });
    };

    reader.readAsBinaryString(file);
  }
  render() {
    return (
      <div align="center" >
        <h2 align="left">Upload or Drop Your CSV File Here.</h2>
        <div className="dropzone">
          <Dropzone accept=".csv" onDropAccepted={this.onDrop.bind(this)}>            
          </Dropzone>
        </div>
      </div>
      
    )
  }
}


/*
const UploadCSV = () => {
  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
  }

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta)
  }

  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
    />
  )
}
*/
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
        <div className= "upload file">
        <UploadCSV/>
        </div>
      </div>
    );
  }
}

export default Admin;


/*
function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }

  return JSON.stringify(result); //JSON
}

class UploadCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      filePreviewUrl: ""
    };
    this.pressButton = this.pressButton.bind(this);
    this.uploadCSV = this.uploadCSV.bind(this);
  }

  pressButton(e) {
    e.preventDefault();
    axios.post('/uploadcsv', {
    }).then(function(res) {
      if(res.data === "valid") {
        alert("Create Successfully");
      } else {
        alert("Fail to Create");
      }
    });
  }

  uploadCSV(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(csvJSON(file))

    reader.onloadend = () => {
      this.setState({
        file: file,
        filePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    let FilePreview = null;
    return (
      <div>
        <h2> Upload csv file </h2>
        <form action="." enctype="multipart/form-data">
          <input type="file" onChange={this.uploadCSV} />
          <div className="pt-2"></div>
          <button onClick={this.pressButton} className="btn btn-primary"> Submit </button>
        </form>
        <span className="filePreview">{FilePreview}</span>
      </div>
    );
  }
}

*/
