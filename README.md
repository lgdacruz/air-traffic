<h1>Air Traffic</h1>

Descrição do Projeto

O Air Traffic é uma API de tarefas para empresas, fornece um CRUD de tarefas e empregados, implementa filas (queue) para notificações por email e consome um microserviço feito em Express de Logs que pode ser conferido <a href="https://github.com/lgdacruz/log-microservice" target="_blank">aqui</a>. O objetivo é criar um sistema interativo para melhorar a produtividade e gerir melhor as ações e o tempo dos funcionários.

Tecnologias Utilizadas
<ul>
  <li>Linguagem: [ JavaScript]</li>
  <li>Frameworks: [ Node.js e Nest]</li>
  <li>Banco de Dados SQL: [ PostgreSQL]</li>
  <li>Banco de Dados NoSQL: [ DynamoDB]</li>
  <li>Filas: [ Redis]</li>
  <li>Envio de email: [ Nodemailer]</li>
  <li>Outras Ferramentas: Docker, CI/CD (GitHub Actions)</li>
</ul>


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
