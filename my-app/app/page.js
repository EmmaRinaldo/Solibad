import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button href="/login" className="button">
        Se connecter
      </button>
      <button href="/register" className="button">
        S'inscrire
      </button>
    </div>
  );
}
