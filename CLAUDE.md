# Expense Manager — CLAUDE.md

## Visão Geral

Aplicação de gerenciamento de despesas financeiras pessoais. Permite organizar gastos por instituição (cartão, conta), categoria e subcategoria, acompanhar status de pagamento e visualizar relatórios.

## Stack

- **Framework**: Next.js 12 + React 18 + TypeScript 4
- **Estilo**: styled-components (CSS-in-JS)
- **Formulários**: Formik + Yup
- **ORM**: Prisma + MongoDB
- **Auth**: NextAuth v4 (Google e GitHub OAuth)
- **Charts**: Recharts
- **Drag & Drop**: react-beautiful-dnd
- **PDF**: html2canvas + jspdf

## Comandos

```bash
npm run dev    # servidor de desenvolvimento (localhost:3000)
npm run build  # prisma generate + next build
npm run lint   # ESLint
```

## Estrutura de Diretórios

```
src/
  pages/           # Rotas Next.js + API routes (api/)
  components/
    common/        # Componentes reutilizáveis (Button, Input, Modal...)
    container/     # Containers de página (HomeContainer, EditContainer...)
    icons/         # Ícones SVG customizados
  context/         # React Context (estado global)
  helpers/         # Funções utilitárias (cálculos, formatação)
  hooks/           # Custom hooks
  services/        # Lógica de negócio / chamadas de API
  types/           # Interfaces TypeScript
  styles/          # Estilos globais e tema
  mocks/           # Dados mock
prisma/            # Schema Prisma (MongoDB)
```

## Path Aliases (tsconfig)

| Alias | Caminho |
|---|---|
| `@containers/*` | `src/components/container/*` |
| `@commons/*` | `src/components/common/*` |
| `@helpers/*` | `src/helpers/*` |
| `@hooks/*` | `src/hooks/*` |
| `@services/*` | `src/services/*` |
| `@context/*` | `src/context/*` |
| `@lib/*` | `src/lib/*` |
| `@interfaces/*` | `src/types/*` |

## Convenções de Código

- Componentes em PascalCase com pasta própria + `index.tsx`
- Interfaces TypeScript com sufixo `Interface` ou `Type` (ex: `ShoppingInterface`)
- Helpers em camelCase descritivo (ex: `expenseCalculate`, `formatMorney`)
- API routes: `/api/[recurso]/[ação].ts` com roteamento por método HTTP
- Validação de request body com schema Yup nas API routes
- Sem framework de testes — testes manuais

## Modelo de Dados Principal

- **User**: autenticação (email, OAuth)
- **Expense**: agrupa gastos do usuário por mês/ano
- **Institution**: forma de pagamento (cartão, conta)
- **Shopping**: item de gasto individual (descrição, valor, categoria, subcategoria, status)

## Variáveis de Ambiente Necessárias

```
DATABASE_URL         # MongoDB connection string
NEXTAUTH_SECRET      # chave de criptografia auth
CLIENT_ID            # Google OAuth client ID
GOOGLE_SECRET        # Google OAuth secret
GITHUB_CLIENT_ID     # GitHub OAuth client ID
GITHUB_CLIENT_SECRET # GitHub OAuth secret
BASE_URL             # URL da aplicação (padrão: localhost:3000)
```
