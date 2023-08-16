## 🖥 Visualização:

### Web

<p align="center">
  <img alt="Web Preview" title="Web-preview" src="https://user-images.githubusercontent.com/42129177/200433948-b506417b-191b-415a-aa42-eba539397c52.png" width="800px">

### Mobile

<p align="center">
  <img alt="Web Preview" title="Web-preview" src="https://user-images.githubusercontent.com/42129177/200434971-92bbfc90-a1dd-4058-9b52-f2b3a0523061.png" width="300px">
  
</p>

---

## 📖 Sobre:

Uma aplicação desenvolvida em framework Nextjs, no qual é possível gerenciar gastos financeiros.

---

## ⚙️ Funcionalidades:

- [x] Incluir novos itens
- [x] Editar itens
- [x] Deletar itens

---

## 🚀 Tecnologias e Libs Utilizadas:

- HTML
- CSS
- typescript
- nextJS
- styled-components
- formik
- graphql
- graphql-request
- phosphor-react
- react-toastify
- uuid
- yup

---

## ⚙️ Configurando CMS

Conta:

- Acesse o Hygraph: `https://hygraph.com/`
- Crie sua conta gratuitamente

Base de dados:

- Clone o banco de dados, caso tenha acesso full no hygraph
  DEMO: `https://app.hygraph.com/clone/dccf4bbd5d5b4d118eda99f1ce0a0fbd?name=Expense%20Manager%20Public`

## obs:

Para quem não consegui clonar por URL, abaixo tem o print do modelo das entidades e como está configurado o meu projeto no hygraph.

- Diagrama de relacionemento utilizado no projeto
<p align="center">
  <img alt="Web Preview" title="Web-preview" src="https://user-images.githubusercontent.com/42129177/200633308-298ed832-c474-44e2-80a7-81e2e9837f22.png" width="800px">

- Public Content API
<p align="center">
  <img alt="Web Preview" title="Web-preview" src="https://user-images.githubusercontent.com/42129177/200635472-b7959ae7-f5a5-4ee4-a50b-1fa57d9c277b.png" width="800px">

- Permanent Auth Tokens

  - Crie sua Auth Token privada

- Permanent Auth Tokens
<p align="center">
  <img alt="Web Preview" title="Web-preview" src="https://user-images.githubusercontent.com/42129177/200636279-5b6e9a7d-f59f-48ae-9139-8a87bdf0c43d.png" width="800px">

Keys:

- Crie um arquivo .env igual ao .env.example e cole sua keys
  - HYGRAPH_PROJECT_API= Content API
  - HYGRAPH_PROJECT_TOKEN= Permanent Auth Tokens

---

## ⌨ Rodando o projeto localmente:

```bash

# Baixe o repositório na barra superior a direita

ou

# Clonar o repositório
git clone https://github.com/bertoldosi/expense-manager-ui

# Entre no diretório e acesse com seu Editor de texto preferido
cd expense-manager-ui

# Baixar as dependências
npm i

# Executar o servidor
npm run dev
```

Feito isso, abra o seu navegador e acesse `http://localhost:3000/`

---

Para acessar a aplicação hospedada clique em: https://expense-manager-ui-public.vercel.app/

---

Desenvolvido por Matheus Bertoldo !
