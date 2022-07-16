const mongoose = require('mongoose');
const User = require('../models/user.model');
const Recipe = require('../models/recipe.model');


const RecipeBookSchema = new mongoose.Schema({
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

const RecipeBook = mongoose.model('RecipeBook', RecipeBookSchema);

module.exports = RecipeBook;