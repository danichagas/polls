# API de Enquetes

![Node.js](https://img.shields.io/badge/Node.js-22-blue?style=for-the-badge&logo=node.js)
![Docker](https://img.shields.io/badge/Docker-white?style=for-the-badge&logo=docker)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-white?style=for-the-badge&logo=postgresql)
![Redis](https://img.shields.io/badge/Redis-black?style=for-the-badge&logo=redis)

Uma API robusta para criação e votação de enquetes, construída com as mais modernas ferramentas do ecossistema Node.js.

## Sobre o Projeto

Esta API permite que os usuários criem enquetes com múltiplas opções, votem nelas e vejam os resultados em tempo real. O projeto foi desenvolvido com foco em escalabilidade e boas práticas de desenvolvimento, utilizando Docker para garantir um ambiente consistente e fácil de configurar.

---

## Funcionalidades

* **Criação de Enquetes:** Crie novas enquetes com um título e múltiplas opções.
* **Votação:** Registre votos em uma opção específica de uma enquete.
* **Consulta de Resultados:** Obtenha os detalhes e a contagem de votos de uma enquete.
* **Validação de Dados:** Utiliza **Zod** para garantir que todos os dados de entrada sejam seguros e formatados corretamente.
* **Persistência de Dados:** Armazena os dados das enquetes de forma segura em um banco de dados **PostgreSQL**, gerenciado pelo ORM **Prisma**.
* **Cache e Desempenho:** Utiliza **Redis** para cachear os resultados das enquetes, garantindo respostas rápidas.

---

## Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

* [**Node.js**](https://nodejs.org/): Ambiente de execução JavaScript no servidor.
* [**Docker**](https://www.docker.com/): Plataforma de containerização para criar e gerenciar o ambiente de desenvolvimento e produção.
* [**PostgreSQL**](https://www.postgresql.org/): Banco de dados relacional para persistência dos dados.
* [**Redis**](https://redis.io/): Banco de dados em memória para cache e gerenciamento de estado.
* [**Prisma**](https://www.prisma.io/): ORM (Object-Relational Mapper) de última geração para interagir com o banco de dados.
* [**Zod**](https://zod.dev/): Biblioteca para validação de esquemas de dados.


---