// app/login/page.jsx

"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn("user-credentials", {
        email,
        password,
        redirect: false, // Désactive la redirection automatique pour afficher les erreurs
      });

      if (result.error) {
        console.error("Erreur lors de la connexion :", result.error);
        setError("Invalid email or password");
      } else {
        console.log("Connexion réussie :", result);
        window.location.href = "/"; // Redirige après connexion
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setError("An error occurred during login");
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Connectez vous</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de Passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Se Connecter
          </button>
          <p>Vous n'avez pas de compte ? <Link href="/register">Inscrivez vous</Link></p>
        </form>
      </div>
    </div>
  );
}
