---
description: Convenções de código do projeto expense-manager. Aplicar sempre que criar ou editar componentes, hooks, helpers ou tipos.
applyTo: 'src/**/*.{ts,tsx}'
---

# Convenções do Projeto

## Componentes

- Cada componente tem sua própria pasta com `index.tsx` e `styles.ts` (styled-components)
- Containers de página em `src/components/container/`, componentes reutilizáveis em `src/components/common/`
- Ícones SVG customizados em `src/components/icons/`

## TypeScript

- Interfaces com sufixo `Interface` (ex: `ShoppingInterface`, `InstitutionInterface`)
- Types auxiliares com sufixo `Type` (ex: `InstitutionType`)
- Sempre usar path aliases em vez de caminhos relativos longos:
  - `@containers/` `@commons/` `@helpers/` `@hooks/` `@services/` `@context/` `@lib/` `@interfaces/`

## Estilo

- Usar **styled-components** — sem CSS modules, sem Tailwind
- Arquivo `styles.ts` junto ao componente, exportando componentes estilizados
- Tema global disponível via ThemeProvider (acessar com `${({ theme }) => theme.colors.xxx}`)

## Helpers

- Funções utilitárias em `src/helpers/`, nomeadas em camelCase descritivo
- Funções de cálculo/formatação monetária usam padrão brasileiro: `formatMorney` (atenção: typo intencional no projeto)

## State / Context

- Estado global via React Context em `src/context/`
- Custom hooks em `src/hooks/` para encapsular lógica de estado e chamadas de API

## Datas

- Usar **moment.js** para manipulação de datas (já é dependência do projeto)
