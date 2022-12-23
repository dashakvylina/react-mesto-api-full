const jwt = require('jsonwebtoken');
const {
  UnauthorizedError,
} = require('../errors');

function auth(req, res, next) {
  const { token } = req.cookies;

  try {
    if (!token) {
      throw new UnauthorizedError('Необходима авторизация,');
    }
    let payload;
    try {
      payload = jwt.verify(token, 'some-secret-key');
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
