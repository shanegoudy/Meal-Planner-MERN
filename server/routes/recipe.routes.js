const RecipeController = require('../controllers/recipe.controller');

module.exports = app => {
    app.get('/api/recipes', RecipeController.findAllRecipes);
    app.get('/api/recipes/:id', RecipeController.findOneRecipe);
    app.put('/api/recipes/:id', RecipeController.updateExistingRecipe);
    app.post('/api/recipes', RecipeController.createNewRecipe);
    app.delete('/api/recipes/:id', RecipeController.deleteAnExistingRecipe);
}