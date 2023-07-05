// eslint-disable-next-line eol-last
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// eslint-disable-next-line object-curly-newline
const { getAllCards, createCard, deleteCard, putLike, unPutLike } = require('../controllers/cards');

router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
}), deleteCard);
router.put('/cards/:cardId/likes', putLike);
router.delete('/cards/:cardId/likes', unPutLike);

module.exports = router;
