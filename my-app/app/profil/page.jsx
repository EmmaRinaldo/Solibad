//app/profil/page.jsx

"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Profil() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [activity, setActivity] = useState({ bids: 0, wins: 0, favorites: 0 });

  // Récupération des données utilisateur et de l'historique
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!session || !session.user.id) return;

        const userResponse = await fetch(`/api/users?id=${session.user.id}`);
        const historyResponse = await fetch(`/api/bids?userId=${session.user.id}`);
        
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        }

        if (historyResponse.ok) {
          const historyData = await historyResponse.json();
          setHistory(historyData);

          const bids = historyData.length;
          const wins = historyData.filter((bid) => bid.status === "win").length;
          const favorites = historyData.filter((bid) => bid.isFavorite).length;

          setActivity({ bids, wins, favorites });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchUserData();
    }
  }, [session, status]);

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="text-center py-8">Chargement...</p>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <p className="text-center py-8">Utilisateur non trouvé.</p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section
        className="py-32"
        style={{
          backgroundImage: "url('/assets/banner-gradient.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Barre latérale de profil */}
            <div className="lg:w-1/3 w-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-lg p-6 flex flex-col items-center py-8 space-y-4" style={{
                    borderWidth: "3px", // Épaisseur de la bordure
                    borderStyle: "solid", // Style de la bordure
                    borderImageRadius: "62px", // Coins arrondis
                    borderImageSource: `linear-gradient(90deg, rgba(229,65,41,1) 0%, rgba(234,111,17,1) 10%, rgba(255,231,24,1) 25%, rgba(136,187,21,1) 40%, rgba(53,159,43,1) 55%, rgba(19,161,174,1) 70%, rgba(16,139,200,1) 85%, rgba(13,56,137,1) 100%)`,
                    borderImageSlice: 1, // Utilisation correcte du dégradé
                  }}>
              <div className="text-center">
                <h5 className="text-2xl font-semibold text-gray-800">
                  {user.name || "Nom inconnu"}
                </h5>
                <span className="text-sm text-gray-500">{user.email}</span>
              </div>
            </div>

            {/* Informations utilisateur */}
            <div className="lg:w-2/3 w-full">
              <div className="shadow-lg rounded-lg p-6 backdrop-blur-md bg-white/10 border-t border-white/20" style={{
                    borderWidth: "3px", // Épaisseur de la bordure
                    borderStyle: "solid", // Style de la bordure
                    borderImageRadius: "62px", // Coins arrondis
                    borderImageSource: `linear-gradient(90deg, rgba(229,65,41,1) 0%, rgba(234,111,17,1) 10%, rgba(255,231,24,1) 25%, rgba(136,187,21,1) 40%, rgba(53,159,43,1) 55%, rgba(19,161,174,1) 70%, rgba(16,139,200,1) 85%, rgba(13,56,137,1) 100%)`,
                    borderImageSlice: 1, // Utilisation correcte du dégradé
                  }}>
                <h5 className="text-3xl text-black font-semibold mb-6">Mes Informations</h5>
                <div className="space-y-4">
                  <ProfileField label="Mot de passe" value="••••••••" />
                  <ProfileField label="Téléphone" value={user.phone || "Non renseigné"} />
                  <ProfileField label="Ville" value={user.city || "Non renseigné"} />
                  <ProfileField label="Pays" value={user.country || "Non renseigné"} />
                </div>
              </div>
            </div>

            {/* Activité utilisateur */}
            <div className="lg:w-2/3 w-full">
              <div className="backdrop-blur-md bg-white/10 border-t border-white/20 shadow-lg rounded-lg p-6 mb-6" style={{
                    borderWidth: "3px", // Épaisseur de la bordure
                    borderStyle: "solid", // Style de la bordure
                    borderImageRadius: "62px", // Coins arrondis
                    borderImageSource: `linear-gradient(90deg, rgba(229,65,41,1) 0%, rgba(234,111,17,1) 10%, rgba(255,231,24,1) 25%, rgba(136,187,21,1) 40%, rgba(53,159,43,1) 55%, rgba(19,161,174,1) 70%, rgba(16,139,200,1) 85%, rgba(13,56,137,1) 100%)`,
                    borderImageSlice: 1, // Utilisation correcte du dégradé
                  }}>
                <h5 className="text-3xl text-black font-semibold mb-6">Mon Activité</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ActivityCard title="Mises" value={activity.bids} />
                  <ActivityCard title="Gagnées" value={activity.wins} />
                  <ActivityCard title="Favoris" value={activity.favorites} />
                </div>
              </div>
            </div>
          </div>

          {/* Historique des enchères */}
          <div className="mt-6 backdrop-blur-md bg-white/10 border-t border-white/20 shadow-lg rounded-lg p-6" style={{
                    borderWidth: "3px", // Épaisseur de la bordure
                    borderStyle: "solid", // Style de la bordure
                    borderImageRadius: "62px", // Coins arrondis
                    borderImageSource: `linear-gradient(90deg, rgba(229,65,41,1) 0%, rgba(234,111,17,1) 10%, rgba(255,231,24,1) 25%, rgba(136,187,21,1) 40%, rgba(53,159,43,1) 55%, rgba(19,161,174,1) 70%, rgba(16,139,200,1) 85%, rgba(13,56,137,1) 100%)`,
                    borderImageSlice: 1, // Utilisation correcte du dégradé
                  }}>
            <h5 className="text-3xl text-black font-semibold mb-3">Mon Historique</h5>
            <table className="w-full table-auto rounded-lg">
              <thead>
                <tr className="bg-white/60 backdrop-blur-md">
                  <th className="py-2 px-4 text-left text-black">Produit</th>
                  <th className="py-2 px-4 text-left text-black">Prix Départ</th>
                  <th className="py-2 px-4 text-left text-black">Prix Final</th>
                  <th className="py-2 px-4 text-left text-black">Statut</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border">
                    <td className="py-2 px-4 text-black">
                      <Link
                        href={`/auctions/${item.auctionId}`}
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {item.productName || "Produit inconnu"}
                      </Link>
                    </td>
                    <td className="py-2 px-4 text-black">{item.startPrice} €</td>
                    <td className="py-2 px-4 text-black">{item.lastBid} €</td>
                    <td className="py-2 px-4 text-black">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="bg-white/60 backdrop-blur-md p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h5 className="text-lg font-semibold text-gray-700">{label}</h5>
        <p className="text-sm text-gray-500">{value}</p>
      </div>
      <button className="text-gray-400 hover:text-blue-600">
        <PencilIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

function ActivityCard({ title, value }) {
  return (
    <div className="bg-white/60 backdrop-blur-md p-4 rounded-lg shadow-md text-center">
      <h3 className="text-4xl font-semibold text-black">{value}</h3>
      <h5 className="text-lg text-gray-500 mt-2">{title}</h5>
    </div>
  );
}
