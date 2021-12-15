const express = require('express');
const cookieSession = require('express-session');
const passport = require("passport");
const router = require('express').Router();
const bodyParser = require('body-parser');
const sequelize = require("sequelize");
var debug = require('debug')('express-sequelize');
const cors = require('cors');
const models = require('./models');
const authRoutes = require('./routes/auth-routes');
const eventsRoutes = require('./routes/events-routes');
const calendarListRoutes = require('./routes/calendarList-routes');
const passportSetup = require('./config/passport-setup');

const http = require('http');

var MySQLStore = require('express-mysql-session')(cookieSession);

var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'calendar_test'
};

var sessionStore = new MySQLStore(options);

var port = 3000;

const app = express();

var corsOptions = {
    origin: 'http://localhost:4201',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin','X-Requested-With','contentType','Content-Type','Accept','Authorization', 'X-Video-Description', 'X-Video-Title', 'X-Video-Category'],
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.set('trust proxy', 1);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    secret:'supersecretkey',
    store: sessionStore,
    cookie: { httpOnly: false },
    secure: false,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// define routes here - START
app.use('/auth', authRoutes);
app.use('/api',  eventsRoutes);
app.use('/api',  calendarListRoutes);
// define routes here - END

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
/**
 * Create HTTP server.
 */
var server = http.createServer(app);

models.sequelize.sync().then(function() {
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port, function() {
        debug('Express server listening on port ' + server.address().port);
    });
    server.on('error', onError);
    server.on('listening', onListening);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

