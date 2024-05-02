import getConfig from "next/config";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";

const { publicRuntimeConfig = {} } = getConfig() || {};

const clientId = publicRuntimeConfig.CLIENT_ID;
const clientSecret = publicRuntimeConfig.GOOGLE_SECRET;
const nextAuthSecret = publicRuntimeConfig.NEXTAUTH_SECRET;

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  secret: nextAuthSecret as string,
  callbacks: {
    async signIn({ user }) {
      if (user.email) {
        return true;
      } else {
        return "/login";
      }
    },

    async session({ session }) {
      return session;
    },

    async redirect() {
      return "/";
    },
  },
};

export default NextAuth(authOptions);
