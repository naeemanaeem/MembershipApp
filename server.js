const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
//const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dotevn = require('dotenv');
const morgan = require('morgan');
const morganBody = require('morgan-body');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load config
dotevn.config({path: './config/config.env'});

// Passport config
//require('./config/passport')(passport);

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    connectDB();
} else {
    connectDB('DEV');
}

// Create a new express application named 'app'
const app = express();

// Logging
//if (process.env.NODE_ENV === 'development') {
//    console.log('Running in development mode. Using morgan for logging');
//    app.use(morgan('dev'));
//}
// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
}));
   
const logsDir = "logs";
if (!fs.existsSync(logsDir)){
    fs.mkdirSync(logsDir);
}

// log all requests to access.log
/*app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, "logs", 'access.log'), { flags: 'a' })
}));

const log = fs.createWriteStream(
    path.join(__dirname, "logs", "express.log"), { flags: "a" }
);

morganBody(app, {
    // .. other settings
    noColors: true,
    stream: log,
  });
*/

// Configure the CORs middleware
app.use(cors());

// Configure the bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method;
        delete req.body.method;
        return method;
    }
}));

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// Passport middleware
//app.use(passport.initialize());
//app.use(passport.session());

// Set global var
app.use(function(req, res, next) {
    res.locals.user = req.user | null;
    next();
});

// Static
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/members', require('./routes/members'));
app.use('/payments', require('./routes/payments'));
//app.use('/newmembers', require('./routes/newmembers'));

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All. Not running in production or staging?'
    });
});

// Set our backend port to be either an environment variable or port 5000
const PORT = process.env.PORT || 5000;

// Configure our server to listen on the port defiend by our port variable
app.listen(PORT, () => console.log(`BACK_END_SERVICE_PORT: ${PORT}`));