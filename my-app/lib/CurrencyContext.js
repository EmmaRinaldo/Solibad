// lib/CurrencyContext.js
"use client";

import React, { createContext, useContext, useState } from "react";

// Taux de conversion fixes
const conversionRates = {
  EUR: 1,
  GBP: 0.85,
  JPY: 130,
  KRW: 1350,
  CNY: 7,
  IDR: 17000,
  USD: 1.1, // Exemple : 1 EUR = 1.1 USD
};

// Contexte des devises
const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("EUR"); // Devise par défaut

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, conversionRates }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};