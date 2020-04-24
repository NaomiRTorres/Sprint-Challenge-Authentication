const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js');
const Users = require('../users/userModel.js');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;
  
  Users.insert(user)
  .then(saved => {
    res.status(201).json(saved);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'error 500 in post register'
    });
  });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
  .then(([user]) => {
    if(user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: 'Welcome', token
      });
    } else {
      res.status(401).json({
        message: 'You shall not pass'
      });
    };
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'error 500 in post login'
    });
  });
});

function generateToken(user){
  const payload = {
    userId: user.id,
    username: user.username,
    password: user.password
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: '2d'
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
