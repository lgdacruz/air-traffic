Air Traffic

Descrição do Projeto

O Air Traffic é um projeto que simula o tráfego aéreo, fornecendo visualização de tarefas e controle de movimentação de aeronaves. O objetivo é criar um sistema interativo para estudar padrões de tráfego e melhorar a segurança da navegação aérea.

Tecnologias Utilizadas

Linguagem: [ JavaScript]

Frameworks: [ Node.js e Nest]

Banco de Dados: [ PostgreSQL]

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
