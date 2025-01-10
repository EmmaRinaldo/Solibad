// components/Navbar.jsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { LogOut, User, Menu, X } from "lucide-react";

const Navbar = () => {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="md:h-[12vh] w-full flex items-center border-b px-5 lg:px-14 justify-between sticky top-0 z-50 bg-white shadow-sm">
            {/* Logo responsive */}
            <Link href="/" className="flex-shrink-0">
                <div className="h-[8vh]">
                    {/* Logo pour petits écrans */}
                    <img
                        src="/assets/logo-solibad-small.svg"
                        alt="Logo Solibad petit écran"
                        className="h-full w-auto object-contain xs:block sm:block md:hidden lg:hidden"
                    />
                    {/* Logo pour écrans moyens */}
                    <img
                        src="/assets/logo-solibad-medium.svg"
                        alt="Logo Solibad écran moyen"
                        className="h-full w-auto object-contain hidden xs:hidden sm:hidden md:block lg:hidden"
                    />
                    {/* Logo pour grands écrans */}
                    <img
                        src="/assets/logo-solibad-large.svg"
                        alt="Logo Solibad grand écran"
                        className="h-full w-auto object-contain hidden xs:hidden sm:hidden md:hidden lg:block"
                    />
                </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-grow justify-center items-center space-x-6">
                <div className="relative group">
                    <button className="text-xl font-medium text-gray-700 hover:text-blue-700">
                        Nos Sites
                    </button>
                    <div
                        className="min-w-[150px] absolute hidden group-hover:block bg-white shadow-lg p-3 rounded-lg"
                        style={{ borderRadius: 12 }}
                    >
                        <ul className="flex flex-col space-y-2">
                            <li>
                                <Link
                                    href="https://www.solibad.fr/"
                                    target="_blank"
                                    className="text-xl font-medium text-gray-700 hover:text-blue-700"
                                >
                                    Solibad
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.solibad-shop.com/"
                                    target="_blank"
                                    className="text-xl font-medium text-gray-700 hover:text-blue-700"
                                >
                                    Solibad Shop
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <Link
                    href="/contact"
                    className="text-xl font-medium text-gray-700 hover:text-blue-700"
                >
                    Contact
                </Link>
            </div>

            {/* User Actions (Desktop and Mobile) */}
            <div className="hidden md:flex items-center space-x-4">
                {session ? (
                    <div className="flex items-center space-x-2">
                        <Link href="/profil">
                            <User className="h-6 w-6 text-gray-600" />
                            <span className="text-xl font-medium text-gray-700">
                                {session.user.name} {session.user.lastname}
                            </span>
                        </Link>

                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="text-gray-600 hover:text-gray-900"
                            title="Se déconnecter"
                        >
                            <LogOut className="h-6 w-6" />
                        </button>
                    </div>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="text-xl font-medium text-gray-700 hover:bg-black hover:text-white " style={{
                                borderWidth: "3px", // Épaisseur de la bordure
                                borderStyle: "solid", // Style de la bordure
                                borderImageRadius: "62px", // Coins arrondis 
                                borderImageSource: `linear-gradient(90deg, rgba(229,65,41,1) 0%, rgba(234,111,17,1) 10%, rgba(255,231,24,1) 25%, rgba(136,187,21,1) 40%, rgba(53,159,43,1) 55%, rgba(19,161,174,1) 70%, rgba(16,139,200,1) 85%, rgba(13,56,137,1) 100%)`,
                                borderImageSlice: 1, // Utilisation correcte du dégradé
                              }} 
                        >
                            Se connecter
                        </Link>
                        <Link
                            href="/register"
                            className="text-xl font-medium text-gray-700 hover:text-blue-700"
                        >
                            S'inscrire
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden flex items-center text-gray-700 hover:text-gray-900"
                onClick={toggleMenu}
                aria-label="Menu"
            >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-0 left-0 w-full h-screen bg-white z-50 flex flex-col items-start p-6 space-y-6">
                    <div className="flex items-center justify-between w-full">
                        {/* Logo petit écran */}
                        <Link href="/" onClick={toggleMenu}>
                            <img
                                src="/assets/logo-solibad-small.svg"
                                alt="Logo Solibad petit écran"
                                className="h-8 w-auto object-contain"
                            />
                        </Link>
                        {/* Bouton pour fermer le menu */}
                        <button
                            className="text-gray-700 hover:text-gray-900"
                            onClick={toggleMenu}
                            aria-label="Fermer le menu"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div>
                        <p className="text-lg font-medium text-gray-700">Nos Sites</p>
                        <ul className="mt-2 pl-4 space-y-2">
                            <li>
                                <Link
                                    href="https://www.solibad.fr/"
                                    target="_blank"
                                    className="text-md font-medium text-gray-700 hover:text-gray-900"
                                    onClick={toggleMenu}
                                >
                                    Solibad
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.solibad-shop.com/"
                                    target="_blank"
                                    className="text-md font-medium text-gray-700 hover:text-gray-900"
                                    onClick={toggleMenu}
                                >
                                    Solibad Shop
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Link
                        href="/contact"
                        className="text-lg font-medium text-gray-700 hover:text-gray-900"
                        onClick={toggleMenu}
                    >
                        Contact
                    </Link>
                    {session ? (
                        <div className="flex flex-col space-y-4">
                            <Link href="/profil">
                                <User className="h-6 w-6 text-gray-600" />
                                <span className="text-xl font-medium text-gray-700">
                                    {session.user.name} {session.user.lastname}
                                </span>
                            </Link>
                            <button
                                onClick={() => {
                                    toggleMenu();
                                    signOut({ callbackUrl: "/" });
                                }}
                                className="text-lg font-medium text-gray-700 hover:text-gray-900"
                            >
                                Déconnexion
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/login"
                                className="text-lg font-medium text-gray-700 hover:text-gray-900"
                                onClick={toggleMenu}
                            >
                                Se connecter
                            </Link>
                            <Link
                                href="/signup"
                                className="text-lg font-medium text-gray-700 hover:text-gray-900"
                                onClick={toggleMenu}
                            >
                                S'inscrire
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
