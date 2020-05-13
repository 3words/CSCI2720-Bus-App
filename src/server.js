//const sha256 = require('js-sha256');

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
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

var User = mongoose.model('User', UserSchema);

app.post('/login', function(req, res) {
  var inputUserName = req.body['uid'];
  var inputPassword = req.body['password'];
  //var hashPW = sha256(req.body['password'])
  User.findOne(
    {
      userName: inputUserName,
      password: inputPassword
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
});

app.listen(process.env.PORT || 8080);
