const Recipe = require('../models/recipe.model');

module.exports.findAllRecipes = (req, res) => {
    Recipe.find()
        .then((allDaRecipes) => {
            res.json({ recipes: allDaRecipes })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err})
        });}

module.exports.findOneRecipe = (req, res) => {
    Recipe.findOne({ _id: req.params.id })
        .then(oneSingleRecipe => {
            res.json({ recipe: oneSingleRecipe })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.createNewRecipe = (req, res) => {
    Recipe.create(req.body)
        .then(newlyCreatedRecipe => {
            res.json({ recipe: newlyCreatedRecipe })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.updateExistingRecipe = (req, res) => {
    Recipe.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true}
    )
        .then(updatedRecipe => {
            res.json({ recipe: updatedRecipe })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.deleteAnExistingRecipe = (req, res) => {
    Recipe.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result})
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}