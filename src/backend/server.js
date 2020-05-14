const sha256 = require('js-sha256');
const https = require("https");
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
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
  },
  dir: {
    type: String
  },
  seq: {
    type: Number
  }
});

StopSchema.index({loc: 1, route: 1, dir:1}, {unique: true});

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


app.post('/flushData', async function(req, res) {
  var routeURL = [];
  var routestopURL = [];
  var stopURL = [];
  var locationList = [];
  //Hard code route number if fixed
  var routeNo = [967, 969, 97, 48, 314, 19, 20, 182, 171, 260];
  routeNo.forEach(function(value){
    routeURL.push("https://rt.data.gov.hk/v1/transport/citybus-nwfb/route/CTB/"+value);
    routestopURL.push("https://rt.data.gov.hk/v1/transport/citybus-nwfb/route-stop/CTB/"+value+"/inbound");
    routestopURL.push("https://rt.data.gov.hk/v1/transport/citybus-nwfb/route-stop/CTB/"+value+"/outbound");
  });

  //update Route database
  async function createRoute(){
    routeURL.forEach(function(value){
      https.get(value, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", async() => {
            body = JSON.parse(body);
            try{
              const filter = {"route": body.data.route};
              const update = {"dest": body.data.dest_en, "orig": body.data.orig_en};
              var route = await Route.findOneAndUpdate(filter, update, {
              new: true,
              upsert: true
              });
            }catch (err){
              console.log(err);
            }
          });
        });
      });
  }

  //update location database with locationID for all stops
  async function createLocation(){
    routestopURL.forEach(function(value){
      https.get(value, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", async() => {
            body = JSON.parse(body);
              var data = body.data;
              data.forEach(async function(obj) {
                /*var existLocation = await Location.findOne({locationID: obj.stop});
                  if (existLocation == null){
                  const newLocation = new Location({locationID: obj.stop});
                  const e = await newLocation.save();
                */
                try{
                  const filter = {"locationID": obj.stop};
                  const update = {};
                  var e = await Location.findOneAndUpdate(filter, update, {
                  new: true,
                  upsert: true
                  });
                } catch (err){
                  console.log(err);
                }
              });
          });
        });
      });
  }
    //update stop database
    async function createStop(){
      routestopURL.forEach(function(value){
        https.get(value, res => {
          res.setEncoding("utf8");
          let body = "";
          res.on("data", data => {
            body += data;
          });
          res.on("end", async() => {
              body = JSON.parse(body);
                var data = body.data;
                data.forEach(async function(obj) {
                    var findLocation = await Location.findOne({locationID: obj.stop});
                    var findRoute = await Route.findOne({route: obj.route});
                    /*
                    var newStop = new Stop ({
                      loc: location._id,
                      route: route._id,
                      dir: obj.dir,
                      seq: obj.seq
                    });
                    const e = await newStop.save(function(err) {
                      if (err)
                        console.log(err);           
                    });*/
                    try{
                    const filter = {"loc": findLocation._id, "route": findRoute._id, "dir": obj.dir};
                    const update = {"seq": obj.seq};
                    var stop = await Stop.findOneAndUpdate(filter, update, {
                    new: true,
                    upsert: true
                    });
                    }catch (err){
                      console.log(err);
                    }
                })
            });
          });
        });
    }

      //get all location ID and generate URL for API
      async function updateLocation(){
        var allLocationID = await Location.find({},'locationID');
        allLocationID.forEach(function(obj){
          locationList.push(obj.locationID);
        })
        locationList.forEach(function(value){
          stopURL.push("https://rt.data.gov.hk/v1/transport/citybus-nwfb/stop/00"+value);
        })

        //update location database with details
        stopURL.forEach(function(value){
          https.get(value, res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
              body += data;
            });
            res.on("end", async() => {
                body = JSON.parse(body);
                try{
                  const filter = {"locationID": body.data.stop};
                  const update = {"name": body.data.name_en, "longitude": body.data.long, "latitude": body.data.lat};
                  var updateLocation = await Location.findOneAndUpdate(filter, update, {
                  new: true,
                  upsert: true
                  });
                }catch (err){
                  console.log(err);
                }
              });
            });
          });
      }

      async function flushData(){
        const FirstStep = await createRoute();
        const SecondStep = await createLocation();
        const ThirdStep = await createStop();
        const LastStep = await updateLocation();
      };

  flushData();
  res.send("Data flush successful");
});

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
          if (err) {
              res.send(err);
          } else {
            res.send("User successfully registered.");
          }
      });
   };
});

