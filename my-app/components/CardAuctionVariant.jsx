//components/CardAuctionVariant.jsx

import React from 'react';
import Link from 'next/link';

const CardAuctionVariant = ({ auction }) => {
  return (
    <div className="min-w-0 shrink-0 grow-0 basis-full w-full max-w-[198px] sm:max-w-[295px] pl-0">
      <Link className="flex flex-col items-start aspect-auto" href={`/auctions/${auction.id}`}>
        <div className="bg-[#F0EEED] rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden">
          <img
            alt={auction.title}
            src={auction.images?.[0] || '/assets/no-image.png'}
            className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
          />
        </div>
        <strong className="text-black xl:text-xl">{auction.title}</strong>
        <div className="flex items-end mb-1 xl:mb-2">
          <span className="font-bold text-gray-600 text-sm">Enchère en cours</span>
        </div>
        <div className="flex items-center space-x-[5px] xl:space-x-2.5">
          <span className="font-bold text-black text-xl xl:text-2xl">{auction.ActualBid}€</span>
        </div>
      </Link>
    </div>
  );
};

export default CardAuctionVariant;
