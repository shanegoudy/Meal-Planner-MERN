const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.findAllUsers = (req, res) => {
    User.find()
        .populate("createdBy", "firstName", "lastName")
        .then((allUsers) => {
            res.json({ users: allUsers })
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
    // User.create(req.body)
    //     .then(newlyCreatedUser => {
    //         const userToken = jwt.sign({
    //             id: user._id
    //         }, process.env.SECRET_KEY);
            
    //         res
    //             .cookie("usertoken", userToken, secret, {
    //                 httpOnly: true
    //             })
    //             .json({ message: "success!", user: newlyCreatedUser })
    //     })
    //     .catch((err) => {
    //         res.json({ message: 'Error creating new user', error: err })
    //     });}

    const user = new User(req.body);

    user.save()
        .then((newUser)=>{
            console.log("newUser: " + newUser);
            console.log("successfully registered");
            res.json({
                successMessage:"Thank you for registering",
                user: newUser
            })
        })
        .catch((err)=>{
            console.log("registration unsuccessful");
            res.status(400).json(err);
        })
}

module.exports.updateExistingUser = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params._id },
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

module.exports.login = (req,res) => {
    User.findOne({email: req.body.email})
        .then((userRecord)=>{
            if(userRecord === null){
                res.status(400).json({message: "Invalid Login Attempt"})
            } else {
                bcrypt.compare(req.body.password, userRecord.password)
                    .then((isPasswordValid) => {
                        if(isPasswordValid){
                            console.log("Password is valid");
                            res.cookie(
                                //name of cookie
                                "usertoken",
                                //json data
                                jwt.sign(
                                    {
                                        id: userRecord._id,
                                        email: userRecord.email,
                                    },
                                    process.env.JWT_SECRET
                                ),
                                //options/configurations
                                {
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 9000000)
                                }
                            ).json({
                                message: "Successfully logged in"
                            })
                        } else {
                            res.status(400).json({
                                message: "Invalid attempt"
                            })
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                        res.status(400).json({
                            message: "Invalid attempt"
                        })
                    })
            }
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json({
                message: "Invalid attempt"
            })
        })

}

module.exports.logout = (req, res) => {
    console.log("logging out!");
    res.clearCookie('usertoken');
    res.json({
        message: "You have successfully logged out!"
    })
}

module.exports.getLoggedInUser = (req, res) => {
    User.findOne({_id: req.jwtpayload.id})
        .then((user)=>{
            console.log(user);
            res.json(user)
        })
        .catch((err)=>{
            console.log(err);
        })
}