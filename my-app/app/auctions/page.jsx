"use client";

import { useEffect, useState } from 'react';
import AuctionHistory from './history';
import CurrentAuctions from './current';

export default function AuctionPage() {
  const [auctions, setAuctions] = useState([]);
  const [showCurrent, setShowCurrent] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    async function fetchAuctions() {
      try {
        const response = await fetch('/api/auctions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
        });
        if (response.ok) {
          const data = await response.json();
          setAuctions(data);
        } else {
          console.error('Erreur lors de la récupération des enchères');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des enchères', error);
      }
    }

    fetchAuctions();
  }, []);
  
    const handleShowCurrent = () => {
      setShowCurrent(true);
      setShowHistory(false);
    };

  const handleShowHistory = () => {
    setShowHistory(true);
    setShowCurrent(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Toutes nos enchères</h1>
      <button 
        onClick={handleShowCurrent} 
        className={`px-4 py-2 rounded ${showCurrent ? 'bg-green-700 text-white' : 'bg-green-300 text-gray-700'}`}
      >
        En cours
      </button>
      <button 
        onClick={handleShowHistory} 
        className={`px-4 py-2 rounded mr-2 ${showHistory ? 'bg-blue-700 text-white' : 'bg-blue-300 text-gray-700'}`}
      >
        Historique complet
      </button>
      {showCurrent && <CurrentAuctions auctions={auctions.filter(auction => auction.endDate && new Date(auction.endDate) > (new Date() - new Date().getTimezoneOffset() * 60000))} />}
      {showHistory && <AuctionHistory auctions={auctions.filter(auction => auction.endDate && new Date(auction.endDate) <= (new Date() - new Date().getTimezoneOffset() * 60000))} />}
    </div>
  );
}