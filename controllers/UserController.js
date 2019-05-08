const User = require('./../models/User');
const bcrypt = require('bcryptjs');
const errors = require('./../config/Errors.js');

module.exports = {
    getUsers: async (req, res) => {
        const users = await User.findAll();
        res.json(users);
    },
    createUser: async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password)
            return res.send('Username and Password are required').status(401);

        const hash = await bcrypt.hash(password, 10).catch((err) => {
            if (err)
                return res.send('Error while processing the request').status(500);
        });

        try {
            const user = await User.create({ username, password: hash });

            if (user) {
                res.json(user).status(200);
            }
        } catch (error) {
            if (error.parent.errno === errors.UNIQUE_CONS) {
                return res.send('Username give is already in use').status(500);
            }

            return res.send('Unknown error').status(500);

        }

    }
}