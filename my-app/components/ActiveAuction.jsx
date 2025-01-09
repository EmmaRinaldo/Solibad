"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ActiveAuction() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveAuctions = async () => {
      try {
        const response = await fetch("/api/auctions?type=active");
        const data = await response.json();
        setAuctions(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des enchères actives :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveAuctions();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Chargement des enchères actives...</p>;
  }

  if (auctions.length === 0) {
    return <p className="text-center text-gray-500">Aucune enchère active pour le moment.</p>;
  }

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Enchères Actives</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
    </section>
  );
}

function AuctionCard({ auction }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(auction.endDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(auction.endDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [auction.endDate]);

  if (timeLeft.total <= 0) {
    return (
      <div className="border rounded-lg shadow-md overflow-hidden bg-gray-100 p-4">
        <h3 className="text-xl font-semibold mb-2">{auction.title}</h3>
        <p className="text-red-500 font-bold">L'enchère est terminée.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      {auction.images && auction.images.length > 0 ? (
        <Image
          src={auction.images[0]}
          alt={auction.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Pas d'image disponible</p>
        </div>
      )}

      {/* Contenu */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{auction.title}</h3>
        <p className="text-gray-700 mb-2">
          <strong>Enchère actuelle :</strong> {auction.ActualBid}€
        </p>

        {/* Minuteur */}
        <p className="text-sm text-gray-500">
          <strong>Temps restant :</strong>{" "}
          {`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
        </p>

        {/* Bouton Enchérir */}
        <Link href={`/auctions/${auction.id}`}>
          <button className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">
            Enchérir
          </button>
        </Link>
      </div>
    </div>
  );
}

function getTimeLeft(endDate) {
  const total = new Date(endDate) - new Date();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}
