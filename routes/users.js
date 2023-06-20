// eslint-disable-next-line eol-last
const router = require('express').Router();
const { getAllUsers, getUserById, addNewUser } = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', addNewUser);

module.exports = router;
