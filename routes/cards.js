// eslint-disable-next-line eol-last
const router = require('express').Router();
// eslint-disable-next-line object-curly-newline
const { getAllCards, createCard, deleteCard, putLike, unPutLike } = require('../controllers/cards');

router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', putLike);
router.delete('/cards/:cardId/likes', unPutLike);

module.exports = router;
