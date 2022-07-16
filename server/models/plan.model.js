const mongoose = require('mongoose');
const User = require('../models/user.model');
const Recipe = require('../models/recipe.model');


const PlanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
        unique: [true, "Listed user is already in use"],
    },
    recipes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Recipe",
        required: [true, "Recipes are required"]
    }
});

const Plan = mongoose.model('Plan', PlanSchema);

module.exports = Plan;