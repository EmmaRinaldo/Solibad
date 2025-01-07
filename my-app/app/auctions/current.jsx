import React from 'react';
import { format } from 'date-fns';

export default function CurrentAuctions({ auctions }) {
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'PPpp');
  };

  if (auctions.length === 0) return (
    <div className="mt-4">
      <p className="text-gray-700">Il n'y a pas d'enchères en cours.</p>
      <p className="text-gray-700">Revenez plus tard pour voir nos prochaines enchères.</p>
    </div>
  );

  return (
    <div className="mt-4">
      {auctions.map(auction => (
        <div key={auction.id} className="border p-4 rounded shadow mb-4">
          <h2 className="text-xl font-semibold">{auction.title}</h2>
          <p className="text-gray-700">{auction.description}</p>
          <p className="text-gray-900 font-bold">Prix actuel: {auction.currentPrice}</p>
          <p className="text-gray-700">Début: {formatDate(auction.startDate)}</p>
          {auction.endDate && <p className="text-gray-700">Fin prévue: {formatDate(auction.endDate)}</p>}
        </div>
      ))}
    </div>
  );
}
