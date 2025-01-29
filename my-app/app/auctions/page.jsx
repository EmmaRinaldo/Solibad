// app/auctions/page.jsx

"use client";

import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function Auctions() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch("/api/auctions?type=active");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des enchères.");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  // Fonction de tri
  const sortedProducts = () => {
    let sorted = [...products];
    if (sortOrder === "price-low-high") {
      sorted.sort((a, b) => a.ActualBid - b.ActualBid);
    } else if (sortOrder === "price-high-low") {
      sorted.sort((a, b) => b.ActualBid - a.ActualBid);
    }
    return sorted;
  };

  // Fonction de recherche
  const filteredProducts = sortedProducts().filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <section
        className="w-full py-8 sm:py-12 lg:py-16 bg-[#F0EEED] text-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/assets/banner-gradient.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-black">
            NOS ENCHÈRES
          </h2>

          {/* Filtrage et tri */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            {/* Tri par */}
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-sm text-black">
                Trier par :
              </label>
              <select
                id="sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="block px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous</option>
                <option value="price-low-high">Prix : Croissant</option>
                <option value="price-high-low">Prix : Décroissant</option>
              </select>
            </div>

            {/* Recherche */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 w-full max-w-xs text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Liste des produits */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
            {loading ? (
              <p>Chargement des enchères...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : filteredProducts.length === 0 ? (
              <p>Aucune enchère active pour le moment.</p>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="flex flex-col items-center">
                  <div className="bg-[#F0EEED] rounded-md overflow-hidden shadow-lg w-full aspect-square mb-2">
                    <img
                      src={product.images?.[0] || "/placeholder.png"}
                      alt={product.title}
                      className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-black">
                    {product.title}
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className="font-bold text-lg">{product.ActualBid} €</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

