// components/Navbar.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import logoSolibad from "@/public/assets/logo.png";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";


const Navbar = () => {
    
    const { data: session } = useSession()

    return (
        <nav className="h-[12vh] w-full flex items-center border-b px-5 lg:px-14 justify-between sticky top-0 z-50 bg-white shadow-sm">
            {/* Logo */}
            <Link href="/">
                <Image
                src={logoSolibad}
                alt="Logo de Solibad"
                className="h-[8vh] w-fit bg-white rounded-full"
                />
            </Link>

            {/* Navigation pour desktop */}
            <div className="hidden md:flex flex-grow justify-center items-center space-x-6">
                <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                    <Link href="/a-propos">À propos</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                    <NavigationMenuTrigger>Nos Sites</NavigationMenuTrigger>
                    <div className="absolute bg-white shadow-lg p-3 rounded-md mt-2">
                        <ul className="flex flex-col space-y-2">
                        <li>
                            <Link href="https://www.solibad.fr/" target="_blank" className="text-sm text-gray-700 hover:text-gray-900">
                            Solibad
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.solibad-shop.com/" target="_blank" className="text-sm text-gray-700 hover:text-gray-900">
                            Solibad Shop
                            </Link>
                        </li>
                        </ul>
                    </div>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                    <Link href="/contact">Contact</Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Icône utilisateur et bouton logout */}
            <div className="flex items-center space-x-4">
                {session ? (
                    <div className="flex items-center space-x-2">
                        {/* Icône utilisateur */}
                        <User className="h-6 w-6 text-gray-600" />
                        {/* Nom et prénom en desktop */}
                        <span className="hidden md:block text-sm font-medium text-gray-700">
                            {session.user.name} {session.user.lastname}
                        </span>
                        {/* Bouton déconnexion */}
                        <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="text-gray-600 hover:text-gray-900"
                        title="Se déconnecter"
                        >
                            <LogOut className="h-6 w-6" />
                        </button>
                    </div>
                ) : (
                    <Link href="/login" className="text-sm text-gray-700 hover:text-gray-900">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;