const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const piRouter = require('./routes/pi');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/pi', piRouter);
app.use('/test', (req, res) => { res.send("Hello, World!") });

module.exports = app;
