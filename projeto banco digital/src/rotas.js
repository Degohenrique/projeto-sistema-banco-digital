const express = require('express');
const banco = require('./controladores/Banco');

const rotas = express()

rotas.post('/contas', banco.criarContaCliente)
rotas.get('/contas', banco.listarContas)
rotas.put('/contas/:numero/conta/usuario', banco.atualizarCadastroConta)
rotas.delete('/contas/:numero', banco.deleteContaBancaria)
rotas.post('/contas/trasacoes/depositar', banco.fazerDepositor)
rotas.post('/contas/transacoes/sacar', banco.fazerSaque)
rotas.post('/contas/transacoes/transferir', banco.fazerTransferencia)
rotas.get('/contas/saldo', banco.consultaSaldoEmConta)
rotas.get('/contas/extrato', banco.consultaExtrato)
module.exports = rotas