const express = require('express');
const parser = require('body-parser');
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');
const validate = require('./middleware/validate-session');

const app = express();

db.sync();
app.use(parser);

app.use('/api/auth', user);
app.use(validate);

app.use('/api/game', game);
app.listen(() => {
  console.log('App is listening on 4000');
});
