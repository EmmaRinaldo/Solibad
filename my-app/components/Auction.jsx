// components/Auction.jsx
"use client";

import React, { useEffect, useState } from "react";
import translateText from "@lib/translate"; // Import de la fonction de traduction
import { useTranslation } from "react-i18next";

const Auction = () => {
  const { i18n } = useTranslation();
  const [translatedText, setTranslatedText] = useState("");
  const auctionText = "Bid now and win amazing prizes!"; // Texte original

  useEffect(() => {
    const translateAuction = async () => {
      try {
        const translated = await translateText(auctionText, i18n.language);
        setTranslatedText(translated);
      } catch (error) {
        console.error("Erreur lors de la traduction :", error);
        setTranslatedText(auctionText); // Repli sur le texte original en cas d'erreur
      }
    };

    translateAuction();
  }, [i18n.language]); // Déclenche la traduction à chaque changement de langue

  return (
    <div className="auction-container">
      <h2>{translatedText || auctionText}</h2>
      <p>Don't miss out on amazing opportunities! Place your bid today!</p>
    </div>
  );
};

export default Auction;