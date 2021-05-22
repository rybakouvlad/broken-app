const jwt = require('jsonwebtoken');
const db = require('../db');

const User = require('../models/user')(db);

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next(); // allowing options as a method for request
  } else {
    const sessionToken = req.headers.authorization;
    console.log('TOKEN', sessionToken.split(' '));
    const token = sessionToken.split(' ')[1];
    if (!token)
      res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, 'lets_play_sum_games_man', async (err, decoded) => {
      if (decoded) {
        User.findOne({ where: { id: decoded.id } }).then(
          (user) => {
            const result = user.toJSON();
            req.user = result;

            next();
          },
          () => {
            res.status(401).send({ error: 'not authorized' });
          }
        );
      } else {
        res.status(400).send({ error: 'not authorized' });
      }
    });
  }
};
