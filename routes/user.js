const UserController = require('./../controllers/UserController');

module.exports = (router) => {
    router.route('/users').get(UserController.getUsers);
    router.route('/user/create').post(UserController.createUser);
}