const RecipeController = require('../controllers/recipe.controller');
const {authenticate} = require("../config/jwt.config");

module.exports = app => {
    app.get('/api/recipes', RecipeController.findAllRecipes);
    app.get('/api/recipes/:id', RecipeController.findOneRecipe);
    app.get("/api/recipesbyuser/:email", authenticate, RecipeController.findAllRecipesByUser);
    app.put('/api/recipes/:id', authenticate, RecipeController.updateExistingRecipe);
    app.post('/api/recipes', authenticate, RecipeController.createNewRecipe);
    app.post('/api/multirecipes', authenticate, RecipeController.findMultiple);
    app.delete('/api/recipes/:id', authenticate, RecipeController.deleteAnExistingRecipe);
}