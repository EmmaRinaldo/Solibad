// components/PriceDisplay.jsx
"use client";

import React from "react";
import { useCurrency } from "../lib/CurrencyContext";

// Association des symboles aux devises
const currencySymbols = {
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  KRW: "₩",
  CNY: "¥",
  IDR: "Rp",
  USD: "$",
};

const PriceDisplay = ({ priceInEUR = 0 }) => {
  const { currency, conversionRates } = useCurrency();

  // Calcul du prix converti
  const convertedPrice = priceInEUR * (conversionRates[currency] || 1);

  return (
    <div>
      <p>
        Prix : {currencySymbols[currency]}
        {convertedPrice.toFixed(2)}
      </p>
    </div>
  );
};

export default PriceDisplay;