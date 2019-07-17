const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const authRouter = require('./auth/route.js');
const userRouter = require('./users/route.js');
const db = require('./data/dbConfig.js');

const server = express();

const sessionConfig = {
  name: 'kevin',
  secret: 'secret secrets are no fun',
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: db,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 120,
  }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/auth', authRouter);
server.use('/users', userRouter);

server.get('/', (req, res) => {
  res.send(`
        <h1>This is my server</h1>
        <h2>There are others like it but this one is mine</h2>
    `);
});

module.exports = server;
