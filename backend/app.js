const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { Joi, celebrate, Segments } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const CardRouter = require('./routes/cards');
const UserRouter = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { NotFoundError } = require('./errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const app = express();

app.use(cors({
  origin: 'https://domainname.students.dasha.nomoredomains.club',
  credentials: true,
}));

app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  autoIndex: true,
});

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/https?:\/\/([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/i),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
}), login);

app.use('/', auth, CardRouter);
app.use('/', auth, UserRouter);

app.use(auth, (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует!'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500).send({ message: 'Unknown error' });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
  next();
});

app.listen(PORT, () => {
  console.log('Server is running');
});
