/** Required Dependencies */
require('dotenv').config();
const express = require('express');
const app = express();
const openRouter = express.Router();
const authRouter = express.Router();
const routes = require('./routes');
const bodyParser = require('body-parser');
const jwtMidleware = require('./middlewares/jwt');
/** End Required Dependencies */

/** INIT DATABASE */
const Database = require("./db");
Database.initDB();
/** ==== */

/** Setup Environment Variables */
const PORT = process.env.PORT;
const HOST = process.env.NODE_ENV === "dev" ? process.env.DEV_HOST : process.env.HOST;
/** End Setup Environment Variables */

/** Setup Routes */
openRouter.use(jwtMidleware);
routes.open(openRouter);
routes.auth(authRouter);
/** End Setup Routes */

app.use((req, res, next) => {
    if (process.env.NODE_ENV === "dev") {
        console.log(`Method: ${req.method} Request: ${req.url}`);
    }
    res.header("Access-Control-Allow-Origin", `${process.env.NODE_ENV === "dev" ? process.env.DEV_HOST : process.env.HOST}`);
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', openRouter);
app.use('/auth', authRouter);

app.listen(PORT, (err) => {
    try {
        if (err) {
            console.log(err);
        }
        console.log(`Server's listening on ${process.env.NODE_ENV === "dev" ? process.env.DEV_HOST : process.env.HOST}`);
    } catch (error) {
        console.log(error);
    }
});

app.get('/', (req, res) => {
    res.send('Hi, this is a message from lalaland');
});
