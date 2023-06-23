// eslint-disable-next-line eol-last
const Card = require('../models/card');
const {
  defaultMessage,
  notFoundMessage,
  statusOk,
  statusCreated,
  defaultErrorStatus,
  badRequestStatus,
  notFoundStatus,
} = require('../utils/constants');

// получение всех карточек
const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(statusOk).send(cards))
    .catch(() => res.status(defaultErrorStatus).send(defaultMessage));
};

// создание карточки
const createCard = (req, res) => {
  const { name, link } = req.body;
  // console.log(req.user._id);
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(statusCreated).send({ data: card }))
    .catch(() => res.status(badRequestStatus).send(defaultMessage));
};

// удаление карточки
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(notFoundStatus).send(notFoundMessage);
      }
      return res.status(statusOk).send(card);
    })
    .catch(() => res.status(badRequestStatus).send(defaultMessage));
};

// поставить лайк
const putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(notFoundStatus).send(notFoundMessage);
      }
      return res.status(statusOk).send(card);
    })
    .catch(() => {
      res.status(badRequestStatus).send(defaultMessage);
    });
};

// убрать лайк
const unPutLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(notFoundStatus).send(notFoundMessage);
      }
      return res.status(statusOk).send(card);
    })
    .catch(() => res.status(badRequestStatus).send(defaultMessage));
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  putLike,
  unPutLike,
};
