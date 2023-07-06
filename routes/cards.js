// eslint-disable-next-line eol-last
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// eslint-disable-next-line object-curly-newline
const { getAllCards, createCard, deleteCard, putLike, unPutLike } = require('../controllers/cards');

router.get('/cards', getAllCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
}), deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
}), putLike);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
}), unPutLike);

module.exports = router;
