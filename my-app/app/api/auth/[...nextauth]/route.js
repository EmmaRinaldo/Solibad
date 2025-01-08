// api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Provider pour les utilisateurs
    CredentialsProvider({
      id: "user-credentials",
      name: "User Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Recherche l'utilisateur dans la table User
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Vérifie le mot de passe
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return user; // Retourne l'utilisateur si tout est valide
      },
    }),

    // Provider pour l'admin
    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Recherche l'admin dans la table Admin
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        if (!admin) {
          throw new Error("No admin found with this email");
        }

        // Vérifie le mot de passe
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          admin.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return admin; // Retourne l'admin si tout est valide
      },
    }),
  ],
  session: {
    strategy: "jwt", // Utilise des tokens JWT pour les sessions
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;

        // Définit le rôle en fonction du provider utilisé
        if (account?.provider === "admin-credentials") {
          token.role = "admin";
        } else {
          token.role = "user";
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role; // Ajoute le rôle à la session
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);