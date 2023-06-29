const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// импорт роутов
const nonExistenRoutes = require('./routes/nonExistenRoutes');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const auth = require('./middlewares/auth');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(registerRouter);
app.use(loginRouter);
app.use(auth);
app.use(userRoutes);
app.use(cardRoutes);
app.use(nonExistenRoutes);

app.listen(PORT, () => {});
