# 💊 Farmácia API — Projeto Final Bloco 02 (NestJS)

![NestJS](https://img.shields.io/badge/NestJS-11.0-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-0.3-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Passport JWT](https://img.shields.io/badge/Passport-JWT-34E0A1?style=for-the-badge&logo=jsonwebtokens&logoColor=black)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI_3-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge)
![Licença](https://img.shields.io/badge/Licença-MIT-yellow?style=for-the-badge)

---

## 🔗 Acesso e Documentação Interativa

* **Ambiente Local:** `http://localhost:3000`
* **Documentação Swagger UI:** `http://localhost:3000/swagger` (ou diretamente na raiz `http://localhost:3000/`, com redirecionamento automático configurado via `@Redirect`)
* **Banco de Dados em Produção:** PostgreSQL em nuvem via string de conexão SSL (`DATABASE_URL`)

---

## 📖 Visão Geral

A **Farmácia API** é a aplicação de back-end desenvolvida como projeto avaliativo integrador de encerramento do **Bloco 02** do bootcamp **Generation Brasil (Turma JS13)**.

Construída sobre o framework corporativo **NestJS 11**, **TypeScript** e **TypeORM**, a API provê uma solução completa para gerenciamento e e-commerce do setor farmacêutico. O sistema contempla autenticação stateless via **JWT (JSON Web Tokens)**, controle granular de usuários e perfis, categorização de medicamentos/cosméticos e catálogo de produtos com regras estritas de vencimento de lote, conversão numérica precisa de valores monetários e documentação interativa automatizada com **Swagger OpenAPI**.

---

## ✨ Funcionalidades

* 🔐 **Autenticação & Controle de Acesso (`/usuarios/logar`):**
  * Login com validação criptográfica de credenciais (`bcrypt`).
  * Emissão de token JWT assinado com expiração de 1 hora.
  * Estratégias do Passport (`LocalStrategy` e `JwtStrategy`) com guarda global `JwtAuthGuard`.
* 👤 **Gestão de Usuários (`/usuarios`):**
  * Cadastro de novos operadores e clientes com validação de e-mail e restrição contra duplicidade.
  * Senhas protegidas com hashing e salt rounds via `Bcrypt`.
  * Consulta e atualização cadastral protegidas por token Bearer.
* 🏷️ **Gestão de Categorias Farmacêuticas (`/categorias`):**
  * CRUD completo para segmentação (ex: *Medicamentos*, *Dermocosméticos*, *Higiene*, *Primeiros Socorros*).
  * Exclusão com integridade referencial e propagação em cascata (`onDelete: 'CASCADE'`).
* 💊 **Gestão de Produtos e Medicamentos (`/produtos`):**
  * Cadastro vinculado obrigatoriamente a uma categoria existente.
  * Validação rigorosa de validade: rejeita produtos cuja data de vencimento não tenha pelo menos 2 dias de margem em relação ao dia atual.
  * Controle de quantidade em estoque impedindo valores negativos (`@Min(0)`).
  * Suporte a imagens de produto validadas por formato de URL (`@IsUrl()`).
* 📚 **Documentação Interativa com Swagger:** Documentação interativa ao vivo em `/swagger` com decorators `@ApiProperty`, `@ApiBearerAuth` e agrupamento por tags.

---

## 🎯 Diferenciais e Destaques Técnicos

1. **Validação de Data Dinâmica (`validade`):** Regra de negócio na entidade `Produto` calculando em tempo de execução que a data de vencimento precisa ter no mínimo 2 dias futuros a partir da data da requisição:
   ```typescript
   @MinDate(() => {
     const data = new Date();
     data.setDate(data.getDate() + 2);
     return data;
   }, { message: 'A vencimento precisar ter no minimo 2 dias do dia atual' })
   ```
2. **NumericTransformer para Segurança Financeira:** Conversor bidirecional desacoplado que resolve a serialização de colunas SQL `decimal` para tipos nativos `number` do TypeScript, evitando discrepâncias de cálculo.
3. **Conexão PostgreSQL com SSL:** Configuração nativa no `TypeOrmModule` pronta para bancos relacionais gerenciados na nuvem (Neon, Supabase ou AWS RDS) com `ssl: true` e flags `rejectUnauthorized: false`.
4. **Histórico e Organização em Branches:** Projeto estruturado em marcos evolutivos com branches sequenciais documentando cada fase de implementação (`01_Configurando_Projeto`, `02_CRUD_Categoria`, `03_CRUD_Produto_Relacionamento`, `04_Extras`).

---

## 🏗️ Arquitetura e Estrutura de Pastas

```text
src/
├── app.controller.ts            # Redirecionamento da raiz (/) para /swagger
├── app.module.ts                # Módulo raiz com TypeORM / PostgreSQL
├── main.ts                      # Bootstrap com Swagger, Timezone e ValidationPipe
├── auth/                        # Módulo de Autenticação e Segurança
│   ├── auth.module.ts
│   ├── bcrypt/                  # Hashing e checagem de senhas
│   ├── constants/               # Configuração e segredos JWT
│   ├── controllers/             # AuthController (/usuarios/logar)
│   ├── entities/                # DTOs de login (UsuarioLogin)
│   ├── guard/                   # LocalAuthGuard e JwtAuthGuard
│   ├── services/                # AuthService
│   └── strategy/                # LocalStrategy e JwtStrategy
├── categoria/                   # Módulo de Categorias
│   ├── categoria.module.ts
│   ├── controller/              # CategoriaController (/categorias)
│   ├── entities/                # Entidade tb_categorias
│   └── service/                 # CategoriaService
├── produto/                     # Módulo de Produtos
│   ├── produto.module.ts
│   ├── controller/              # ProdutoController (/produtos)
│   ├── entities/                # Entidade tb_produtos
│   └── service/                 # ProdutoService
├── usuario/                     # Módulo de Usuários
│   ├── usuario.module.ts
│   ├── controller/              # UsuarioController (/usuarios)
│   ├── entities/                # Entidade tb_usuarios
│   └── service/                 # UsuarioService
└── util/
    └── NumericTransformer.ts    # Transformador de tipos decimais SQL <-> JS
```

---

## 🎲 Modelagem do Banco de Dados (DER)

```mermaid
erDiagram
    TB_CATEGORIAS ||--o{ TB_PRODUTOS : "categoriza"

    TB_CATEGORIAS {
        int id PK
        varchar nome
    }

    TB_PRODUTOS {
        int id PK
        varchar nome
        decimal preco
        date validade
        int quantidade
        varchar imgUrl
        int categoria_id FK
    }

    TB_USUARIOS {
        int id PK
        varchar nome
        varchar usuario UK
        varchar senha
    }
```

---

## 📋 Tabela de Endpoints

### 1. Autenticação & Usuários (`/usuarios`)

| Método | Rota | Autenticação | Descrição |
| :--- | :--- | :--- | :--- |
| `POST` | `/usuarios/logar` | Pública | Autentica e emite o token Bearer JWT |
| `POST` | `/usuarios/cadastrar` | Pública | Cadastra um novo operador com senha criptografada |
| `GET` | `/usuarios/all` | Bearer JWT | Lista todos os usuários cadastrados |
| `GET` | `/usuarios/:id` | Bearer JWT | Consulta usuário por ID |
| `PUT` | `/usuarios/atualizar` | Bearer JWT | Atualiza os dados de um usuário |

### 2. Categorias (`/categorias`)

| Método | Rota | Autenticação | Descrição |
| :--- | :--- | :--- | :--- |
| `GET` | `/categorias` | Bearer JWT | Lista todas as categorias com produtos relacionados |
| `GET` | `/categorias/:id` | Bearer JWT | Consulta categoria por ID |
| `POST` | `/categorias` | Bearer JWT | Cadastra uma nova categoria |
| `PUT` | `/categorias` | Bearer JWT | Atualiza uma categoria |
| `DELETE` | `/categorias/:id` | Bearer JWT | Exclui categoria e propaga exclusão em cascata |

### 3. Produtos (`/produtos`)

| Método | Rota | Autenticação | Descrição |
| :--- | :--- | :--- | :--- |
| `GET` | `/produtos` | Bearer JWT | Lista todos os produtos cadastrados |
| `GET` | `/produtos/:id` | Bearer JWT | Consulta produto por ID |
| `POST` | `/produtos` | Bearer JWT | Cadastra produto validando categoria e vencimento |
| `PUT` | `/produtos` | Bearer JWT | Atualiza informações do produto |
| `DELETE` | `/produtos/:id` | Bearer JWT | Remove o produto do catálogo |

---

## ⚙️ Requisitos e Instalação

### Pré-requisitos
* **Node.js:** Versão 18 ou superior.
* **Banco de Dados PostgreSQL:** Instância ativa local ou na nuvem (porta `5432`).
* **Gerenciador de Pacotes:** `npm`.

### 1. Clonar o Repositório
```bash
git clone https://github.com/erickystn/projeto_final_bloco_02.git
cd projeto_final_bloco_02
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
PORT=3000
DATABASE_URL=postgresql://usuario:senha@localhost:5432/db_farmacia
```

---

## 🚀 Como Executar

```bash
# Executar em modo de desenvolvimento (watch mode):
npm run start:dev

# Compilar para produção:
npm run build

# Executar a compilação:
npm run start:prod
```

Acesse a documentação Swagger em `http://localhost:3000/swagger`.

---

## 💻 Exemplos de Requisições

### 1. Autenticar Usuário (`POST /usuarios/logar`)
```bash
curl -X POST http://localhost:3000/usuarios/logar \
  -H "Content-Type: application/json" \
  -d '{
    "usuario": "farmaceutico@email.com",
    "senha": "senhaSegura123"
  }'
```

---

### 2. Cadastrar Produto com Validação de Validade (`POST /produtos`)
```bash
curl -X POST http://localhost:3000/produtos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN_JWT>" \
  -d '{
    "nome": "Dipirona Monoidratada 500mg",
    "preco": 12.50,
    "validade": "2027-12-31",
    "quantidade": 100,
    "imgUrl": "https://exemplo.com/dipirona.jpg",
    "categoria": {
      "id": 1
    }
  }'
```

---

## 🌿 Estrutura de Branches do Repositório

O repositório documenta a evolução da entrega através de branches dedicadas:
* `01_Configurando_Projeto`: Setup inicial com NestJS, TypeORM e PostgreSQL.
* `02_CRUD_Categoria`: Criação do módulo de categorias, entidade e endpoints REST.
* `03_CRUD_Produto_Relacionamento`: Implementação do catálogo de produtos e relação 1:N com categorias.
* `04_Extras`: Módulo de autenticação com JWT/Bcrypt e documentação OpenAPI com Swagger.
* `main`: Versão consolidada integrando todas as fases do projeto.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
| :--- | :--- | :--- |
| **NestJS** | 11.0 | Framework corporativo para Node.js |
| **TypeScript** | 5.7 | Superset com tipagem estática e decorators |
| **TypeORM** | 0.3 | ORM para mapeamento relacional |
| **PostgreSQL (pg)** | 8.20 | Driver relacional de comunicação com o Postgres |
| **Passport & JWT** | 0.7 / 11.0 | Mecanismo de autenticação stateless |
| **Bcrypt** | 6.0 | Criptografia irreversível de senhas |
| **Swagger UI** | 11.2 | Documentação e testes visuais de endpoints REST |
| **Class Validator**| 0.14 | Validação declarativa de entrada de dados |

---

## 👤 Autor & 📄 Licença

Desenvolvido por **[Ericky Sant'ana](https://github.com/erickystn)** como Projeto Integrador do Bloco 02 da **Generation Brasil**.

Distribuído sob a licença **MIT**.
