const AuthController = require('../controllers/AuthController');

module.exports = (router) => {
    router.route('/login').post(AuthController.login);
};