let { query } = require('express');
let { contas, saques, depositos, transferencias } = require('../bancodedados');
const { banco } = require('../bancodedados')


const criarContaCliente = (req, res) => {
    const { nome, senha, cpf, data_nascimento, telefone, email } = req.body

    if (!nome) {
        return res.status(400).json({ mensagem: 'O NOME É OBRIGATORIO' })
    }
    if (!email) {
        return res.status(400).json({ mensagem: 'O EMAIL É OBRIGATORIO ' })
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'A SENHA É OBRIGATORIA ' })
    }
    if (!cpf) {
        return res.status(400).json({ mensagem: 'O CPF É OBRIGATORIO ' })
    }
    if (!data_nascimento) {
        return res.status(400).json({ mensagem: 'A DATA DE NASCIMENTO É OBRIGATORIO ' })
    }
    if (!telefone) {
        return res.status(400).json({ mensagem: 'O TELEFONE É OBRIGATORIO ' })
    }

    const verificaCpf = contas.find((resultadoCpf) => {
        return resultadoCpf.usuario.cpf === cpf
    })

    const verificaEmail = contas.find((resultadoEmail) => {
        return resultadoEmail.usuario.email === email
    })

    if (verificaEmail || verificaCpf) {
        return res.status(404).json({ mesangem: ' ja existe uma conta com o cpf ou e-mail informado!' })
    }



    let id = 0
    if (contas.length > 0) {
        id = contas.length
    }

    const conta = {
        numero: String(id),
        saldo: Number(),
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }

    }

    contas.push(conta)
    return res.status(201).json(conta)
}

const listarContas = (req, res) => {
    const { senha_banco } = req.query

    if (senha_banco !== banco.senha) {
        return res.status(400).json({ mesangem: 'A senha do banco informada é invalida!' })
    }

    return res.status(200).json(contas)
}


const atualizarCadastroConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    const { numero } = req.params;

    if (!nome) {
        return res.status(400).json({ mensagem: 'O NOME É OBRIGATORIO' })
    }
    if (!email) {
        return res.status(400).json({ mensagem: 'O EMAIL É OBRIGATORIO ' })
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'A SENHA É OBRIGATORIO ' })
    }
    if (!cpf) {
        return res.status(400).json({ mensagem: 'O CPF É OBRIGATORIO ' })
    }
    if (!data_nascimento) {
        return res.status(400).json({ mensagem: 'A DATA DE NASCIMENTO É OBRIGATORIO ' })
    }
    if (!telefone) {
        return res.status(400).json({ mensagem: 'O TELEFONE É OBRIGATORIO ' })
    }
    const contaUsuario = contas.find((contaUsuario) => {
        return contaUsuario.numero === numero
    })

    if (!contaUsuario) {
        return res.status(404).json({ mensagem: 'conta nao encontrada' })
    }

    const verificaEmail = contas.find((resultadoEmail) => {
        return resultadoEmail.usuario.email === email
    })

    if (!verificaEmail) {
        return res.status(404).json({ mesangem: ' email ja exister' })
    }

    const verificaCpf = contas.find((resultadoCpf) => {
        return resultadoCpf.usuario.cpf === cpf
    })

    if (!verificaCpf) {
        return res.status(404).json({ mesangem: 'cpf ja exister' })
    }



    contaUsuario.usuario.nome = nome,
        contaUsuario.usuario.email = email,
        contaUsuario.usuario.senha = senha,
        contaUsuario.usuario.cpf = cpf,
        contaUsuario.usuario.data_nascimento = data_nascimento
    contaUsuario.usuario.telefone = telefone



    return res.status(204).send()
}


const deleteContaBancaria = (req, res) => {
    let { numero } = req.params


    const contaUsuario = contas.find((contaUsuario) => {
        return contaUsuario.numero === numero
    })

    if (!contaUsuario) {
        return res.status(404).json({ mensagem: 'conta nao encontrada' })
    }
    if (contaUsuario.saldo !== 0) {
        return res.status(404).json({ mensagem: 'A conta so pode ser excluida ser o saldo for zero ' })
    }

    contas = contas.filter((contas) => {
        return contas.numero !== numero
    })

    return res.status(204).send()
}




const fazerDepositor = (req, res) => {
    const { numero, valor } = req.body


    if (!numero) {
        return res.status(400).json({ mensagem: 'o numero da conta é obrigatorio' })
    }

    if (!valor) {
        return res.status(404).json({ mensagem: 'voce precisa digita o valor' })
    }
    const contaUsuario = contas.find((contaUsuario) => {
        return contaUsuario.numero === numero
    })

    if (!contaUsuario) {
        return res.status(404).json({ mensagem: 'numero da conta nao exister' })
    }

    contaUsuario.saldo += valor

    const fazendoDeposito = {
        data: new Date(),
        numero,
        valor,
    }

    depositos.push(fazendoDeposito)
    return res.status(201).send(fazendoDeposito)

}




