# Projeto de Gestão de Pacientes com AdonisJS
Este é um projeto desenvolvido com [AdonisJS](https://adonisjs.com/), focado na gestão de pacientes e seus agendamentos. Ele fornece uma API para criação, leitura, atualização e exclusão (CRUD) de pacientes e consultas, utilizando um banco de dados relacional.
## Requisitos
Para executar este projeto, você precisa garantir que os seguintes requisitos estejam instalados na sua máquina:
- **Node.js** 18+
- **npm**
- **Docker** e **Docker Compose**

## Instalação
1. **Instale as dependências necessárias**:
``` bash
npm install
```
2. **Configure o banco de dados com Docker Compose**: No diretório `infra`, existe um arquivo `docker-compose.yml`, que contém as configurações necessárias para subir um banco de dados PostgreSQL. Para executá-lo, siga as etapas abaixo:

- Primeiro, navegue até o diretório `infra`:
``` bash
cd infra
```
- Em seguida, execute o comando para subir o container:
``` bash
docker-compose up -d
```
Isso iniciará um container com o banco de dados PostgreSQL configurado e disponível para o projeto.
3. **Configure as variáveis de ambiente**:
  - Duplique o arquivo `.env.example` na raiz do projeto e renomeie-o para `.env`.
  - O arquivo já contém as configurações padrão definidas na execução do container de Postgres:
``` env
DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=postgres
PG_DB_NAME=adonis
```
4. **Execute as migrações do banco de dados**: Após configurar o banco, aplique as migrações rodando:
``` bash
node ace migration:run
```
5**Execute o seed do banco de dados**: Após configurar o banco, execute o seeder de usuário ADMIN rodando:
``` bash
node ace db:seed
```
## Executando o projeto
1. **Inicie o servidor de desenvolvimento**:
``` bash
npm run dev
```
O servidor será iniciado por padrão em: `http://127.0.0.1:3333`.
2. **Endpoints disponíveis**:
   Os endpoints estão organizados para realizar as operações de CRUD. Exemplos:
  - **GET** `/patients` — Listar todos os pacientes
  - **POST** `/patients` — Criar um novo paciente
  - **GET** `/patients/:id` — Mostrar os dados de um paciente específico
  - **PUT** `/patients/:id` — Atualizar os dados de um paciente
  - **DELETE** `/patients/:id` — Excluir um paciente

*Todos os endpoints podem ser consultados na collection do Postman, disponível no diretório `resources` do projeto.

3. Faça chamadas utilizando ferramentas como [Postman](https://www.postman.com/) ou [cURL](https://curl.se/).

## Estrutura do Projeto
- **Controller:** Os controladores, como `PatientsController`, contêm a lógica das rotas relacionadas a pacientes.
- **Model:** Os modelos representam as tabelas no banco de dados, como o modelo `Patient`.
- **Routes:** As rotas estão configuradas para apontar para os métodos correspondentes nos controladores.
