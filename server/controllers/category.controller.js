const Category = require('../models/category.model');

module.exports.findAllCategories = (req, res) => {
    Category.find()
        .then((allDaCategories) => {
            res.json({ categories: allDaCategories })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err})
        });}

module.exports.findOneCategory = (req, res) => {
    Category.findOne({ _id: req.params.id })
        .then(oneSingleCategory => {
            res.json({ category: oneSingleCategory })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.createNewCategory = (req, res) => {
    Category.create(req.body)
        .then(newlyCreatedCategory => {
            res.json({ category: newlyCreatedCategory })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.updateExistingCategory = (req, res) => {
    Category.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true}
    )
        .then(updateCategory => {
            req.json({ category: updatedCategory })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.deleteAnExistingCategory = (req, res) => {
    Category.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result})
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}