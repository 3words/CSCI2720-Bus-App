const sha256 = require('js-sha256');

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/csci2720');
var Schema = mongoose.Schema;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
  console.log("Connection is open...");
});

var UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    min: 4,
    max: 20
  },
  password: {
    type: String,
    required: true,
    min: 64,
    max: 64
  },
  homeLocation: {
    long: Number, default: 0,
    lat:  Number, default: 0
  }
});

var LocationSchema = mongoose.Schema({
  locationID: {
    type: Number,
    unique: true
  },
  name: {
    type: String
  },
  longitude: {
    type: Number
  },
  latitude: {
    long: Number
  }
});

var RouteSchema = mongoose.Schema({
  route: {
    type: String,
    unique: true
  },
  dest: {
    type: String
  },
  orig: {
    type: String
  }
});

var StopSchema = mongoose.Schema({
  loc: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    unique: false
  },
  route: {
    type: Schema.Types.ObjectId,
    ref: 'Route',
    unique: false
  }
});

StopSchema.index({loc: 1, route: 1}, {unique: true});

var CommentSchema = mongoose.Schema({
  stop: {
    type: Schema.Types.ObjectId,
    ref: 'Stop'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: {
    type: String
  },
  timeStamp: {
    type: Date
  }
});

var FavouriteSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  loc: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  }
});

var User = mongoose.model('User', UserSchema);
var Location = mongoose.model('Location', LocationSchema);
var Route = mongoose.model('Route', RouteSchema);
var Stop = mongoose.model('Stop', StopSchema);
var Comment = mongoose.model('Comment', CommentSchema);
var Favourite = mongoose.model('Favourite', FavouriteSchema);

app.post('/login', function(req, res) {
  var inputUserName = req.body['userName'];
  var inputPassword = req.body['password'];
  //check username and password length
  if(inputUserName.length >20 || inputUserName.length <4 || inputPassword.legnth > 20 || inputPassword.length < 4)
  {
    res.send('not valid');
  } else {
    //hashed password
    var hashPW = sha256(req.body['password']);
    User.findOne(
      {
        userName: inputUserName,
        password: hashPW
      },function(err,result) {
        if (err) {
          res.send(err);
        }
        if(result != null) {
          res.send('valid');
        } else {
          res.send('not valid');
        }
      });
  }
});

app.post('/register', function(req, res) {
  var inputUserName = req.body['userName'];
  var inputPassword = req.body['password'];
  if(inputUserName.length >20 || inputUserName.length <4 || inputPassword.legnth > 20 || inputPassword.length < 4)
  {
    res.send('not valid');
  } else {
      var hashPW = sha256(req.body['password']);
      var e = new User({
      userName: inputUserName,
      password: hashPW,
      });
      e.save(function(err) {
          if (err)
              res.send(err);
          res.send("User successfully registered.");
      });
   };
});

app.get('/getUser', getUserByUsername, (req, res) => {
  res.send(res.user);
})

app.patch('/homeLocation', getUserByUsername, async(req, res) => {
  if (req.body['lat'] != null){
    res.user.homeLocation.lat = req.body['lat'];
  }
  if (req.body['long'] != null){
    res.user.homeLocation.long = req.body['long'];
  }
  try{ 
    const updatedHomeLocation = await res.user.save();
    res.send("Updated home location for user "+res.user.userName+".<br>\n");
  }catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.patch('/changeUserName', getUserByUsername, async(req, res) => {
  if (req.body['newUserName'] != null){
    res.user.userName = req.body['newUserName'];
    try{ 
      const updatedUserName = await res.user.save();
      res.send("Username updated to "+res.user.userName+".<br>\n");
    }catch (err) {
      res.status(400).json({ message: err.message });
    }
  }else{
    res.send("Please enter new username");
  }
});

app.patch('/changePassword', getUserByUsername, async(req, res) => {
  if (req.body['newPassword'] != null){
    var hashPW = sha256(req.body['newPassword']);
    res.user.password = hashPW;
      try{ 
        const updatedPassword = await res.user.save();
        res.send("Updated password for user "+res.user.userName+".<br>\n");
      }catch (err) {
        res.status(400).json({ message: err.message });
      }}
  else {
      res.send("Please enter new password");
    }
});

app.delete('/deleteUser', getUserByUsername, async(req, res) => {
  try{
      await res.user.remove();
      res.send("The following user has been deleted.\n User Name: "+res.user.userName+"<br>\n");  
  }catch (err) {
      res.status(500).json({ message: err.message });
  }
})

async function getUserByUsername(req, res, next) {
  var user;
  var inputUserName = req.body['userName'];
  try {
    user = await User.findOne({ userName: inputUserName });
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

app.listen(process.env.PORT || 8080);
