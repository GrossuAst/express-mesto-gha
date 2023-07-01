const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // const { auth } = req.cookies.jwt;
  // console.log(req.cookies.jwt);
  // if (!auth || !auth.startsWith('Bearer ')) {
  //   return res.status(401).send({ message: 'Необходима авторизация' });
  // }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'key');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};
