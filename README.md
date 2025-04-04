Air Traffic

Descrição do Projeto

O Air Traffic é uma API de tarefas para empresas, fornece um CRUD de tarefas e empregados, implementa filas (queue) para notificacoes por email e consome um microsservico feito em Express de Logs que pode ser conferido aqui (). O objetivo é criar um sistema interativo para melhorar a produtividade e gerir melhor as acoes e o tempo dos funcionários.

Tecnologias Utilizadas

Linguagem: [ JavaScript]

Frameworks: [ Node.js e Nest]

Banco de Dados SQL: [ PostgreSQL]

Banco de Dados NoSQL: [ DynamoDB]

Filas: [ Redis]

Envio de email: [ Nodemailer]

Outras Ferramentas: Docker, CI/CD (GitHub Actions)

Como Executar o Projeto

Requisitos

Docker e Docker Compose (opcional)

Node.js

Banco de Dados configurado

Passos para Execução

Clone o repositório:

git clone https://github.com/lgdacruz/air-traffic.git
cd air-traffic

Instale as dependências:

npm install

cp .env.example .env

# Edite o arquivo .env conforme necessário

Execute a aplicação:

npm run start:dev

Acesse no navegador:

http://localhost:3000 # ou a porta configurada

## Funcionalidades Principais

- Visualização de tarefas em tempo real relacionado ao funcionário responsável
