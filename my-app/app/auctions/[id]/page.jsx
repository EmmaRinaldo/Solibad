// app/auctions/[id]/page.jsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Récupère params comme promesse
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { CircleChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuctionDetail() {
  const { id } = useParams(); // Récupère "id" correctement
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await fetch(`/api/auctions?id=${id}`);
        const data = await response.json();

        if (data.error) {
          setAuction(null); // Gérer une réponse avec une erreur
        } else {
          setAuction(data); // Charger les données de l'enchère
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'enchère :", error);
        setAuction(null); // Gérer les erreurs réseau
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAuction();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="p-6">Chargement...</p>
        <Footer />
      </>
    );
  }

  if (!auction) {
    return (
      <>
        <Navbar />
        <p className="p-6">Enchère introuvable.</p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="navbar-padding-protection"></div>


      <section className="py-8 sm:py-12 bg-[#F2F0F1]">
        <div className="container mx-auto px-4">
          <div className="mb-5">
            <button onClick={() => router.back()} className="flex items-center hover:underline">
              <CircleChevronLeft className="" />
            </button>

          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Colonne gauche (Images du produit) */}
            <div className="w-full lg:w-7/12">
              <div className="relative">
                <div className="swiper swiper-initialized swiper-horizontal swiper-pointer-events">
                  <div className="swiper-wrapper">
                    {/* Image principale */}
                    <div className="swiper-slide">
                      {auction.images && auction.images.length > 0 ? (
                        <div className="relative w-55 h-48 thumb">
                          <Image
                            alt={auction.title}
                            className="w-full h-auto object-contain rounded-lg shadow-md"
                            width={450}
                            height={450}
                            src={auction.images[0]}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-48 rounded-lg shadow-md bg-gray-200 flex items-center justify-center thumb">
                          <p className="text-gray-500">Pas d'image disponible</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Boutons de navigation */}
                  <button className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md">
                    &#8249;
                  </button>
                  <button className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md">
                    &#8250;
                  </button>
                </div>
              </div>
            </div>

            {/* Colonne droite (Détails du produit et enchères) */}
            <div className="w-full lg:w-5/12">
              <div className="backdrop-blur-md bg-white/40 border-t border-white/20 rounded-lg shadow-lg p-6 sm:p-8 rounded-lg" style={{
                  borderWidth: "3px", // Épaisseur de la bordure
                  borderStyle: "solid", // Style de la bordure
                  borderImageRadius: "62px", // Coins arrondis
                  borderImageSource: `linear-gradient(90deg, rgba(229,65,41,1) 0%, rgba(234,111,17,1) 10%, rgba(255,231,24,1) 25%, rgba(136,187,21,1) 40%, rgba(53,159,43,1) 55%, rgba(19,161,174,1) 70%, rgba(16,139,200,1) 85%, rgba(13,56,137,1) 100%)`,
                  borderImageSlice: 1, // Utilisation correcte du dégradé
                }}>
                {/* Informations principales */}
                <div className="mb-6">
                  <h1 className="text-lg sm:text-xl font-bold mb-4">{auction.title}</h1>
                  <ul className="space-y-4">
                    <li className="flex justify-between">
                      <span>Prix actuel</span>
                      <span className="text-xl font-semibold text-blue-600">{auction.ActualBid} €</span>
                    </li>
                  </ul>
                </div>

                {/* Formulaire d'enchère */}
                <div className="mb-6">
                  <form action="#" className="space-y-4">
                    <input
                      type="text"
                      placeholder="Entrez votre montant d'enchère"
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-blue-600 transition"
                    >
                      Soumettre une enchère
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <h2 className="text-xl font-semibold mt-4">Surenchères</h2>
            <ul className="space-y-4">
              {bids
                .sort((a, b) => b.lastBid - a.lastBid)
                .map(bid => (
                  <li key={bid.id} className="border p-4 rounded shadow">
                    <p className="text-gray-700">Montant: {bid.lastBid}</p>
                    <p className="text-gray-700">Utilisateur: {users[bid.userId]?.name} {users[bid.userId]?.lastname}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
