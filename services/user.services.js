var userModel = require('../models/user.model')

exports.getUsers = async function (query, page, limit) {
    try {
        var users = await userModel.find(query)
        console.log("users" + users)
        return users;
    } catch (e) {
        // Log Errors
        console.log('Error while retrieving Users')
    }
}

exports.getUserById = async function (req, res, next) {
    try {
        var users = await userModel.findById(req.body.id)
        console.log("users" + users)
        return users;
    } catch (e) {
        // Log Errors
        console.log('Error while retrieving Users')
    }
}

exports.updateUser = async function (req, res, next) {
    var query = { '_id': req.body.id };
    req.newData = req.body;
    var users = userModel.findOneAndUpdate(query, req.newData, { upsert: true }, function (err, doc) {
        if (err) return console.log(err); else return users
    });
    userModel.findOne({ '_id': req.body.id  })
    .then((u) => {
        u.setPassword(req.body.password,(err, u) => {
            if (err) return next(err);
            u.save();
            return u
        });
    })
}

exports.deleteOneUser = async function(req, res, next) {
    try {
        var user = userModel.findByIdAndDelete(req.body.id)
        console.log("User" + user)
        return user;
    } catch (e) {
        // Log Errors
        console.log('Error while deleting User')
    }
}
