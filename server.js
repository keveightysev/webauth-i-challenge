const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./users/route.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
	res.send(`
        <h1>This is my server</h1>
        <h2>There are others like it but this one is mine</h2>
    `);
});

server.use('/users', userRouter);

module.exports = server;
