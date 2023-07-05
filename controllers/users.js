/* eslint-disable object-curly-newline */
const validator = require('validator');
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
// const authorization = require('../middlewares/auth');

const User = require('../models/user');
const {
  defaultMessage,
  notFoundMessage,
  statusOk,
  statusCreated,
  defaultErrorStatus,
  badRequestStatus,
  notFoundStatus,
} = require('../utils/constants');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');

// получение всех пользователей
const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(statusOk).send(users))
    .catch(() => res.status(defaultErrorStatus).send(defaultMessage));
};

// получение пользователя по id
const getUserById = (req, res) => {
  User.findById(req.params.id)
    // .then((user) => res.send({ data: user }))
    .then((user) => {
      if (!user) {
        return res.status(notFoundStatus).send(notFoundMessage);
      }
      return res.status(statusOk).send({ data: user });
    })
    .catch(() => res.status(badRequestStatus).send(defaultMessage));
};

// информация о текущем пользователе
const getInfoAboutMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(notFoundStatus).send(notFoundMessage);
      }
      return res.status(statusOk).send({ data: user });
    })
    .catch(next);
};

const addNewUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  // if (name.length < 2 || name.length > 30) {
  //   throw new BadRequestError('Имя должно содержать от 2 до 30 символов');
  // }
  // if (about.length < 2 || about.length > 30) {
  //   throw new BadRequestError('Поле "о себе" должно содержать от 2 до 30 символов');
  // }
  if (!email || !password) {
    throw new BadRequestError('Введите email и пароль');
  }
  if (!validator.isEmail(email)) {
    throw new BadRequestError('Введите существующий email');
  }
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Такой пользователь уже существует');
      }
      return bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({ name, about, avatar, email, password: hash })
            .then((newUser) => {
              res.status(statusCreated).send({ data: newUser });
            });
        });
    })
    .catch(next);
};

// логин
const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Введите почту и пароль');
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      const token = jwt.sign({ _id: user._id }, 'key', { expiresIn: '7d' });
      res.status(statusOk).cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send({ jwt: token });
    })
    .catch(next);
};

// обновление данных профиля
const updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    // данные для обновления
    { name: req.body.name, about: req.body.about },
    // опции
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => res.status(statusOk).send({ data: user }))
    .catch(() => res.status(badRequestStatus).send(defaultMessage));
};

// обновление аватарки
const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => res.status(statusOk).send({ data: user }))
    .catch(() => res.status(defaultErrorStatus).send(defaultMessage));
};

module.exports = {
  getAllUsers,
  getUserById,
  getInfoAboutMe,
  addNewUser,
  login,
  updateProfile,
  updateAvatar,
};