app.patch('/homeLocation', getUserByUsername, async(req, res) => {
  if (req.body['lat'] != null){
    res.user.homeLocation.lat = req.body['lat'];
  }
  if (req.body['long'] != null){
    res.user.homeLocation.long = req.body['long'];
  }
  try{
    const updatedHomeLocation = await res.user.save();
    res.send("valid");
  }catch (err) {
    res.status(400).send("invalid");
  }
});

app.patch('/changeUserName', getUserByUsername, async(req, res) => {
  if (req.body['newUserName'] != null)
    if(req.body['newUserName'].length <20 && req.body['newUserName'].length > 4) {
    res.user.userName = req.body['newUserName'];
    try{
      const updatedUserName = await res.user.save();
      res.send("valid");
    }catch (err) {
      res.send(err);
    }
  }else{
    res.send("Please enter new username");
  }
});

app.patch('/changePassword', getUserByUsername, async(req, res) => {
  if (req.body['newPassword'] != null)
    if(req.body['newPassword'].length < 20 && req.body['newPassword'].length > 4) {
    var hashPW = sha256(req.body['newPassword']);
    res.user.password = hashPW;
      try{
        const updatedPassword = await res.user.save();
        res.send("valid");
      }catch (err) {
        res.send("invalid");
      }
  }else {
      res.send("invalid");
  }
});

app.delete('/deleteUser',  async(req, res) => {
  try{
      await res.user.remove();
      res.send("valid");
  }catch (err) {
      res.send("invalid");
  }
})

async function getUserByUsername(req, res, next) {
  var user;
  var inputUserName = req.body['userName'];
  try {
    user = await User.findOne({ userName: inputUserName });
    if (user == null) {
      return res.send("User not found");
    }
  } catch (err) {
    return res.send("invalid");
  }

  res.user = user;
  next();
}

app.patch('/changeLocationName', async(req, res) => {
  if (req.body['newLocationName'] != null && req.body['oldLocationName'] != null) {
    var newLocationName = req.body['newLocationName'];
    var oldLocationName = req.body['oldLocationName'];
    var location;
    try{
      location = await Location.findOne({name: oldLocationName });
      if (location != null){
        try{
          location.name = newLocationName;
          const updatedLocationName = await location.save();
          res.send("valid");
        }catch (err){
          res.send(err);
        }
      }
      else {
        res.status(404).send("location not found");
      }
    }catch (err) {
      res.status(400).send("invalid");
    }
  }else{
    res.status(400).send("missing fields");
  }
});

