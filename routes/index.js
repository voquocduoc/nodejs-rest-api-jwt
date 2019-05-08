const AuthRoutes = require('./auth');
const UserRoutes = require('./user');

module.exports = {
    open: (router) => {
        UserRoutes(router);
    },
    auth: (router) => {
        AuthRoutes(router);
    }

}
