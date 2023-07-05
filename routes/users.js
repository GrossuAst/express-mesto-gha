const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers,
  getUserById,
  getInfoAboutMe,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getAllUsers);
router.post('/users/me', getInfoAboutMe);
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24),
  }),
}), getUserById);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
