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
const getInfoAboutMe = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(notFoundStatus).send(notFoundMessage);
      }
      return res.status(statusOk).send({ data: user });
    })
    .catch(() => res.status(badRequestStatus).send(defaultMessage));
};

// добавление нового пользователя
const addNewUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  if (validator.isEmail(email)) {
    return bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name, about, avatar, email, password: hash,
      }))
      .then((user) => res.status(statusCreated).send({ data: user }))
      .catch(() => res.status(401).send({ message: 'Такой пользователь уже существует' }));
  }
  if (!email || !password) {
    return res.status(badRequestStatus).send({ message: 'Введите email и пароль' });
  }
  return res.status(badRequestStatus).send({ message: 'Введите существующий email' });
};

// логин
const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'key', { expiresIn: '7d' });
      res.status(statusOk).cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).end();
      // res.status(200).send({ token });
    })
    .catch(() => {
      res.status(401).send({ message: 'Ошика' });
    });
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
