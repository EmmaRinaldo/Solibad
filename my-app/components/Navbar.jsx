// components/Navbar.jsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // Import du hook useTranslation

const Navbar = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const router = useRouter();
    const pathname = usePathname();  // Pour garder la langue dans l'URL

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

    const { t } = useTranslation(); // Utilisation du hook useTranslation

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        return currentHour < 12 ? t('greeting') : t('greeting');
    };

    const handleLanguageChange = (lang) => {
        router.push(`/${lang}${pathname}`);
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
            className={`fixed top-0 left-0 w-full z-50 bg-white shadow ${isScrolled ? "shadow-md" : ""
                } transition-shadow duration-300`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                {/* Logo */}
                <a href="/" className="flex-shrink-0">
                    <img
                        src="/assets/logo-solibad.svg"
                        alt="Logo Solibad"
                        className="h-8 md:h-10"
                    />
                </a>

                {/* Grand écran : Liens au centre et à droite */}
                <div className="hidden md:flex flex-grow justify-center items-center space-x-6">
                    <a href="/about" className="text-gray-700 hover:text-gray-900">{t('about')}</a>
                    <a href="/shop" className="text-gray-700 hover:text-gray-900">{t('shop')}</a>
                    <a href="/contact" className="text-gray-700 hover:text-gray-900">{t('contact')}</a>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    {/* Panier toujours visible */}
                    <a href="/cart">
                        <img
                            src="/assets/icon-cart.svg"
                            alt="Panier"
                            className="h-6 w-6"
                        />
                    </a>

                    {/* Menu déroulant des langues */}
                    <div className="relative">
                        <button
                            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                            className="text-gray-700 hover:text-gray-900 focus:outline-none"
                        >
                            {t('language')} {/* Traduction pour "Langues" */}
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

                    {/* Bouton utilisateur */}
                    <a href={user ? "/dashboard" : "/login"}>
                        <img
                            src={user?.profileImagePath || "/assets/default-profile.png"}
                            alt="Profil utilisateur"
                            className="h-8 w-8 rounded-full object-cover border border-gray-300"
                        />
                    </a>
                </div>

                {/* Petit écran : Menu burger */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-700 hover:text-gray-900 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Petit écran : Menu responsive */}
            <div
                className={`fixed top-0 right-0 h-full w-full bg-white transform transition-transform duration-300 ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                } z-40`}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Section utilisateur */}
                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-2">
                            <img
                                src={user?.profileImagePath || "/assets/default-profile.png"}
                                alt="Profil utilisateur"
                                className="h-10 w-10 rounded-full object-cover"
                            />
                            {user ? (
                                <span className="text-xl font-semibold">
                                    {getGreeting()}, {user?.name || "Utilisateur"} !
                                </span>
                            ) : (
                                <span className="text-xl font-semibold">
                                    <a href="/login" className="text-blue-600 hover:underline">
                                        Connectez-vous
                                    </a>
                                    {" "} pour accéder à votre compte.
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="text-gray-700 ml-auto"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <nav className="flex flex-col mt-8 space-y-4">
                        <a href="/about" className="text-lg text-gray-700 hover:text-gray-900">{t('about')}</a>
                        <a href="/shop" className="text-lg text-gray-700 hover:text-gray-900">{t('shop')}</a>
                        <a href="/contact" className="text-lg text-gray-700 hover:text-gray-900">{t('contact')}</a>
                        <a href="/cart" className="text-lg text-gray-700 hover:text-gray-900">{t('cart')}</a>
                        {user ? (
                            <button
                                onClick={() => alert("Déconnexion")}
                                className="text-lg text-gray-700 hover:text-gray-900"
                            >
                                Déconnexion
                            </button>
                        ) : null}
                    </nav>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
