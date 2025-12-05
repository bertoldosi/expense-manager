import getConfig from "next/config";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";

const { publicRuntimeConfig = {} } = getConfig() || {};

const clientId = publicRuntimeConfig.CLIENT_ID;
const clientSecret = publicRuntimeConfig.GOOGLE_SECRET;

const githubClientId = publicRuntimeConfig.GITHUB_CLIENT_ID;
const githubClientSecret = publicRuntimeConfig.GITHUB_CLIENT_SECRET;

const nextAuthSecret = publicRuntimeConfig.NEXTAUTH_SECRET;

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
    GitHubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Adiciona dados extras do usuário na sessão, se quiser
      session.user.id = user.id;
      return session;
    },

    async signIn({ user, account }) {
      if (!user.email) return false; // bloqueia se não tiver e-mail

      // Verifica se já existe um usuário com esse e-mail
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser) {
        // Se já existir, vincula a conta do provedor atual ao mesmo usuário
        await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: account!.provider,
              providerAccountId: account!.providerAccountId,
            },
          },
          update: {},
          create: {
            userId: existingUser.id,
            provider: account!.provider,
            providerAccountId: account!.providerAccountId,
            type: account!.type,
            access_token: account?.access_token,
            refresh_token: account?.refresh_token,
          },
        });
        return true;
      }

      // Usuário novo
      return true;
    },

    async redirect({ url, baseUrl }) {
      // Sempre redireciona para a home após login
      return "/";
    },
  },
  secret: nextAuthSecret,
};

export default NextAuth(authOptions);
