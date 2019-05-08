require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password)
            return res.send('Username and Password are required').status(401);

        const user = await User.findOne({ where: { username } }).catch((err) => {
            return res.send('Error while processing the request').status(500);
        });

        if (!user)
            return res.send('Given username was not found').status(404);

        bcrypt.compare(password, user.password, (err, result) => {
            if (!result) {
                return res.send('Given password is not valid');
            }
            jwt.sign({ id: user.id }, process.env.API_SECRET_KEY, { expiresIn: "1h" },
            (err, token) => {
                
                    console.log(process.env.API_SECRET_KEY);
                    if (err) {
                        return res.send("There was a problem while processing the request").status(500);
                    }

                    res.json({ id: user.id, token });
                });

        });

    },

    logout: (req, res) => {

    }
}