const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const fs = require('fs');

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const authRouter = require("./routes/auth");
const accountRouter = require("./routes/account");

const app = express();

const dev = true
const addr = dev
  ? 'mongodb://mongodb-com'
  : 'mongodb://[url mongodb]'

mongoose.connect(addr, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to mongodb database');
    })
    .catch(err => {
        console.error('Could not connect to mongodb database:', err.stack);
        process.exit(1);
    });

app.disable('x-powered-by');

app.use(cors());

app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
    resave: false,
    saveUninitialized: true,
    secret: 'the-count-of-money-secret'
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use('/api/auth', authRouter);
app.use('/api/account', accountRouter);

module.exports = app;
