const mongoose = require('mongoose');
const Category = require('../models/category.model');
const User = require('../models/user.model');
const Ingredient = require('../models/ingredient.model');
// const Measurement = require('../models/measurement.model');

const RecipeSchema = new mongoose.Schema({
    categories: {
        type: [[Category.CategorySchema]],
        required: [true, "Category is required"]
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    instructions: {
        type: String
    },
    ingredients: {
        type:[[Ingredient.IngredientSchema]]
    },
    hyperlink: {
        type: String,
        unique: [true, "Listed link is already in use"],
    },
    image: {
        type: String,
        required: [true, "Image url is required"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Created by is required"]
    },
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;