const express = require('express');
const rotas = require('./rotas')

const porta = express();

porta.use(express.json());

porta.use(rotas)




porta.listen(3000)