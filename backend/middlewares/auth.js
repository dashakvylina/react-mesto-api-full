const jwt = require('jsonwebtoken');
const {
  UnauthorizedError,
} = require('../errors');
require('dotenv').config();

function auth(req, res, next) {
  const { token } = req.cookies;

  try {
    if (!token) {
      throw new UnauthorizedError('Необходима авторизация,');
    }
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      next(new UnauthorizedError('Необходима авторизация'));
    }

    req.user = payload; // {_id: '...'}

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  auth,
};
