const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// импорт роутов
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const nonExistenRoutes = require('./routes/nonExistenRoutes');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

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
app.use(registerRouter);
app.use(loginRouter);
app.use(nonExistenRoutes);

app.listen(PORT, () => {});
