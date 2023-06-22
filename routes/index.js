const router = require('express').Router();

const serverError = { message: 'На сервере произошла ошибка' };
const notFoundError = 404;

router.use('/*', (req, res) => {
  res.status(notFoundError).send(serverError);
});

module.exports = router;
