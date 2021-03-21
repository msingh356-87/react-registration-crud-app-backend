var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var userController = require('../controllers/user.controllers')

router.post('/registerUser', jsonParser, function(req, res, next) {
    console.log("Reached here")
    userController.registerUser(req, res, next)
});

router.post('/authenticateUser', jsonParser, function(req, res, next) {
    console.log("Reached here")
    userController.authenticateUser(req, res, next)
});

// Gets all the users
router.get('/', userController.getUsers);

// Gets User by ID
router.post('/getUserById', jsonParser, function(req, res, next) {
    userController.getUserById(req, res, next)
});

// Routes Updates the User 
router.post('/updateUser', jsonParser, function(req, res, next) {
    userController.updateUser(req, res, next)
});

// Route Deletes one User by ID
router.post('/deleteOneUser', jsonParser, function(req, res, next) {
    userController.deleteOneUser(req, res, next)
});

module.exports = router
