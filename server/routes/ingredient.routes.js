const IngredientController = require('../controllers/ingredient.controller');

module.exports = app => {
    app.get('/api/ingredients', IngredientController.findAllIngredients);
    app.get('/api/ingredients/:id', IngredientController.findOneIngredient);
    app.put('/api/ingredients/:id', IngredientController.updateExistingIngredient);
    app.post('/api/ingredients', IngredientController.createNewIngredient);
    app.delete('/api/ingredients/:id', IngredientController.deleteAnExistingIngredient);
}