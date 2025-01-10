import Image from "next/image";
import React from "react";
import Link from 'next/link';

const Header = () => {
  return (
    <header
      className="relative bg-[#F2F0F1] overflow-hidden"
      style={{
        backgroundImage: "url('/assets/banner-gradient.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="w-full py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* Texte de bienvenue */}
            <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-[#020817] leading-tight">
                Attrapez l’affaire, envoyez le volant !
              </h1>
              <p className="text-sm sm:text-base lg:text-lg max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] text-black">
                La plateforme ultime pour acheter et vendre des articles de Badminton
                en toute sécurité via des enchères en ligne en temps réel. 
                Rejoignez-nous dès aujourd'hui et vivez l'excitation de trouver vos objets de rêve.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center lg:justify-start">
                <Link href="#active-auctions">
                  <button className="inline-flex items-center justify-center rounded-md border border-[#020817]/80 px-8 py-3 text-sm font-medium text-[#020817] shadow-md hover:bg-black hover:text-white transition" style={{
      borderWidth: "3px", // Épaisseur de la bordure
      borderStyle: "solid", // Style de la bordure
      borderRadius: "12px", // Coins arrondis
      borderImageSource: `linear-gradient(90deg, rgba(229,65,41,1) 0%, rgba(234,111,17,1) 10%, rgba(255,231,24,1) 25%, rgba(136,187,21,1) 40%, rgba(53,159,43,1) 55%, rgba(19,161,174,1) 70%, rgba(16,139,200,1) 85%, rgba(13,56,137,1) 100%)`,
      borderImageSlice: 1, // Utilisation correcte du dégradé
    }}>
                    Commencer à enchérir
                  </button>
                </Link>
                
              </div>
            </div>

            {/* Image Hero */}
            <div className="relative w-full flex justify-center lg:justify-end">
              <Image
                src="/assets/img1.png"
                alt="Hero"
                layout="intrinsic"
                width={300} // Largeur optimisée pour mobiles
                height={300} // Hauteur optimisée pour mobiles
                className="rounded-xl object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
