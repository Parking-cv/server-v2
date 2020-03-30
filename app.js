const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

///////////// test ///////////////////
require('./util/TestData').generateData();
//////////////////////////////////////

const piRouter = require('./routes/pi');
const apiRouter = require('./routes/api');
const adminRouter = require('./routes/admin');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/pi', piRouter);
app.use('/api', apiRouter);
app.use('/admin', adminRouter);

module.exports = app;
