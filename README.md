# Sejam bem vindos ao repositório backend do projeto mks-backend!

Este projeto foi completamente desenvolvido em TypeScript, utilizando Nest.js, TypeOrm,
Postgres e outras bibliotecas auxiliares como, jsonwebtoken,
bcryptjs, entre algumas outras. 🚀

Foi desenvolvido seguindo os pilares da programação orientada a
objeto (POO), e seguindo alguns padrões de projeto e arquitetura, como separação
dos casos de uso em use-cases (apesar de não ter separdo em intenções menores, por exemplo na rota de atualização, atualizar cada campo separadamente para cada intenção de um caso de uso).

Sou desenvolvedor com pouco mais de 2 anos de estudos e 6 meses de experiência de mercado como dev back-end. Referente as tecnologias utilizadas nesse projeto, possuo mais de 1 ano praticando projetos em nestjs, nodejs, expressjs, postgres, typeORM, inclusive são tecnologias que utilizei bastante no meu último trabalho como dev.

Infelizmente ficou pendente o deploy e criar alguns testes para aprensentar, devido ao tempo, fui ver a mensagem do desafio no dia 10/05, ontem.... acabei ficando com o tempo curto, mas criar tests é algo que sempre pratiquei, inclusive gosto bastante de testar minhas aplicações backend e seguir boas práticas de desenvolvimento.

# Orientações

## Antes de começar a desenvolver

👀 Leia essa parte atentamente, pois aqui você encontrará informações
importantes para rodar corretamente o projeto.

<details>
<summary><strong> 🔰 Instruções </strong></summary><br />

1. Clone o repositório

- `git clone https://github.com/Gabrielja2/fiter-back-end.git`

2. Entre na pasta do repositório que você acabou de clonar:

- `cd pasta-do-repositório`

3. Instale as dependências

- `npm install`

4. Configure as variáveis de ambiente, é <strong>Obrigatório</strong> para
   funcionar corretamente:

- Confira o arquivo .env na raiz do projeto e preencha com as variáveis de
  ambiente caso seja necessário, mas ja vou deixar elas preenchidas nesse
  exemplo, lembre que é obrigatório algumas dessas váriaveis para conseguir
  rodar o servidor como PORT, eu utilizei a PORT=`3000` mas pode ser qualquer
  uma que não esteja sendo usada na sua máquina, vou deixa um arquivo env.ts preenchido para utilizar o no .env

6. Dentro do diretório MKS-BACKEND, abra um terminal, suba o
   docker-compose e depois no mesmo terminal rode o projeto:

- `docker-compose up`

- `npm run start:dev`

</details><br />

# Rotas

## Swagger

Rota com todas as informações dos endpoints, requests e responses.

<details>
<summary><strong>Rota do Swagger</strong></summary>

- Método: POST
- URL: http://localhost:3000/api
- Descrição: Informações com todos os endpoints da API.

  </details><br />

## Autenticação

São as rotas para logar ou registrar um novo usuário

<details>
<summary><strong>Rota de Login</strong></summary>

- Método: POST
- URL: http://localhost:3000/auth
- Descrição: Realiza o login de um usuário cadastrado.
- Parâmetros de entrada:
  - email: String (obrigatório) - E-mail do usuário.
  - password: String (obrigatório) - Senha do usuário.
- Resposta de sucesso:
  - Código: 200
  - Corpo: Objeto contendo o token.
  </details><br />

<details>
<summary><strong>Rota de Registro</strong></summary>

- Método: POST
- URL: http://localhost:3000/users
- Descrição: Registra um novo usuário.
- Parâmetros de entrada:
  - name: String (obrigatório) - Nome do usuário.
  - email: String (obrigatório) - E-mail do usuário.
  - password: String (obrigatório) - Senha do usuário.
- Resposta de sucesso:
  - Código: 201
  - Corpo: Entidade do usuário criado.
  </details><br /><br />

# ⚠️ Rotas Protegidas por Autenticação (/movies)

<details>
<summary><strong>Rota de Registro de um filme</strong></summary>

- Método: POST
- URL: http://localhost:3000/movies
- Descrição: Registra um novo filme.
- Exemplo dos parâmetros de entrada: {
  "name": "nome",
  "description: "descrição",
  "category": "categoria",
  }
- Resposta de sucesso:
  - Código: 201
  - Corpo: entidade de Movie criada.
  </details><br />

<details>
<summary><strong>Rota de busca de um filme</strong></summary>

- Método: GET
- URL: http://localhost:3000/movies/:id
- Descrição: Listaum filme.
- Resposta de sucesso:
  - Código: 200
  - Corpo: entidade de um filme encontrado pelo id.
  </details><br />

<details>
<summary><strong>Rota de busca de varios filmes</strong></summary>

- Método: GET
- URL: http://localhost:3000/movies
- Descrição: Lista as configurações do sorteio.
- Resposta de sucesso:

  - Código: 200
  - Corpo: Um array com as entidades dos filmes encontrados.
  </details><br />

<details>
<summary><strong>Rota de atualização de um filme</strong></summary>

- Método: PATCH
- URL: http://localhost:3000/movies/:id
- Descrição: Atualiza um filme.
- Resposta de sucesso:

  - Código: 200
  - Corpo: Mensagem de atualização bem sucedida.
  </details><br />

<details>
<summary><strong>Rota de esclusão de um filme</strong></summary>

- Método: DELETE
- URL: http://localhost:3000/movies/:id
- Descrição: Deleta um filme.
- Resposta de sucesso:

  - Código: 200
  - Corpo: Mensagem de exclusão bem sucedida.
  </details><br />
