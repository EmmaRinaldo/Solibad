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
                <Link
                    href="/a-propos"
                    className="text-xl font-medium text-gray-700 hover:text-blue-700"
                >
                    À propos
                </Link>
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
                        <User className="h-6 w-6 text-gray-600" />
                        <span className="text-xl font-medium text-gray-700">
                            {session.user.name} {session.user.lastname}
                        </span>
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
                            className="text-xl font-medium text-gray-700 hover:text-blue-700"
                        >
                            Se connecter
                        </Link>
                        <Link
                            href="/signup"
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

                    <Link
                        href="/a-propos"
                        className="text-lg font-medium text-gray-700 hover:text-gray-900"
                        onClick={toggleMenu}
                    >
                        À propos
                    </Link>
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
                            <span className="text-lg font-medium text-gray-700">
                                {session.user.name} {session.user.lastname}
                            </span>
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