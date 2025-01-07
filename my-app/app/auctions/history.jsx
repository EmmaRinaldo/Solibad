import React from 'react';
import { format, differenceInHours, differenceInMinutes } from 'date-fns';

export default function AuctionHistory({ auctions }) {
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'PPpp');
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const hours = differenceInHours(end, start);
    const minutes = differenceInMinutes(end, start) % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <ul className="space-y-4">
      {auctions.map((auction) => (
        <li key={auction.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{auction.title}</h2>
          <p className="text-gray-700">{auction.description}</p>
          <p className="text-gray-900 font-bold">somme finale: {auction.FinishedPrice}</p>
          <p className="text-gray-900 font-bold">grand gagnant: {auction.winnerId}</p>
          <p className="text-gray-700">Début: {formatDate(auction.startDate)}</p>
          <p className="text-gray-700">Fin: {formatDate(auction.endDate)}</p>
          <p className="text-gray-700">Durée: {calculateDuration(auction.startDate, auction.endDate)}</p>
        </li>
      ))}
    </ul>
  );
}
