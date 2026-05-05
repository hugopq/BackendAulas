const {sequelize, Book, User, Loan} = require('./models');
// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger-docs.json');


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// rotas:
var loansRouter = require('./routes/loans');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');

var app = express();

// configuração da BD
sequelize.sync({ force: true }) //force:true - obriga a eliminar e recriar a base de dados
    .then(() =>{
        console.log("BD sincronizada");
    })
    .catch((error) => {
      console.log(error);
        console.log("erro ao aceder à BD");
    });


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// uso das rotas:
app.use('/loans', loansRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
