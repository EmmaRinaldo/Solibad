//components/CardAuction.jsx
"use client";

import { useEffect, useState } from "react";
import React from "react";
import Link from 'next/link';

export default function CardAuction({ auction }) {

    const [timeLeft, setTimeLeft] = useState(getTimeLeft(auction.endDate));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft(auction.endDate));
        }, 1000);

        return () => clearInterval(interval);
    }, [auction.endDate]);

    if (timeLeft.total <= 0) {
        return (
            <div className="relative w-72 h-72 bg-white/10 item-center rounded-lg overflow-hidden shadow-lg border border-white/20">

                {auction.images && auction.images.length > 0 ? (
                    <div className="relative w-55 h-48">
                        <Image
                            alt={auction.title}
                            className="object-contain w-full h-full"
                            width={450}
                            height={450}
                            src={auction.images[0]}
                        />
                    </div>
                ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500">Pas d'image disponible</p>
                    </div>
                )}
                <p className="bg-red-500 text-white text-xs font-bold pt-2 pb-2">L'enchère est terminée.</p>

                <div className="absolute bottom-0 w-full backdrop-blur-md bg-white/10 border-t border-white/20 py-2 px-4 flex justify-between items-center">
                    {/* Texte */}
                    <div>
                        <p className="text-sm text-white/80 text-red-500">{auction.title}</p>
                        <p className="text-lg text-white font-bold ">{auction.ActualBid}€</p>
                    </div>
                    {/* Bouton */}
                    <Link href={`/auctions/${auction.id}`}>
                        <button className="text-sm text-white bg-black/30 rounded-lg px-3 py-1 hover:bg-black/50 transition">
                        Voir les détails
                        </button>
                    </Link >
                </div>
                
            </div>
        );
    }

    return (
        <div className="relative w-72 h-72 bg-white/10 item-center rounded-lg overflow-hidden shadow-lg border border-white/20">
            {/* Image */}

            {auction.images && auction.images.length > 0 ? (
                <div className="relative w-55 h-48">
                    <Image
                        alt={auction.title}
                        className="object-contain w-full h-full"
                        width={450}
                        height={450}
                        src={auction.images[0]}
                    />
                </div>
            ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Pas d'image disponible</p>
                </div>
            )}


            {/* Pied de carte */}
            <div className="absolute bottom-0 w-full backdrop-blur-md bg-white/10 border-t border-white/20 py-2 px-4 flex justify-between items-center">
                {/* Texte */}
                <div>
                    <p className="text-sm text-white/80">{auction.title}</p>
                    <p className="text-lg text-white font-bold">{auction.ActualBid}€</p>
                </div>
                {/* Bouton */}
                <Link href={`/auctions/${auction.id}`}>
                    <button className="text-sm text-white bg-black/30 rounded-lg px-3 py-1 hover:bg-black/50 transition">
                        Enchérir
                    </button>
                </Link >
            </div>

            {/* Temps restant */}
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
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