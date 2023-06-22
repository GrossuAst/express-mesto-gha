// eslint-disable-next-line eol-last
const Card = require('../models/card');

const serverError = { message: 'На сервере произошла ошибка' };
const statusOk = 200;
const statusCreated = 201;
const statusError = 500;

// получение всех карточек
const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(statusOk).send(cards))
    .catch(() => res.status(statusError).send(serverError));
};

// создание карточки
const createCard = (req, res) => {
  const { name, link } = req.body;
  // console.log(req.user._id);
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(statusCreated).send({ data: card }))
    .catch(() => res.status(statusError).send(serverError));
};

// удаление карточки
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.status(statusOk).send({ data: card }))
    // .then(() => console.log(req.user._id, req.params.cardId))
    .catch(() => res.status(statusError).send(serverError));
};

// поставить лайк
const putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(() => res.status(statusOk))
    // .then(() => console.log(req.params, req.user._id))
    .catch(() => res.status(statusError).send(serverError));
};

// убрать лайк
const unPutLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(() => res.status(statusOk))
    .catch(() => res.status(statusError).send(serverError));
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  putLike,
  unPutLike,
};
