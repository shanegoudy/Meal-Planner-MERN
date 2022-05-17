const CategoryController = require('../controllers/category.controller');

module.exports = app => {
    app.get('/api/categories', CategoryController.findAllCategories);
    app.get('/api/categories/:id', CategoryController.findOneCategory);
    app.put('/api/categories/:id', CategoryController.updateExistingCategory);
    app.post('/api/categories', CategoryController.createNewCategory);
    app.delete('/api/categories/:id', CategoryController.deleteAnExistingCategory);
}