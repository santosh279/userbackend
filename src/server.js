const app = require('express')();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger.json');

const logging = require("./utlis/logging")
const config = require('config');

const router = require("./routes");

const NAMESPACE = config.get("SERVER.NAMESPACE");

/**
 * Logging request
 */
app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP = [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(
            NAMESPACE,
            `METHOD - [${req.method}], 
        URL - [${req.url}], IP = [${req.socket.remoteAddress}], STATUS - [${req.statusCode}]`
        );
    });
    next();
});

/**
 * Mongo connections
 */
const mongo_uri = `mongodb://${config.get('DB.HOST_NAME')}:${config.get("DB.PORT")}/${config.get('DB.DATABASE_NAME')}`
mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    logging.info(NAMESPACE, `DATABASE CONNECTED!!`)
})
.catch(err => {
    logging.error(NAMESPACE, `DATABASE CONNECTION NOT ESTABLISHED!!` + err)
})

/**
 * Parse request
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 * Cors policy
 */
app.use(cors());


/**
 * Create a write stream and to setup a logger
 */
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

/**
 * Swagger configuration
 */
app.use(`/${config.get('SERVER.API_VERSION')}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Routes
 */
app.use(`/${config.get('SERVER.API_VERSION')}`, router)

/**
 * Error Handling
 */
app.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

/**
 * Create Server
 */
app.listen(config.get("SERVER.PORT"), () => logging.info(NAMESPACE, `Server running on ${config.get('SERVER.HOST_NAME')}:${config.get("SERVER.PORT")}`));