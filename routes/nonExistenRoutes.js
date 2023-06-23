const router = require('express').Router();
const { notFoundMessage, notFoundStatus } = require('../utils/constants');

// обработчик несуществующих адресов
module.exports = router.use('/*', (req, res) => res.status(notFoundStatus).send(notFoundMessage));
