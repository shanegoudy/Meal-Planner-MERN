const RecipeBookController = require('../controllers/recipeBook.controller');
const {authenticate} = require("../config/jwt.config");

module.exports = app => {
    app.post('/api/books', RecipeBookController.createNewBook);
    app.get('/api/books/:id', RecipeBookController.findOne);
    app.put('/api/books/:id', authenticate, RecipeBookController.updateBook);
    app.delete('/api/books/:id', authenticate, RecipeBookController.deleteBook);
}