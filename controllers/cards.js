// eslint-disable-next-line eol-last
const Card = require('../models/card');
const {
  statusOk,
  statusCreated,
} = require('../utils/constants');
const ForbiddenError = require('../errors/forbidden');
const NotFoundError = require('../errors/not-found-error');

// получение всех карточек
const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(statusOk).send(cards))
    .catch(next);
};

// создание карточки
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  // console.log(req.user._id);
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(statusCreated).send({ data: card }))
    .catch(next);
};

// удаление карточки
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      }
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Вы не можете удалить эту карточку');
      }
      if (card) {
        return card.deleteOne().then((ok) => {
          res.status(statusOk).send(ok);
        });
      }
    })
    .catch(next);
};

// поставить лайк
const putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      }
      return res.status(statusOk).send(card);
    })
    .catch(next);
};

// убрать лайк
const unPutLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      }
      return res.status(statusOk).send(card);
    })
    .catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  putLike,
  unPutLike,
};
