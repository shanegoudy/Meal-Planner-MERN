const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// const Recipe = require('../models/recipe.model');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, "Listed email is already in use"],
        required: [true, "Email address is required"],
        validate: [validateEmail, 'Email address is invalid'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address is invalid']
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
    // recipes: {
    //     type: [Recipe.RecipeSchema]
    // }
}, {timestamps: true});

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function(next){
    if(this._password !== this._confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match');
    }
    next();
});

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;