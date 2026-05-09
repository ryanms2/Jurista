# 📘 Guia de Desenvolvimento e Arquitetura - Projeto Jurista

Este documento foi criado para guiar desenvolvedores e Inteligências Artificiais que atuarão na manutenção e evolução do **Jurista** (Sistema de Gestão de Empréstimos e Cobranças). Leia-o com extrema atenção antes de propor mudanças estruturais ou realizar modificações no fluxo de dados.

---

## 🏗️ 1. Arquitetura do Projeto

O projeto utiliza a arquitetura de **Monorepo** gerenciada pelo `pnpm` (workspaces) e orquestrada pelo **Turborepo**. Ele é dividido em aplicativos (`apps/`) e pacotes compartilhados (`packages/`).

### 📦 Estrutura de Pastas
* **`apps/web/`**: Aplicação Web (Painel Administrativo para o usuário "Master") construída com **Next.js 15+**. Contém a interface web e as **Rotas de API** (`/api/...`) que recebem a sincronização do aplicativo mobile.
* **`apps/mobile/`**: Aplicativo Mobile construído com **React Native + Expo**. Focado no usuário "Cobrador". Funciona no formato **Offline-First**, possuindo um banco de dados local próprio e uma fila de sincronização.
* **`packages/database/`**: Módulo central de banco de dados do servidor. Contém os esquemas do **Prisma** e a conexão direta com o banco de dados principal (PostgreSQL).
* **`packages/shared/`**: Lógica isomórfica compartilhada (roda tanto na Web quanto no Mobile sem quebrar). Contém cálculos complexos (como o gerador de simulação de parcelas e juros do empréstimo), constantes padrão e tipagens.

---

## ⚙️ 2. Pontos Críticos e Sensíveis (O que tomar MUITO cuidado ao mexer)

### ⚠️ A. Configuração de Dependências (`.npmrc` na raiz)
A raiz do projeto possui um arquivo `.npmrc` com a instrução `node-linker=hoisted` e `shamefully-hoist=true`.
* **O QUE NÃO FAZER**: **JAMAIS** apague ou altere essas regras para o padrão do pnpm (symlinks). 
* **POR QUÊ**: O "Metro Bundler" do React Native e o sistema de compilação em nuvem do Expo (EAS Build) **não suportam** o sistema de symlinks (atalhos) padrão do `pnpm`. Retirar o *hoisting* vai imediatamente quebrar a compilação do APK do aplicativo mobile e o ambiente de desenvolvimento local.

### ⚠️ B. Sincronização de Dados (Offline-First)
O sistema Mobile funciona offline salvando tudo em um **SQLite** interno. Quando há internet, ele envia a fila (`sync_queue`) para a API do Next.js.
* **ONDE ESTÁ O CÓDIGO**: 
  * Mobile: `apps/mobile/src/services/sync.ts` (SQLite -> JSON Payload)
  * Web (Servidor): `apps/web/src/app/api/sync/push/route.ts` e `/api/sync/pull/route.ts` (Recebe JSON -> Prisma -> PostgreSQL)
* **O QUE TOMAR CUIDADO**: 
  1. Sempre que você adicionar uma nova tabela no Prisma (`packages/database/prisma/schema.prisma`), você **precisa obrigatoriamente** ir no Mobile (`apps/mobile/src/services/database.ts`) e recriar o equivalente manual da tabela no SQLite.
  2. **Geração de IDs**: O Mobile gera UUIDs aleatórios. Ao criar registros que possuem relacionamentos dependentes (ex: Empréstimos e Parcelas), certifique-se de que o algoritmo de geração de ID seja **determinístico** ou que os IDs locais sejam enviados no Payload de sincronização. Se a Web gerar um ID diferente do Mobile para o mesmo registro durante o Sync, haverá **duplicação de dados** quando o Mobile fizer o Pull.

### ⚠️ C. O Pacote `shared`
* **O QUE NÃO FAZER**: Nunca importe bibliotecas específicas do Node.js (como `fs`, `crypto` ou o próprio Prisma) e nunca importe Hooks do React (como `useState`, `useEffect`) dentro de `packages/shared`.
* **POR QUÊ**: Esse pacote é compilado e injetado tanto na Web (lado servidor) quanto no Mobile (lado cliente). Injetar código dependente de ambiente fará todo o projeto quebrar de forma silenciosa e difícil de debugar.

---

## ✅ 3. O Que Você PODE (e deve) Fazer

* **Adicionar novas telas no Mobile:** Basta criar o arquivo dentro da pasta de rotas do `expo-router` em `apps/mobile/app/`. Assegure-se de usar os componentes estilizados pré-existentes.
* **Adicionar rotas de API na Web:** Em `apps/web/src/app/api/`, lembre-se sempre de validar o Token e a autenticação do usuário, que é compartilhada entre as plataformas.
* **Rodar Comandos de Desenvolvimento:** Você pode utilizar o `turbo` na raiz (`pnpm dev:web` ou `pnpm dev:mobile`) para levantar os servidores localmente.
* **Instalar pacotes novos:** Pode instalar livremente, mas lembre-se: instale dependências de servidor no diretório `apps/web` ou `packages/database`, e dependências nativas mobile no diretório `apps/mobile`.

