import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: "/api/auth/signin", // redireciona para a página de login do NextAuth
      permanent: false,
    },
  };
};

export default function Login() {
  return null; // nunca será renderizado, pois redireciona
}
