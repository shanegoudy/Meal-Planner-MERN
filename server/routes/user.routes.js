const UserController = require('../controllers/user.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/user', authenticate, UserController.getLoggedInUser);
    app.get('/api/users', UserController.findAllUsers);
    app.get('/api/users/:id', UserController.findOneUser);
    app.put('/api/users/:id', UserController.updateExistingUser);
    app.get('/api/users/byemail/:email/:pass', UserController.findOneByEmailPass);
    app.post('/api/users', UserController.createNewUser);
    app.post('/api/users/login',UserController.login);
    app.post('/api/users/logout', UserController.logout);
    app.delete('/api/users/:id', UserController.deleteAnExistingUser);
}

