const Ingredient = require('../models/ingredient.model');

module.exports.findAllIngredients = (req, res) => {
    Ingredient.find()
        .then((allDaIngredients) => {
            res.json({ ingredients: allDaIngredients })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err})
        });}

module.exports.findOneIngredient = (req, res) => {
    Ingredient.findOne({ _id: req.params.id })
        .then(oneSingleIngredient => {
            res.json({ ingredient: oneSingleIngredient })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.createNewIngredient = (req, res) => {
    Ingredient.create(req.body)
        .then(newlyCreatedIngredient => {
            res.json({ ingredient: newlyCreatedIngredient })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.updateExistingIngredient = (req, res) => {
    Ingredient.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true}
    )
        .then(updateIngredient => {
            req.json({ ingredient: updatedIngredient })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.deleteAnExistingIngredient = (req, res) => {
    Ingredient.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result})
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}