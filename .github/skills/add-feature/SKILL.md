---
name: add-feature
description: Guia para adicionar uma nova funcionalidade de gastos (Shopping, Institution, categoria) ao expense-manager. Use quando o usuário pedir para adicionar novo campo, entidade ou operação CRUD.
---

# Adicionar Nova Funcionalidade

## Fluxo Completo

Ao adicionar um novo campo ou entidade, seguir esta ordem:

### 1. Tipo/Interface (`src/types/`)

Criar ou atualizar a interface TypeScript:

```typescript
// src/types/shopping.interface.ts
export interface ShoppingInterface {
  id: string;
  description: string;
  amount: number;
  category: string;
  subcategory?: string;
  isPaid: boolean;
  // novo campo aqui
}
```

### 2. Schema Prisma (`prisma/schema.prisma`)

Adicionar o campo no model correspondente e rodar:

```bash
npx prisma generate
```

(MongoDB não exige migrations — o schema é gerado no cliente)

### 3. API Route (`src/pages/api/`)

Criar ou atualizar a rota seguindo o padrão em `api-patterns.instructions.md`:
- Validação Yup no corpo
- Autenticação via `getSession`
- Operação via `prismaClient`

### 4. Service (`src/services/`)

Encapsular a chamada HTTP com axios:

```typescript
// src/services/shopping.service.ts
export async function createShopping(data: ShoppingInterface) {
  return axios.post("/api/shopping/create", data);
}
```

### 5. Context / Hook (`src/context/` ou `src/hooks/`)

Expor a operação ao componente via context ou hook customizado.

### 6. Componente (`src/components/`)

- Container em `src/components/container/`
- UI reutilizável em `src/components/common/`
- Estilo em `styles.ts` junto ao componente (styled-components)

## Checklist

- [ ] Interface TypeScript atualizada em `src/types/`
- [ ] Schema Prisma atualizado + `npx prisma generate`
- [ ] API route com validação Yup e autenticação
- [ ] Service com chamada axios
- [ ] Context/hook atualizado
- [ ] Componente com styled-components
- [ ] Testar fluxo manualmente no browser (`npm run dev`)
