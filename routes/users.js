const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
// const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers,
  getUserById,
  getInfoAboutMe,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getAllUsers);
router.post('/users/me', getInfoAboutMe);
router.get('/users/:id', getUserById);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
