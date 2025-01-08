'use client';

import { useEffect, useState } from 'react';
import { differenceInCalendarDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { useSession } from 'next-auth/react';

export default function AuctionDetails() {
  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [users, setUsers] = useState({});
  const id = window.location.pathname.split('/').pop();
  const { data: session } = useSession();

  const calculateDuration = (startDate, endDate) => {
    const now = (new Date() - new Date().getTimezoneOffset() * 60000) ;
    const end = new Date(endDate);
    const days = differenceInCalendarDays(end, now);
    const hours = differenceInHours(end, now);
    const minutes = differenceInMinutes(end, now) % 60;
    const seconds = differenceInSeconds(end, now) % 60;
    return `${days}j ${hours}h ${minutes}m ${seconds}s`;
  };

  async function fetchAuctionDetails() {
    try {
      const response = await fetch(`/api/auctions?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setAuction(data.auction);
        setBids(data.bids);
        fetchUsers(data.bids);
      } else {
        console.error('Erreur lors de la récupération des détails de l\'enchère');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'enchère', error);
    }
  }

  async function fetchUsers(bids) {
    const userIds = [...new Set(bids.map(bid => bid.userId))];
    const usersData = {};
    for (const userId of userIds) {
      try {
        const response = await fetch(`/api/users?id=${userId}`);
        if (response.ok) {
          const user = await response.json();
          usersData[userId] = user;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur', error);
      }
    }
    setUsers(usersData);
  }

  useEffect(() => {
    fetchAuctionDetails();
  }, []);

  async function handleBidSubmit(event) {
    event.preventDefault();
    const body = Object.fromEntries(new FormData(event.target).entries());
    
    try {
      const userId = session.user.id;
      const response = await fetch(`/api/bids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bidAmount: parseFloat(bidAmount), userId: userId, auctionId: id })
      });
      if (response.ok) {
        console.log(body)
        fetchAuctionDetails();
        setBidAmount('');
      } else {
        console.error('Erreur lors de la soumission de la surenchère');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission de la surenchère', error);
    }
  }

  if (!auction) return <p>Chargement...</p>;

  return (
    <div className="container mx-auto p-4">
      <p className="mb-6">You are logged in as {session.user.id}.</p>
      <h1 className="text-2xl font-bold mb-4">{auction.title}</h1>
      <p className="text-gray-700">{auction.description}</p>
      <p className="text-gray-900 font-bold">Prix actuel: {auction.ActualBid}</p>
      <p className="text-red-700">Il reste: {calculateDuration(auction.startDate, auction.endDate)}</p>
      <h2 className="text-xl font-semibold mt-4">Surenchères</h2>
      <ul className="space-y-4">
        {bids.map(bid => (
          <li key={bid.id} className="border p-4 rounded shadow">
            <p className="text-gray-700">Montant: {bid.lastBid}</p>
            <p className="text-gray-700">Utilisateur: {users[bid.userId]?.name} {users[bid.userId]?.lastname}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleBidSubmit} className="mt-4" method='POST'>
        <input
          type="number"
          onChange={(e) => setBidAmount(e.target.value)}
          className="border p-2 rounded mr-2"
          defaultValue={auction.ActualBid + auction.minIncr}
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Surenchérir</button>
      </form>
    </div>
  );
}