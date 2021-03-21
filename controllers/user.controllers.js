var User = require('../models/user.model')
var passport = require('passport')
var userService = require('../services/user.services')


// Searches Claims for Edit Claim
exports.registerUser = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    try {
        Users = new User({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, username: req.body.username });
        User.register(Users, req.body.password, function (err, body) {
            if (err) {
                return res.status(400).json({ status: 400, message: err.message });
            } else {
                return res.status(200).json({ status: 200, data: Users, message: "Registered" });
            }
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// Searches Claims for Edit Claim
exports.authenticateUser = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    try {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return res.status(400).json({ status: 400, message: err.message });;
            }
            if (!user) {
                return res.status(400).json({ status: 400, message: "User / Password dont match" });;
            }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                return res.status(200).json({ status: 200, data: user, message: "Done" });
            });
        })(req, res, next);
        //users = await userService.login(req, res, next);

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// Gets all the Users
exports.getUsers = async function(req, res, next) {
    try {
        var users = await userService.getUsers({})
        return res.status(200).json({ status: 200, data: users, message: "Users Retrieved Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getUserById = async function(req, res, next) {
    try {
        var users = await userService.getUserById(req, res, next);
        return res.status(200).json({ status: 200, data: users, message: "Found Users" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateUser = async function(req, res, next) {
    try {
        var users = await userService.updateUser(req, res, next);
        return res.status(200).json({ status: 200, data: users, message: "User Updated" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteOneUser = async function(req, res, next) {
    try {
        var users = await userService.deleteOneUser(req, res, next);
        return res.status(200).json({ status: 200, data: users, message: "User Deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}