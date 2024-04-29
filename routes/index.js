const { Router } = require('express');
const controllers = require('../controllers');
const routes = Router();

routes.get('/', (req, res) => {
    res.send('welcome!');
});

routes.post('/users', controllers.saveUser);
routes.get('/users', controllers.getUser);
routes.get('/users/last', controllers.getLastAddedUser);

module.exports = routes;