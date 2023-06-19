// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const Users = require('./models/user');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  Users.find({})
    .then((users) => res.status(200).send(users));
});

app.get('/users/:id', (req, res) => {
  Users.findById(req.params.id)
    .then((user) => res.status(200).send({ data: user }));
});

app.post('/users', (req, res) => {
  res.status(201);
  const { name, about, avatar } = req.body;
  Users.create({ name, about, avatar });
  // const newUser = req.body;
  // console.log(newUser);
  res.send('user created');
});

app.listen(PORT, () => {});
