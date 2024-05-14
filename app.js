const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const bookRouter = require('./routes/bookRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const commentRouter = require('./routes/commentRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Body parser, reading data from body into req.body
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/comments', commentRouter);

// for (*) any routes not found on server
app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server!`(), 404));
});

app.use(globalErrorHandler);

module.exports = app;
