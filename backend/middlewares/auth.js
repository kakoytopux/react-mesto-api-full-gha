const jwt = require('jsonwebtoken');
const errCodeUnauthorized = require('../errors/errCodeUnauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new errCodeUnauthorized('Для продолжения необходимо пройти авторизацию.'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'a71e243eebaec3567de07798fac7b128d837ee48bdbfa1fc03ddb6f867f6b37d');
  } catch (err) {
    next(new errCodeUnauthorized('Для продолжения необходимо пройти авторизацию.'));
    return;
  }

  req.user = payload;
  next();
};
