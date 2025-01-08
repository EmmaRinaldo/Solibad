// components/Footer.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import logoSolibad from "../public/assets/logo-solibad.svg";

const Footer = () => {
    
    return (
        <footer id="footer" className="gradient-border-footer mt-9">
            <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-8 lg:py-16">
                {/* Wrapper global pour le contenu */}
                <div className="flex flex-wrap lg:flex-nowrap lg:items-start">
                    {/* Logo */}
                    <div className="w-full lg:w-2/6 mb-6 lg:mb-0">
                        <Link
                            className="text-2xl font-bold text-gray-800 flex"
                            href="/"
                        >
                            <Image
                                src={logoSolibad}
                                alt="Logo de Solibad"
                                className="h-[8vh] w-fit"
                            />
                        </Link>
                    </div>

                    {/* Espace vide pour bureau */}
                    <div className="hidden lg:block lg:w-1/6"></div>

                    {/* Liens Accéder */}
                    <div className="w-full sm:w-1/2 lg:w-2/6 mb-6 sm:mb-0">
                        <h5 className="text-lg font-semibold text-gray-700 mb-4">
                            Accéder
                        </h5>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/conditions-generales-utilisation"
                                    className="text-gray-600 hover:text-gray-800"
                                    target="_blank"
                                    aria-label="Lien vers les conditions générales d'utilisation"
                                >
                                    CGU
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/mentions-legales"
                                    className="text-gray-600 hover:text-gray-800"
                                    target="_blank"
                                    aria-label="Lien vers les mentions légales"
                                >
                                    Mentions légales
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/politique-de-confidentialite"
                                    className="text-gray-600 hover:text-gray-800"
                                    target="_blank"
                                    aria-label="Lien vers la politique confidentialité"
                                >
                                    Politique de confidentialité
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Réseaux sociaux */}
                    <div className="w-full sm:w-1/2 lg:w-2/6">
                        <h5 className="text-lg font-semibold text-gray-700 mb-4">
                            Réseaux sociaux
                        </h5>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="https://www.facebook.com/solibad.fr"
                                    className="text-gray-600 hover:text-gray-800"
                                    target="_blank"
                                    aria-label="Lien vers Facebook"
                                >
                                    Facebook
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.instagram.com/Solibad_Charity/"
                                    className="text-gray-600 hover:text-gray-800"
                                    target="_blank"
                                    aria-label="Lien vers Instagram"
                                >
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://x.com/i/flow/login?redirect_after_login=%2FSolibadFr"
                                    className="text-gray-600 hover:text-gray-800"
                                    target="_blank"
                                    aria-label="Lien vers Twitter"
                                >
                                    Twitter
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.youtube.com/user/solibadnet"
                                    className="text-gray-600 hover:text-gray-800"
                                    target="_blank"
                                    aria-label="Lien vers YouTube"
                                >
                                    YouTube
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bas de footer */}
                <div className="mt-8 border-t border-gray-200 pt-4 text-center">
                    <p className="text-gray-600">
                        &copy; 2025 Solibad. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
