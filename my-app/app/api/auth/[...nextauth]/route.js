// app/api/auth/[...nextauth].js
import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Votre logique d'authentification
        const user = { id: 1, name: "User", email: "user@example.com" };
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  // Configuration additionnelle
  secret: process.env.NEXTAUTH_SECRET,
});
