// eslint-disable-next-line eol-last
const router = require('express').Router();
// eslint-disable-next-line object-curly-newline
const { getAllUsers, getUserById, addNewUser, updateProfile, updateAvatar } = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', addNewUser);
router.patch('./users/me', updateProfile);
router.patch('./users/me/avatar', updateAvatar);

module.exports = router;
