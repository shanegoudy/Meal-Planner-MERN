const UserController = require('../controllers/user.controller');

module.exports = app => {
app.get('/api/users', UserController.findAllUsers);
    app.get('/api/users/:id', UserController.findOneUser);
    app.put('/api/users/:id', UserController.updateExistingUser);
    app.get('/api/users/byemail/:email/:pass', UserController.findOneByEmailPass);
    app.post('/api/users', UserController.createNewUser);
    app.delete('/api/users/:id', UserController.deleteAnExistingUser);
}

