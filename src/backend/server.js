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
    ref: 'Location'
  },
  route: {
    type: Schema.Types.ObjectId,
    ref: 'Route'
  },
  eta: {
    type: Date
  }
});

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
          res.send("Ref: " + e);
      });
   };
});

app.post('/homeLocation', async function(req, res) {
  var inputUserName = req.body['userName'];
  var long = req.body['long'];
  var lat = req.body['lat'];

  const e = await User.findOne({ userName: inputUserName });
  e.homeLocation = {lat, long};
      e.save(function(err) {
          if (err)
              res.send(err);
          res.send("Ref: " + e);
      });
});

app.listen(process.env.PORT || 8080);