const fazerSaque = (req, res) => {
    const { numero, senha, valor } = req.body

    if (!numero) {
        return res.status(400).json({ mensagem: 'o numero da conta é obrigatorio' })
    }

    if (!senha) {
        return res.status(400).json({ mesagem: 'voce precisa digita uma senha' })
    }

    if (!valor) {
        return res.status(404).json({ mensagem: 'voce precisa digita o valor' })
    }
    const contaUsuario = contas.find((contaUsuario) => {
        return contaUsuario.numero === numero
    })

    if (!contaUsuario) {
        return res.status(404).json({ mensagem: 'numero da conta nao exister' })
    }

    const verificaSenha = contas.find((senhaUsuario) => {
        return senhaUsuario.usuario.senha === senha
    })

    if (!verificaSenha) {
        return res.status(404).json({ mensagem: ' a senha esta incorreta' })
    }

    contaUsuario.saldo -= valor

    const saqueValor = {
        data: new Date(),
        numero,
        valor,
        senha,
    }

    saques.push(saqueValor)
    return res.status(201).send(saqueValor)

}




const fazerTransferencia = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, numero, valor, senha } = req.body


    if (!numero_conta_origem) {
        return res.status(400).json({ mesagem: 'A conta de origem é obrigatorio' })
    }
    if (!numero_conta_destino) {
        return res.status(400).json({ mensagem: 'A conta de destino e obrigatorio' })
    }
    if (!valor) {
        return res.status(404).json({ mensagem: 'voce precisa digita o valor' })
    }
    if (!senha) {
        return res.status(400).json({ mesagem: 'voce precisa digita a senha' })
    }
    if (numero_conta_origem === numero_conta_destino) {
        return res.status(400).json({ mesagem: 'voce nao pode fazer transferencia para mesma conta' })
    }
    const contaDeOrigem = contas.find((buscaIdConta1) => {
        return buscaIdConta1.usuario.numero === numero
    })

    if (!contaDeOrigem) {
        return res.status(404).json({ mesagem: ' A conta de origem nao existe' })
    }
    const contaDeDestino = contas.find((buscaIdConta2) => {
        return buscaIdConta2.numero === numero
    })

    if (!contaDeDestino) {
        return res.status(400).json({ mesagem: ' a conta de destino nao existe' })
    }


    if (contaDeOrigem.saldo <= 0) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente!' })
    }

    if (contaDeOrigem.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: ' A senha do banco informada é invalida' })
    }



    contaDeOrigem.saldo -= valor
    contaDeDestino.saldo += valor

    const transfereciaRecebida = {
        data: new Date(),
        numero_conta_origem,
        numero_conta_destino,
        valor,
    }


    transferencias.push(transfereciaRecebida)
    return res.status(204).send()



}




// consulta saldo de usuario
const consultaSaldoEmConta = (req, res) => {
    const { numero, senha } = req.query

    if (!numero) {
        return res.status(400).json({ mesagem: 'numero da conta é obrigatorio' })
    }

    const encontraContas = contas.find((encontrar) => {
        return encontrar.numero === numero
    })

    if (!encontraContas) {
        return res.status(404).json({ mesagem: 'conta nao encontrada' })
    }

    if (encontraContas.usuario.senha !== senha) {
        return res.status(400).json({ mesangem: ' senha invalida' })
    }

    return res.status(200).json({ saldo: encontraContas.saldo })


}



// consulta extrato bancario de um usuario
const consultaExtrato = (req, res) => {
    const { numero, senha } = req.query

    if (!numero) {
        return res.status(400).json({ mensagem: ' voce precisa informa o numero da conta' })
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'voce precisa digita a senha' })
    }
    const encontraContas = contas.find((encontrar) => {
        return encontrar.numero === numero
    })

    if (!encontraContas) {
        return res.status(404).json({ mesagem: 'conta nao encontrada' })
    }

    if (encontraContas.usuario.senha !== senha) {
        return res.status(400).json({ mesangem: ' senha invalida' })
    }

    const saqueDoUsuario = saques.filter((saque) => {
        return saque.numero === numero
    })

    const depositoDeUsuario = depositos.filter((deposito) => {
        return deposito.numero === numero
    })
    const transferenciaDeusuario = transferencias.filter((transferencia) => {
        return transferencia.numero === numero
    })
    const extratoBancario = {
        depositos: depositoDeUsuario,
        saques: saqueDoUsuario,
        transferencias: transferenciaDeusuario


    }

    return res.status(200).json(extratoBancario)


}



module.exports = {
    criarContaCliente,
    listarContas,
    atualizarCadastroConta,
    deleteContaBancaria,
    fazerDepositor,
    fazerSaque,
    fazerTransferencia,
    consultaSaldoEmConta,
    consultaExtrato


}