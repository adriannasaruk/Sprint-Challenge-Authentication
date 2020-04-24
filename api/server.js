const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const Users = require("../database/dbConfig")

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.post('/register', (req, res) => {
    // implement registration
    let user = req.body
  
    const rounds = process.env.HASH_ROUNDS || 14
  
    const hash = bcrypt.hashSync(user.password, rounds)
  
    user.password =hash
  
    Users.add(user)
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({errorMessage:" Error"})
    })
  });

server.post('/login', (req, res) => {
    // implement login
    let {username, password} = req.body
  
    Users.findBy({username})
    .then(([user]) => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        res.status(200).json({message: "Welcome!", token})
      } else {
        res.status(401).json({message: "you can't pass"})
      }
    })
    .catch(error => {
      res.status(500).json({message: error.message})
    })
  });


module.exports = server;
