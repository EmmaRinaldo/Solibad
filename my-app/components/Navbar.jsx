// components/Navbar.jsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";  // Import de useTranslation

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const { t, i18n } = useTranslation(); // Accès aux traductions et à la fonction pour changer de langue

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    return currentHour < 12 ? t("good_morning") : t("good_evening");  // Utilisation de la traduction
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang); // Change la langue
    setIsLanguageMenuOpen(false); // Ferme le menu des langues après sélection
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-white shadow ${isScrolled ? "shadow-md" : ""} transition-shadow duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img src="/assets/logo-solibad.svg" alt="Logo Solibad" className="h-8 md:h-10" />
        </a>

        {/* Menu Burger pour petits écrans */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <img src="/assets/icon-burger.svg" alt="Menu Burger" className="h-6 w-6" />
          </button>
        </div>

        {/* Menu principal */}
        <div className={`md:flex flex-grow justify-center items-center space-x-6 ${isMenuOpen ? "block" : "hidden"}`}>
          <a href="/about" className="text-gray-700 hover:text-gray-900">{t("about")}</a>
          <a href="/shop" className="text-gray-700 hover:text-gray-900">{t("shop")}</a>
          <a href="/contact" className="text-gray-700 hover:text-gray-900">{t("contact")}</a>

          {/* Menu déroulant des langues */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {t("language")}
            </button>
            {isLanguageMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
                <ul className="space-y-2 p-2">
                  {['fr', 'en', 'zh', 'id', 'ja', 'ko'].map((lang) => (
                    <li key={lang}>
                      <button
                        onClick={() => handleLanguageChange(lang)}
                        className="block w-full text-left text-gray-700 hover:text-gray-900 p-2"
                      >
                        {lang === 'fr' ? 'Français' : lang === 'en' ? 'English' : lang === 'zh' ? '中文' : lang === 'id' ? 'Bahasa' : lang === 'ja' ? '日本語' : '한국어'}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Panier et Profil utilisateur */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="/cart">
            <img src="/assets/icon-cart.svg" alt="Panier" className="h-6 w-6" />
          </a>

          {/* Profil utilisateur */}
          <a href={user ? "/dashboard" : "/login"}>
            <img
              src={user?.profileImagePath || "/assets/default-profile.png"}
              alt="Profil utilisateur"
              className="h-8 w-8 rounded-full object-cover border border-gray-300"
            />
          </a>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} fixed top-0 left-0 w-full h-full bg-white z-40`}>
        <div className="flex flex-col items-start justify-start p-4">
          {/* Section de bienvenue pour l'utilisateur */}
          <div className="flex items-center justify-between w-full">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <img
                    src={user?.profileImagePath || "/assets/default-profile.png"}
                    alt="Profil utilisateur"
                    className="h-10 w-10 rounded-full object-cover border border-gray-300"
                  />
                  <span className="text-lg text-gray-700">{`${getGreeting()} ${user.name}`}</span>
                </div>
              </>
            ) : (
              <span className="text-lg text-gray-700">{t("please_login")}</span>
            )}
            {/* Bouton de fermeture du menu */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-gray-900"
            >
              <img src="/assets/icon-close.svg" alt="Fermer" className="h-6 w-6" />
            </button>
          </div>

          {/* Liens du menu mobile */}
          <a href="/about" className="text-gray-700 hover:text-gray-900 py-2">{t("about")}</a>
          <a href="/shop" className="text-gray-700 hover:text-gray-900 py-2">{t("shop")}</a>
          <a href="/contact" className="text-gray-700 hover:text-gray-900 py-2">{t("contact")}</a>

          {/* Menu des langues */}
          <div className="mt-4 w-full">
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="text-gray-700 hover:text-gray-900 w-full text-left"
            >
              {t("language")}
            </button>
            {isLanguageMenuOpen && (
              <div className="mt-2 w-full bg-white border border-gray-200 shadow-lg rounded-lg">
                <ul className="space-y-2 p-2">
                  {['fr', 'en', 'zh', 'id', 'ja', 'ko'].map((lang) => (
                    <li key={lang}>
                      <button
                        onClick={() => handleLanguageChange(lang)}
                        className="block w-full text-left text-gray-700 hover:text-gray-900 p-2"
                      >
                        {lang === 'fr' ? 'Français' : lang === 'en' ? 'English' : lang === 'zh' ? '中文' : lang === 'id' ? 'Bahasa' : lang === 'ja' ? '日本語' : '한국어'}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
