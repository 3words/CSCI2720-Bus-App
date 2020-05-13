import React, { useRef } from 'react';
import './Admin.css';
import axios from 'axios';

class Admin extends React.Component {
  render() {
    const CreateLocName = useRef()
    const CreateLoclat = useRef()
    const CreateLoclon = useRef()
    const CreateBusArr = useRef()
    const DeletedLocation = useref()
    const CreateUserName = useRef()
    const CreateUserPW = useRef()
    const SearchUser = useRef()
    const EditUserName1 = useRef()
    const EditUserName2 = useRef()
    const EditUserPassword = useRef()
    const DeleteUserName = useRef()
    
    function handlesBusData(){

    }

    function HandleNewLocation(){

    }

    function handleupdateLoc(){

    }

    function handledeleteLoc(){

    }


    function handleserach(){
      var userName = SearchUser.value;
    app.get('/read', function(req, res) {
      var inputUserName = req.body[userName];
      User.findOne(
        {
          userName: inputUserName,
        },function(err,result) {
          if (err) {
            res.send(err);
          }
          if(result != null) {
            res.send(result);
          } else {
            res.send('not valid');
          }
        });      
    });
   }



    function handlecreate(){
        var userName = CreateUserName.value;
        var password = CreateUserPW.value;
      app.post('/register', function(req, res) {
        var inputUserName = req.body[userName];
        var inputPassword = req.body[password];
        if(inputUserName.length >20 || inputUserName.length <4 || inputPassword.legnth > 20 || inputPassword.length < 4)
        {
          res.send('not valid');
        } else {
            var hashPW = sha256(req.body[password]);
            var e = new User({
            userName: inputUserName,
            password: hashPW,
            });
            e.save(function(err) {
                if (err)
                    res.send(err);
                res.send("Ref: " + e);
            });
         };
      });
    }

    function handleDelete(){
      var userName = DeleteUserName.value;
      app.post('/delete', function(req, res) {
        var inputUserName = req.body[userName];
        User.findOne(
          {
            userName: inputUserName,
          },function(err,result) {
            if (err) {
              res.send(err);
            }
            if(result != null) {
              res.send('Delete Successfully');
            } else {
              res.send('not valid');
            }
          });      
      });
     }
    

    function handleEdit(){
      var userName = EditUserName1.value;
      var username = EditUserName2.value;
      var password = EditUserPassword.value;
      app.post('/delete', function(req, res) {
        var inputUserName = req.body[userName];
        User.findOne(
          {
            userName: inputUserName,
          },function(err,result) {
            if (err) {
              res.send(err);
            }
            else{
              app.post('/register', function(req, res) {
                var inputUserName = req.body[username];
                var inputPassword = req.body[password];
                if(inputUserName.length >20 || inputUserName.length <4 || inputPassword.legnth > 20 || inputPassword.length < 4)
                {
                  res.send('not valid');
                } else {
                    var hashPW = sha256(req.body[password]);
                    var e = new User({
                    userName: inputUserName,
                    password: hashPW,
                    });
                    e.save(function(err) {
                        if (err)
                            res.send(err);
                        res.send("Edit Successfully");
                    });
                 };
              });
            }
          });      
      });
  }



    return (
      <div className='Admin-interface'>
        <div className="header">
          <button className="logout-button btn btn-primary" onClick={this.props.logout}>Logout</button>
          <span className="userName">Welcome, {this.props.user}</span>
        </div>
        <div className="busData">
          <div>  
          <button className="logout-button btn btn-primary" onClick={handleFetch}>Show bus data</button> 
          </div>
        </div>
        <div className="CRUDLocation">
          <div>Display Bus Data</div>
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

          <div>Read a user data</div>
          <div>Targeted User Name: <input ref={SearchUser} type="text" /></div>
          <button className="logout-button btn btn-primary" onClick={handleserach}>Search</button>

          <div>Edit a user account</div>
          <div>Targeted User Name: <input ref={EditUserName1} type="text" /></div>
          <div>New User Name: <input ref={EditUserName2} type="text" /></div>
          <div>New User Password: <input ref={EditUserPassword} type="text" /></div>
          <button className="logout-button btn btn-primary" onClick={handleEdit}>Edit User Data</button>

          <div>Delete a user account</div>          
          <div>Delete User's Name: <input ref={DeleteUserName} type="text" /></div>
          <button className="logout-button btn btn-primary" onClick={handleDelete}>Delete User Data</button>
        
        </div>
      </div>
    );
  }
}

export default Admin




