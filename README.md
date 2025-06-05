Aplicação construída inteiramente em Next.js com banco de dados PostgreSQL e containerizada usando Docker.

## Iniciar o Projeto

### Requisitos

- Docker
- Docker Compose

### 1. Criar .env

Renomear o arquivo .env.example e alterar os valores.

*Obs: Caso alterar o DATABASE_URL, altere as variáveis de ambiente do Postgres no docker-compose.yml*

### 2. Suba os containers

Na raiz do projeto, execute

```bash
docker-compose up -d
```

### 3. Acesse o projeto

Estará disponível em `http://localhost:3000`

### 4. Criar usuário de administração

Basta acessar a rota `/api/admin` e o usuário padrão será criado.

## Guia da Aplicação

### Rotas Principais

- `/` Tela de apresentação
- `/simulation` Formulário para coletar dados de consumo do Lead
- `/simulation/lead` Formulário para coletar dados pessoais do Lead
- `/simulation/result` Exibição da economia de energia em 1, 3 e 5 anos.
- `/api/admin` Cria um usuário de administração usando email e senha do .env

### Estrutura principal do projeto

```bash
├── docker-compose.yml
├── Dockerfile                # Define como a imagem do projeto deve ser construída
├── prisma/                   # Contém as migrações e o schema do Prisma
├── src/
│   ├── app/                  # Páginas e APIs da aplicação
│   │   ├── api/              # Rotas da API, lógica de negócios e consultas ao banco
│   │   ├── admin/            # Páginas e componentes do painel administrativo
│   │   └── simulation/       # Funcionalidades relacionadas a simulações
│   ├── components/           # Componentes reutilizáveis da interface
│   ├── context/              # Contextos para compartilhamento de estado entre componentes
│   ├── interfaces/           # Definições de interfaces e tipos das entidades
│   ├── lib/                  # Utilitários e configurações do Prisma
│   ├── middleware.ts         # Middlewares globais da aplicação
│   └── validation/           # Esquemas de validação com Zod para as entidades

```
