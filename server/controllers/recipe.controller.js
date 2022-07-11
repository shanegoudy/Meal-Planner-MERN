const Recipe = require('../models/recipe.model');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


module.exports.findAllRecipes = (req, res) => {
    Recipe.find()
        .then((allDaRecipes) => {
            res.json({ recipes: allDaRecipes })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err})
        });}

module.exports.findAllRecipesByUser = (req, res) => {
    //refactor this so it follows DRY - "don't repeat yourself"
    if(req.jwtpayload.email !== req.params.email){
        console.log("not the user");
        User.findOne({email: req.params.email})
            .then((userNotLoggedIn)=>{
                Recipe.find({createdBy: userNotLoggedIn._id})
                    .populate("createdBy", "firstName", "lastName")
                    .then((allRecipesFromUser)=>{
                        console.log(allRecipesFromUser);
                        res.json(allRecipesFromUser);
                    })
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
    }
    else{
        console.log("current user");
        console.log("req.jwtpayload.id:", req.jwtpayload.id);
        Recipe.find({ createdBy: req.jwtpayload.id })
            .populate("createdBy", "firstName", "lastName")
            .then((allRecipesFromLogged))
    }
}

module.exports.findOneRecipe = (req, res) => {
    Recipe.findOne({ _id: req.params.id })
        .then(oneSingleRecipe => {
            res.json({ recipe: oneSingleRecipe })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });}

module.exports.createNewRecipe = (req, res) => {
    const newRecipeObject = new Recipe(req.body);

    newRecipeObject.createdBy = req.jwtpayload.id;
    
    newRecipeObject.save()
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