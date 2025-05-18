# API Concifa - Backend

API REST para gerenciamento de projetos acadêmicos, desenvolvida com Node.js, TypeScript, Express e PostgreSQL.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma ORM
- JWT para autenticação
- Multer para upload de arquivos
- Docker

## 📋 Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- PostgreSQL (se rodar localmente)

## 🔧 Instalação

1. Clone o repositório
```bash
git clone [url-do-repositorio]
cd backend
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações.

4. Inicie o banco de dados com Docker
```bash
docker compose up -d
```

5. Execute as migrações do Prisma
```bash
npx prisma migrate dev
```

6. Inicie o servidor
```bash
npm run dev
```

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── controllers/    # Controladores da aplicação
│   ├── middlewares/    # Middlewares (auth, upload, etc)
│   ├── routes/         # Rotas da API
│   ├── services/       # Lógica de negócio
│   ├── types/          # Definições de tipos
│   └── utils/          # Funções utilitárias
├── prisma/             # Schema e migrações do banco
├── uploads/            # Diretório de uploads
└── tests/              # Testes automatizados
```

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. Todas as rotas (exceto login/registro) requerem o header:

```
Authorization: Bearer seu-token-jwt
```

## 📝 Endpoints da API

### Autenticação

#### POST /auth/login
Login de usuário.
```json
{
  "email": "usuario@email.com",
  "senha": "senha123"
}
```

#### POST /auth/registro
Registro de novo usuário.
```json
{
  "nome": "Nome do Usuário",
  "email": "usuario@email.com",
  "senha": "senha123",
  "tipo": "ALUNO" // ou "COORDENADOR"
}
```

### Rotas do Aluno

#### POST /aluno/projetos
Criar novo projeto.
- Content-Type: multipart/form-data
- Campos:
  - `pdf`: arquivo PDF (obrigatório, max 5MB)
  - `titulo`: string (obrigatório)
  - `descricao`: string (obrigatório)

#### GET /aluno/projetos
Listar projetos do aluno.
- Query params:
  - `page`: número da página (default: 1)
  - `limit`: itens por página (default: 10)

#### GET /aluno/projetos/:id
Buscar projeto específico.

#### DELETE /aluno/projetos/:id
Excluir projeto.

### Rotas do Coordenador

#### GET /coordenador/projetos
Listar todos os projetos.
- Query params:
  - `page`: número da página
  - `limit`: itens por página
  - `status`: filtrar por status (PENDENTE, APROVADO, REJEITADO)

#### GET /coordenador/projetos/:id
Buscar projeto específico.

#### PATCH /coordenador/projetos/:id/status
Atualizar status do projeto.
```json
{
  "status": "APROVADO" // ou "REJEITADO"
}
```

### Rotas Compartilhadas

#### GET /arquivos/:id/download
Download do arquivo PDF do projeto.

## 📦 Upload de Arquivos

- Apenas arquivos PDF são aceitos
- Tamanho máximo: 5MB
- Estrutura de diretórios:
  ```
  uploads/
  └── usuarios/
      └── {userId}/
          └── {timestamp}_{uuid}_{nome-original}.pdf
  ```

## 🔍 Códigos de Status

- 200: Sucesso
- 201: Criado
- 204: Sem conteúdo
- 400: Requisição inválida
- 401: Não autenticado
- 403: Acesso negado
- 404: Não encontrado
- 500: Erro interno

## 🧪 Testes

```bash
# Executar testes
npm test

# Executar testes com coverage
npm run test:coverage
```

## 📚 Documentação Adicional

- [Coleção Postman](docs/Concifa_API.postman_collection.json)
- [Documentação Swagger](docs/swagger.json)

## 🔄 Fluxo de Trabalho

1. Aluno faz upload do projeto (status: PENDENTE)
2. Coordenador avalia o projeto
3. Coordenador atualiza status (APROVADO/REJEITADO)
4. Aluno pode visualizar status e baixar arquivo

## ⚠️ Limitações e Melhorias Futuras

- [ ] Implementar sistema de notificações
- [ ] Adicionar suporte a múltiplos arquivos
- [ ] Implementar versionamento de projetos
- [ ] Adicionar sistema de comentários
- [ ] Implementar cache com Redis
- [ ] Adicionar rate limiting
- [ ] Implementar logs estruturados
- [ ] Adicionar testes de integração
- [ ] Implementar CI/CD
- [ ] Adicionar documentação com Swagger/OpenAPI 