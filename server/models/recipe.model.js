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
    // ingredients: {
    //     type: [
    //         [
    //             {
    //                 type: Number,
    //                 required: [true, "Amount is required"]
    //             },
    //             {
    //                 type: Measurement.MeasurementSchema 
    //             },
    //             {
    //                 type: Ingredient.IngredientSchema
    //             }
    //         ]
    //     ],
    // },
    ingredients: {
        type:[[Ingredient.IngredientSchema]]
    },
    hyperlink: {
        type: String
    },
    createdBy: {
        type: [[User.UserSchema]],
        required: [true, "Created by is required"]
    }
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;