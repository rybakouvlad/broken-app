const express = require('express');
// const bodyParser = require('body-parser');
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');
const validate = require('./middleware/validate-session');

const app = express();

// app.use(require('body-parser'));

app.use(express.json());
app.use('/api/auth', user);
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(validate);

app.use('/api/game', game);
app.listen(4000, () => {
  console.log('App is listening on 4000');
});

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

db.sync();