app.get('/allLocation', function(req, res) {
  Location.find()
  .sort('locationID')
  .exec(function(err, result) {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/relatedStop', async function(req, res) {
  try {
    var locationID = req.body['locationID'];
    var foundlocation = await Location.findOne({locationID: locationID});
    var location_Id = foundlocation._id;
    Stop.find({loc: location_Id})
    .populate('loc')
    .populate('route')
    .exec(function(err, result) {
      if(err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }catch (err){
  res.send(err);
  } 
});


app.get('/allStop', function(req, res) {
  Stop.find()
    .populate('loc')
    .populate('route')
    .sort('route')
    .sort('dir')
    .sort('seq')
    .exec(function(err, result) {
      if(err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});

app.post('/addComment', function(req, res) {
  var inputComment = req.body['comment'];
  var inputUserName = req.body['userName'];
  var inputLocationId = req.body['locationId'];
  var inputRoute = req.body['route'];

  //match route
  Route.findOne(
    {'route': inputRoute},
    function(err, result) {
      if(err) {
        res.send(err);
      }
      if(result != null) {
        //match location
        Location.findOne(
          {'locationID': inputLocationId},
          function(err1, result1) {
            if(err1) {
              res.send(err1);
            }
            if(result1 != null) {
              // find stop
              Stop.findOne(
                {
                  'loc': result1._id,
                  'route': resulst._id
                },
                function(err2, result2) {
                  if(err2) {
                    res.send(err2);
                  }
                  if(result2 != null) {
                    // find user
                    User.findOne(
                      {'userName': inputUserName},
                      function(err3, result3) {
                        if(err3) {
                          res.send(err3);
                        }
                        if(result3 != null) {
                          var newComment = new Comment({
                            'stop': result2._id,
                            'user': result3._id,
                            'comment': inputComment,
                            'timeStamp': new Date()
                          });
                          newComment.save(function(err4) {
                            if(err4)
                              res.send(err4);
                            res.send("Success！");
                          });
                        } else {
                          res.send("User does not exists!");
                        }
                      });
                  } else {
                    res.send("Stop does not exists!");
                  }
                });
            } else {
              res.send("LocationId does not exists!");
            }
          });
      } else {
        res.send("Route does not exists!");
      }
    });
});

app.get('/getComment', function(req,res) {
  var inputLocationId = req.body['locationId'];
  var inputRoute = req.body['route'];
  var inputDir = req.body['dir'];

    Location.findOne(
    {'locationID': inputLocationId},
    function(err, result) {
      if(err) {
        res.send(err);
      }
      if(result != null) {
        Route.findOne(
          {'route': inputRoute},
          function(err1, result1) {
            if(err1) {
              res.send(err1);
            }
            if(result1 != null) {
              Stop.findOne(
                {
                  'loc': result._id,
                  'route': result1._id
                },
                function(err2, result2) {
                  if(err2) {
                    res.send(err2);
                  }
                  if(result2 != null) {
                    Comment.find({'stop': result2._id})
                      .populate('stop')
                      .populate('user', 'UserName')
                      .sort('-timeStamp')
                      .exec(function(err3, results3) {
                        if(err3) {
                          res.send(err3);
                        }
                        res.send(results3);
                      });
                  } else {
                    res.send("Stop does not exists!");
                  }
                });
            } else {
              res.send("Route does not exists!");
            }
          });
      } else {
        res.send("Location does not exists!");
      }
    });

})

app.post('/addFavourite', function(req,res) {
  var inputUserName = req.body['userName'];
  var inputLocationId = req.body['locationId'];

  //find user
  User.findOne(
    {'userName': inputUserName},
    function(err, result) {
      if(err) {
        res.send(err);
      }
      if(result != null) {
        //find location
        Location.findOne(
          {'locationID': inputLocationId},
          function(err1, result1) {
            if(err1) {
              res.send(err1);
            }
            if(result1 != null) {
              var newFarvourite = new Favourite({
                'user': result._id,
                'loc': result1._id
              });
              newFarvourite.save(function(err2) {
                if(err2)
                  res.send(err2);
                res.send("Success!");
              });
            } else {
              res.send("Location does not exists!");
            }
          });
      } else {
        res.send("User does not exists!");
      }
    }
  );
});

app.delete('/deleteFavourite', function(req,res) {
  var inputUserName = req.body['userName'];
  var inputLocationId = req.body['locationId'];

  User.findOne(
    {'userName': inputUserName},
    function(err, result) {
      if(err) {
        res.send(err);
      }
      if(result != null) {
        //find location
        Location.findOne(
          {'locationID': inputLocationId},
          function(err1, result1) {
            if(err1) {
              res.send(err1);
            }
            if(result1 != null) {
              //find favourite
              Favourite.findOne(
                {
                  "user": result._id,
                  "loc": result1._id
                },
                function(err2,result2) {
                  if(err2) {
                    res.send(err2);
                  }
                  if(result2 != null) {
                    result2.remove().exec();
                    res.send("Success!");
                  } else {
                    res.send("Favourite location does not exists!");
                  }
                });
            } else {
              res.send("Location does not exists!");
            }
          });
      } else {
        res.send("User does not exists!");
      }
    }
  );
})

app.get('/getFavourite', function(req,res) {
  var inputUserName = req.body['userName'];

  User.findOne(
    {'userName': inputUserName},
    function(err, result) {
      if(err) {
        res.send(err);
      }
      if(result != null) {
        Favourite.find(
          {'user': result._id},
          function(err2, results2) {
            if(err2) {
              res.send(err2);
            }
            res.send(results2);
          });
      } else {
        res.send("User does not exists!");
      }
    });
})

app.listen(process.env.PORT || 8080);
