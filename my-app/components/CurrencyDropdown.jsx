// components/CurrencyDropdown.jsx
"use client";

import { useState } from "react";
import { useCurrency } from "../lib/CurrencyContext.js";

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

const CurrencyDropdown = () => {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const allowedCurrencies = ["EUR", "GBP", "JPY", "KRW", "CNY", "IDR", "USD"];

  // Liste des devises disponibles sans la devise sélectionnée
  const availableCurrencies = allowedCurrencies.filter((curr) => curr !== currency);

  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="block p-0 m-0 text-center z-[999999] direction-ltr fixed right-[140px] bottom-[12px] rounded-[12px] bg-white shadow-lg border border-gray-300 w-36"
    >
      <div className="relative">
        {/* Menu déroulant */}
        {isOpen && (
          <div className="divide-y divide-gray-300">
            {availableCurrencies.map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)} // Mettre à jour la devise mais ne pas fermer
                className="w-full p-2 text-gray-700 flex items-center justify-start space-x-2 hover:bg-gray-200"
              >
                <span>{currencySymbols[curr]}</span>
                <span>{curr}</span>
              </button>
            ))}
          </div>
        )}

        {/* Bouton de la devise sélectionnée (toujours en bas) */}
        <button
          onClick={toggleMenu} // Basculer l'affichage du menu
          className="w-full p-2 rounded-md hover:bg-gray-200 focus:outline-none flex items-center justify-start space-x-2"
        >
          <span>{currencySymbols[currency]}</span>
          <span>{currency}</span>
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropdown;