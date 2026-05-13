---
description: Padrões para criar e editar API routes Next.js neste projeto. Aplicar em src/pages/api/.
applyTo: 'src/pages/api/**/*.ts'
---

# Padrões de API Routes

## Estrutura Base

```typescript
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import * as Yup from "yup";
import prismaClient from "@lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  if (req.method === "POST") { /* ... */ }
  if (req.method === "GET")  { /* ... */ }
  if (req.method === "PUT")  { /* ... */ }
  if (req.method === "DELETE") { /* ... */ }

  return res.status(405).json({ message: "Method not allowed" });
}
```

## Validação com Yup

Sempre validar o corpo da requisição antes de persistir:

```typescript
const schema = Yup.object().shape({
  description: Yup.string().required(),
  amount: Yup.number().required().positive(),
});

try {
  await schema.validate(req.body);
} catch (err: any) {
  return res.status(400).json({ message: err.message });
}
```

## Convenções

- Rota: `/api/[recurso]/[ação].ts` (ex: `api/shopping/create.ts`, `api/institution/list.ts`)
- Autenticação obrigatória em todas as rotas (verificar sessão no início)
- Usar `prismaClient` de `@lib/prisma` — nunca instanciar novo PrismaClient
- Retornar `{ message: string }` em erros, objeto/array em sucesso
- Erros de banco: status 500 com mensagem genérica ao cliente
