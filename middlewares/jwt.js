require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

    try {
        let token = req.headers['authorization'];
        if (!token) {
            return res.send("Token wasn't provided").status(403);
        }

        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        jwt.verify(token, process.env.API_SECRET_KEY, { algorithms: ['HS256'] }, (err, hash) => {
            if (err) {
                return res.send(err.message).status(500);
            }
            next();
        });
    } catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}