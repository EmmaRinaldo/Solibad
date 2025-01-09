// app/page.jsx
"use client";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CardAuction from "../components/CardAuction";
import HeroSection from "../components/HeroSection";
import SectionAllAuctions from "../components/SectionAllAuctions";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function Home() {

  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveAuctions = async () => {
      try {
        const response = await fetch("/api/auctions?type=active");
        const data = await response.json();
        setAuctions(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des enchères actives :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveAuctions();
  }, []);

  // if (loading) {
  //   return <p className="text-center text-gray-500">Chargement des enchères actives...</p>;
  // }

  // if (auctions.length === 0) {
  //   return <p className="text-center text-gray-500">Aucune enchère active pour le moment.</p>;
  // }
  
  return (
    <>
      <title>Auction - Solibad</title>
      <meta name="description" content="..." />
      <meta name="keywords" content="auction" />

      <Navbar />
      
      <div className="flex flex-col min-h-[80dvh]">
        <div className="flex-1 w-full">
          {/* Hero Section */}
          <HeroSection />

          {/* Section Les Enchères du Moment */}
          <section
            className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center bg-black active-auctions"
            style={{
              backgroundImage: "url('/assets/banner-shape.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="container px-4 md:px-6 text-center flex flex-col items-center justify-center">
              <h2 className="text-3xl mb-8 font-bold tracking-tighter sm:text-7xl text-white">
                LES ENCHÈRES DU MOMENT
              </h2>
              {/* Ajout de la taille personnalisée ici */}
              {loading ? (
                <p className="text-center text-gray-500"></p>
              ) : auctions.length === 0 ? (
                <p className="text-center text-white text-xl">Aucune enchère active pour le moment.</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {auctions.map((auction) => (
                    <CardAuction key={auction.id} auction={auction} className="mb-10 w-full sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4" />
                  ))}
                </div>
              )}
            </div>
          </section>


          {/* Section Comment ça marche */}
          <div style={{
            backgroundImage: "url('/assets/banner-gradient.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
            <section className="w-full py-12 md:py-24 lg:py-32 ">
              <div className="container mx-auto px-4 md:px-6 text-center">
                <div className="flex flex-col items-center justify-center space-y-6">
                  {/* Titre et description */}
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#020817]">
                    Comment ça marche
                  </h2>
                  <p className="max-w-[800px] text-gray-700 md:text-xl lg:text-lg">
                    Découvrez comment utiliser notre plateforme et pourquoi c’est le meilleur choix pour vos enchères.
                  </p>

                  {/* Étapes côte à côte */}
                  <div className="flex flex-wrap justify-center items-start gap-8 max-w-[1200px]">
                    {/* Étape 1 */}
                    <div className="flex flex-col items-center text-center w-[200px]">
                      <Image
                        src="/assets/icon1.svg"
                        alt="Inscrivez-vous gratuitement"
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                      <span className="text-lg font-bold text-blue-600 mt-4">01</span>
                      <h5 className="text-xl font-semibold mt-2">Inscrivez-vous gratuitement</h5>
                      <p className="text-gray-600 mt-1">
                        Créez facilement un compte pour commencer à enchérir.
                      </p>
                    </div>

                    {/* Étape 2 */}
                    <div className="flex flex-col items-center text-center w-[200px]">
                      <Image
                        src="/assets/icon3.svg"
                        alt="Explorez ou enchérissez"
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                      <span className="text-lg font-bold text-blue-600 mt-4">02</span>
                      <h5 className="text-xl font-semibold mt-2">Explorez ou enchérissez</h5>
                      <p className="text-gray-600 mt-1">
                        Découvrez nos enchères et participez.
                      </p>
                    </div>

                    {/* Étape 3 */}
                    <div className="flex flex-col items-center text-center w-[200px]">
                      <Image
                        src="/assets/icon2.svg"
                        alt="Soumettez votre offre"
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                      <span className="text-lg font-bold text-blue-600 mt-4">03</span>
                      <h5 className="text-xl font-semibold mt-2">Soumettez votre offre</h5>
                      <p className="text-gray-600 mt-1">
                        Proposez des enchères et gagnez des articles exclusifs !
                      </p>
                    </div>

                    {/* Étape 4 */}
                    <div className="flex flex-col items-center text-center w-[200px]">
                      <Image
                        src="/assets/icon4.svg"
                        alt="Gagnez"
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                      <span className="text-lg font-bold text-blue-600 mt-4">04</span>
                      <h5 className="text-xl font-semibold mt-2">Gagnez</h5>
                      <p className="text-gray-600 mt-1">
                        Complétez votre paiement et profitez de votre achat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>


            {/* Section Latest Auctions */}
            <section className="auction-section py-12">
              <div
                className="container mx-auto px-4 md:px-6 relative overflow-hidden rounded-lg"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Section Header */}
                <div className="text-center mb-12 relative z-10">
                  <SectionAllAuctions />
                </div>

                {/* Background overlay for glassmorphism effect */}
                <div
                  className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-lg z-0"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  }}
                ></div>
              </div>
            </section>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
