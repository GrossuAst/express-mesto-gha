const router = require('express').Router();
// eslint-disable-next-line object-curly-newline
const { getAllUsers, getUserById, updateProfile, updateAvatar } = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
// router.post('/users', addNewUser);
// router.post('/signup', addNewUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
