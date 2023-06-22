// eslint-disable-next-line eol-last
const User = require('../models/user');

const serverError = { message: 'На сервере произошла ошибка' };
const statusOk = 200;
const statusCreated = 201;
const statusError = 500;
const badRequest = 400;

// получение всех пользователей
const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(statusOk).send(users))
    .catch(() => res.status(statusError).send(serverError));
};

// получение пользователя по id
const getUserById = (req, res) => {
  User.findById(req.params.id)
    // .then((user) => res.send({ data: user }))
    .then((user) => {
      if (!user) {
        return res.status(404).send(serverError);
      }
      return res.send({ data: user });
    })
    .catch(() => res.status(badRequest).send(serverError));
};

// добавление нового пользователя
const addNewUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(statusCreated).send({ data: user }))
    .catch(() => res.status(badRequest).send(serverError));
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
    .catch(() => res.status(badRequest).send(serverError));
};

// обновление аватарки
const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => res.status(statusOk).send({ data: user }))
    .catch(() => res.status(statusError).send(serverError));
};

module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
  updateProfile,
  updateAvatar,
};
