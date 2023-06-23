// eslint-disable-next-line eol-last
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

// добавление нового пользователя
const addNewUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(statusCreated).send({ data: user }))
    .catch(() => res.status(badRequestStatus).send(defaultMessage));
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
  addNewUser,
  updateProfile,
  updateAvatar,
};
