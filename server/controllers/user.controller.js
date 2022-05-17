const User = require('../models/user.model');

module.exports.findAllUsers = (req, res) => {
    User.find()
        .then((allDaUsers) => {
            res.json({ users: allDaUsers })
        })
        .catch((err) => {
            res.json({ message: 'Error finding all users', error: err})
        });}

module.exports.findOneUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(oneSingleUser => {
            res.json({ user: oneSingleUser })
        })
        .catch((err) => {
            res.json({ message: 'Error finding one user', error: err })
        });}

module.exports.createNewUser = (req, res) => {
    User.create(req.body)
        .then(newlyCreatedUser => {
            res.json({ user: newlyCreatedUser })
        })
        .catch((err) => {
            res.json({ message: 'Error creating new user', error: err })
        });}

module.exports.updateExistingUser = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true}
    )
        .then(updatedUser => {
            req.json({ user: updatedUser })
        })
        .catch((err) => {
            res.json({ message: 'Error updating user', error: err })
        });}

module.exports.deleteAnExistingUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result})
        })
        .catch((err) => {
            res.json({ message: 'Error deleting user', error: err })
        });}

module.exports.findOneByEmailPass = (req, res) => {
    User.find({email: req.params.email, password: req.params.pass})
        .then(user => {
            res.json({ user: user })
        })
        .catch((err) => {
        res.json({ message: 'Error finding by email', error: err })
        });}