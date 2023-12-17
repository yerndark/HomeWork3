const express = require('express');
const bodyParser = require('body-parser');
const studentsRouter = require('./students');

const app = express();


app.use(bodyParser.json());


app.use('/students', studentsRouter);

app.listen(3000, () => {
  console.log(`Сервер запущен`);
});