//app/auctions/[id]/page.jsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { differenceInSeconds, formatDuration, intervalToDuration } from "date-fns";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { CircleChevronLeft } from "lucide-react";

export default function AuctionDetail() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [timeRemaining, setTimeRemaining] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  // Récupérer les détails de l'enchère
  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const response = await fetch(`/api/auctions?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setAuction(data);
          calculateTimeRemaining(data.endDate);
        } else {
          setAuction(null);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'enchère :", error);
        setAuction(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionDetails();
  }, [id]);

  // Calculer le temps restant
  const calculateTimeRemaining = (endDate) => {
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(endDate);
      const diffInSeconds = differenceInSeconds(end, now);

      if (diffInSeconds <= 0) {
        clearInterval(interval);
        setTimeRemaining("L'enchère est terminée.");
      } else {
        const duration = intervalToDuration({ start: now, end });
        setTimeRemaining(formatDuration(duration, { format: ["days", "hours", "minutes", "seconds"] }));
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  // Soumission d'une enchère
  const handleBidSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      alert("Veuillez vous connecter pour enchérir.");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("/api/bids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          auctionId: id,
          bidAmount: parseFloat(bidAmount),
        }),
      });

      if (response.ok) {
        const updatedAuction = await response.json();
        setAuction(updatedAuction.updatedAuction);
        alert("Votre enchère a été placée !");
        setBidAmount("");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Erreur lors de la soumission de l'enchère.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de l'enchère :", error);
    }
  };

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
      <section className="py-8 sm:py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <button onClick={() => router.back()} className="flex items-center mb-4 text-blue-500">
            <CircleChevronLeft className="mr-2" />
            Retour
          </button>

          <div className="mb-6">
            <p className="text-lg font-semibold text-red-500">{timeRemaining}</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image principale */}
            <div className="w-full lg:w-1/2">
              {auction.images?.length > 0 ? (
                <img src={auction.images[0]} alt={auction.title} className="rounded-lg shadow-md" />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                  <p className="text-gray-500">Pas d'image disponible</p>
                </div>
              )}
            </div>

            {/* Détails de l'enchère */}
            <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">{auction.title}</h1>
              <p className="text-gray-600 mt-2">{auction.description}</p>
              <p className="text-blue-600 text-lg font-semibold mt-4">Prix actuel : {auction.ActualBid} €</p>

              {/* Formulaire ou bouton "Se connecter" */}
              {status === "authenticated" ? (
                <form onSubmit={handleBidSubmit} className="mt-4 space-y-4">
                  <input
                    type="number"
                    placeholder="Entrez votre enchère"
                    defaultValue={auction.ActualBid + auction.minIncr}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full p-3 border rounded-md"
                    required
                  />
                  <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                    Soumettre une enchère
                  </button>
                </form>
              ) : (
                <button onClick={() => router.push("/login")} className="w-full bg-gray-500 text-white py-2 rounded-md mt-4">
                  Se connecter pour enchérir
                </button>
              )}

            </div>
          </div>

          {/* Liste des surenchères */}
          <h2 className="text-xl font-bold mt-8">Surenchères</h2>
          <ul className="mt-4 space-y-4">
            {auction.bids?.map((bid) => (
              <li key={bid.id} className="bg-white p-4 rounded-lg shadow-md border">
                <p>Montant : {bid.lastBid} €</p>
                <p>Utilisateur : {bid.user?.name || "Anonyme"}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}