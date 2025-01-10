//components/SectionAllAuctions.jsx

import React, { useEffect, useState } from 'react';
import CardAuctionVariant from './CardAuctionVariant';
import Link from 'next/link';

const SectionAllAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllAuctions = async () => {
      try {
        const response = await fetch('/api/auctions');
        const data = await response.json();
        setAuctions(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des enchères:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAuctions();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Chargement des enchères...</p>;
  }

  if (auctions.length === 0) {
    return <p className="text-center text-gray-500">Aucune enchère disponible pour le moment.</p>;
  }

  return (
    <section className="max-w-frame mx-auto flex flex-col items-center text-center">
      {/* Titre */}
      <h2 className="text-[32px] md:text-5xl mb-8 md:mb-14 capitalize text-3xl font-bold tracking-tight sm:text-4xl text-black">
        Toutes les enchères
      </h2>

      {/* Conteneur défilable horizontalement */}
      <div
        className="relative w-full max-w-screen-md mb-6 md:mb-9 overflow-x-scroll scrollbar-hide"
        role="region"
        aria-roledescription="carousel"
      >
        <div className="flex items-center justify-center gap-4 px-4 sm:px-6 xl:px-0">
          {auctions.map((auction) => (
            <div key={auction.id} className="flex-shrink-0 w-64">
              <CardAuctionVariant auction={auction} />
            </div>
          ))}
        </div>
      </div>

      {/* Bouton "Voir plus" */}
      <div className="mt-6">
        <Link href="/auctions">
          <button className="inline-flex items-center justify-center rounded-md border border-[#020817]/80 px-8 py-3 text-sm font-medium text-[#020817] shadow-md hover:bg-black hover:text-white transition" style={{
      borderWidth: "3px", // Épaisseur de la bordure
      borderStyle: "solid", // Style de la bordure
      borderRadius: "12px", // Coins arrondis
      borderImageSource: `linear-gradient(90deg, rgba(229,65,41,1) 0%, rgba(234,111,17,1) 10%, rgba(255,231,24,1) 25%, rgba(136,187,21,1) 40%, rgba(53,159,43,1) 55%, rgba(19,161,174,1) 70%, rgba(16,139,200,1) 85%, rgba(13,56,137,1) 100%)`,
      borderImageSlice: 1, // Utilisation correcte du dégradé
    }}>
            Voir plus
          </button>
        </Link>
      </div>
    </section>
  );
};

export default SectionAllAuctions;