---

## ❌ 4. O Que Você NÃO PODE Fazer

* **Não rode `npm install` ou `yarn install` em nenhuma pasta.** O projeto é EXCLUSIVAMENTE construído sob o `pnpm`. Utilize sempre `pnpm install`.
* **Não utilize foreign keys (FKs) rígidas nos scripts de Pull do Mobile.** Quando os dados descem da Web para o SQLite (função `applyPullData`), a ordem em que as tabelas chegam pode causar erros de restrição (constraint). O SQLite desabilita temporariamente as chaves estrangeiras (`PRAGMA foreign_keys = OFF`) para poder importar o banco. Não altere esse comportamento.
* **Não apague os diretórios `node_modules` de apenas um Workspace isoladamente.** Caso precise limpar as dependências, apague de toda a raiz e de todos os apps/packages, e depois rode `pnpm install` novamente para garantir que os links elevados (*hoisted*) fiquem intactos.

---

## 🛠️ 5. Resumo do Fluxo Principal (Gestão de Cobranças)
1. **Master (Web)** cadastra Cobradores (Usuários com role específica) e acompanha Dashboards.
2. **Cobrador (Mobile)** faz login. O app baixa (Pull) toda a base de clientes, empréstimos e parcelas vinculadas a ele.
3. O Cobrador atua offline: cria Empréstimos (Loans), registra Pagamentos de Parcelas (Installments) e faz saídas/entradas no Caixa (CashMovements).
4. O Cobrador fica online, a função de Sincronização em Background agrupa todas as ações na `sync_queue` e faz um POST (Push) para a API da Web.
5. A API processa e insere tudo via Prisma. O status do aplicativo Mobile atualiza.

---
*Este guia foi consolidado baseando-se no histórico de resolução de conflitos de arquitetura do Expo, turborepo e SQLite Offline-First. Siga-o rigidamente para evitar a reincidência de bugs.*

---

## 🌿 6. Estratégia de Branches e Ambientes

O projeto utiliza um fluxo simplificado de **3 branches**, protegendo o ambiente de produção:

### Estrutura de Branches

| Branch | Ambiente | Banco | Deploy |
|--------|----------|-------|--------|
| `master` | Produção (intocável) | `jurista` (produção) | Servidor de produção |
| `dev` | Desenvolvimento ativo | `jurista-dev` (isolado) | Local / Staging |
| `feature/*` | Features isoladas | `jurista-dev` | Nenhum |

### Regras de Proteção (GitHub)

- **`master`**: Push direto **bloqueado**. Merge apenas via Pull Request com approval.
- **`dev`**: Push direto permitido (desenvolvimento ativo).
- **`feature/*`**: Criar a partir de `dev`, PR → `dev`.

### Fluxo de Trabalho Diário

```
git checkout dev
git pull origin dev
git checkout -b feature/minha-feature
# ... desenvolver, testar localmente contra banco dev ...
git push origin feature/minha-feature
# Abrir PR: feature/* → dev
# Após review + merge em dev → testar
# Abrir PR: dev → master (release para produção)
```

### Ambientes e Arquivos `.env`

| Ambiente | Arquivo | Banco |
|----------|---------|-------|
| Produção | `.env` (raiz, symlinked para `apps/web/.env` e `packages/database/.env`) | `jurista` |
| Desenvolvimento | `apps/web/.env.development` e `packages/database/.env.development` | `jurista-dev` |

- **Next.js** carrega automaticamente `apps/web/.env.development` em ambiente dev (NODE_ENV=development), sobrescrevendo o symlink `.env → ../../.env`.
- **Prisma** usa apenas `.env` por padrão. Para rodar comandos do Prisma contra o banco dev, é necessário sobrescrever o `DATABASE_URL`:

```bash
cd packages/database
DATABASE_URL="$(grep DATABASE_URL .env.development | cut -d'"' -f2)" npx prisma migrate dev
DATABASE_URL="$(grep DATABASE_URL .env.development | cut -d'"' -f2)" npx tsx prisma/seed.ts
```

### Criando um Novo Banco de Desenvolvimento

1. Criar o banco no servidor PostgreSQL (nome sugerido: `jurista-dev`)
2. Criar `apps/web/.env.development` e `packages/database/.env.development` com `DATABASE_URL` do banco dev
3. Rodar `prisma migrate dev` contra o banco dev
4. Rodar `prisma/seed.ts` para popular dados de teste
5. **IMPORTANTE**: Usar URL-encoding em senhas com caracteres especiais

### Sync Dev ← Production

```bash
# Após cada release para produção, sincronizar dev:
git checkout dev
git merge master
```
