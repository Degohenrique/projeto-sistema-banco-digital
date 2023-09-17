
---

# Banco Digital

Este é um projeto de banco digital simples em JavaScript que permite a criação de usuários, consulta de usuários, atualização de informações de usuários, depósito em contas de usuários, consulta de saldos de usuários, exclusão de contas de usuários, transferência de fundos entre contas, listagem de todos os usuários e saque de valor. É um sistema de banco digital básico para fins educacionais.

## Funcionalidades

O projeto inclui as seguintes funcionalidades:

1. **Adicionar Usuário:** Permite a criação de um novo usuário com informações básicas, como nome, número da conta e saldo inicial.

2. **Consultar Usuário:** Permite a consulta de informações de um usuário com base no número da conta.

3. **Atualizar Usuário:** Permite a atualização das informações de um usuário, como nome e saldo.

4. **Depósito:** Permite realizar um depósito em uma conta de usuário específica, aumentando seu saldo.

5. **Saque de Valor:** Permite que um usuário retire um valor específico de sua conta, diminuindo seu saldo.

6. **Consulta de Saldo:** Permite verificar o saldo atual de um usuário com base no número da conta.

7. **Excluir Conta:** Permite a exclusão de uma conta de usuário, removendo todas as informações associadas a essa conta.

8. **Transferência de Fundos:** Permite transferir fundos de uma conta para outra, especificando o número das contas de origem e destino, bem como o valor da transferência.

9. **Listagem de Todos os Usuários:** Permite listar todos os usuários cadastrados no banco digital.

## Pré-requisitos

Certifique-se de ter o seguinte instalado em seu ambiente de desenvolvimento:

- Node.js
- NPM (Node Package Manager)

## Instalação

1. Clone este repositório:

   ```bash
   git clone git@github.com:Degohenrique/projeto-sistema-banco-digital.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd projeto-banco-digital
   ```

3. Instale as dependências:

   ```bash
   npm install 
   ```

## Uso

Para executar o banco digital, você pode usar o seguinte comando:

```bash
node npm run dev 
```

A partir daqui, você pode interagir com o banco digital por meio de um console ou interface de linha de comando.


# executar
baixe o insomnia

![Alt text](image-1.png)

# POST http://localhost:3000/contas/
# cadastro de um usuario

![Alt text](image.png)


# GET http://localhost:3000/contas?senha_banco=Cubos123Bank
![Alt text](image-3.png)
# listagem de usuario


# DELETE http://localhost:3000/contas/id
![Alt text](image-4.png)
# excluir usuario do banco 

# POST http://localhost:3000/contas/trasacoes/depositar
![Alt text](image-5.png)
# fazer deposito

# POST http://localhost:3000/contas/trasacoes/sacar
![Alt text](image-6.png)
# fazer saque de conta

# POST http://localhost:3000/contas/transacoes/transferir
![Alt text](image-7.png)
# fazer transferecias entre contas

# GET http://localhost:3000/contas/saldo?numero=1&senha=12345
![Alt text](image-8.png)
# consulta saldo de conta

# GET http://localhost:3000/contas/extrato?numero=1&senha=12345
![Alt text](image-9.png)
# extrato banacario de uma conta

## Contribuição

Sinta-se à vontade para contribuir com melhorias para este projeto. Basta seguir as diretrizes de contribuição 
