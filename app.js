// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');

// импорт роутов
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

const app = express();

// хардкод айди пользователя для карточки
app.use((req, res, next) => {
  req.user = {
    _id: '6492008cc8bd209608b8ff59',
  };
  next();
});

app.use(bodyParser.json());
app.use(userRoutes);
app.use(cardRoutes);

app.listen(PORT, () => {});
