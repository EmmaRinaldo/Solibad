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
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return user;
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
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        if (!admin) {
          throw new Error("No admin found with this email");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          admin.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return admin;
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

        // Définir le rôle en fonction du provider utilisé
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
        session.user.role = token.role; // Inclut le rôle dans la session
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Assurez-vous que cette variable est bien définie dans votre fichier .env
};

export { authOptions };

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
