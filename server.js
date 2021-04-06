const express = require('express')
const app = express()
const port = 3001
var cors = require('cors')
var passport = require('passport')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const { MongoClient } = require('mongodb');

const UserDetails = require('./models/user.model');
const localStrategy = require('passport-local');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

passport.use(new localStrategy(UserDetails.authenticate()));

var user = require('./routes/user.routes');
app.use('/user', user);



//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/crudLoginDB';
mongoose.connect(mongoDB, { useNewUrlParser: true });

mongoose.set('useFindAndModify', false);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => res.send('Welcome to CRUD Login Backend'))

app.listen(port, () => console.log("Hello"))



app.use(function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

    next();
});