const router = require('express').Router();
const { addNewUser } = require('../controllers/users');

router.post('/signup', addNewUser);

module.exports = router;
