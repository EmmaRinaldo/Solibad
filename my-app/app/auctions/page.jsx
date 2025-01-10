// app/auctions/page.jsx

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import React from 'react';

const products = [
  { id: 1, name: 'Raquettes dédicacées', image: '/assets/act1.png', rating: 3.5, price: 145, oldPrice: 232 },
  { id: 2, name: "Pin's", image: '/assets/4.png', rating: 4.8, price: 189 },
  { id: 3, name: "Volants en plumes d'époque", image: '/assets/6.png', rating: 4.8, price: 189 },
  { id: 4, name: 'Médailles ', image: '/assets/5.png', rating: 4.8, price: 189 },
  { id: 5, name: 'Affiches de tournois anciens', image: '/assets/7.png', rating: 4.8, price: 189 },
  { id: 6, name: '2 anciennes raquettes de badminton en bois fin XIX début XX ème', image: '/assets/9.png', rating: 4.8, price: 189 },
  { id: 7, name: 'Photographies vintage', image: '/assets/8.png', rating: 4.8, price: 189 },
];

export default function Auctions() {
  return (
    <>
        <Navbar />
      <section
        className="w-full py-8 sm:py-12 lg:py-16 bg-[#F0EEED] text-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/assets/banner-gradient.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
                className="block px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous</option>
                <option value="price-low-high">Prix : Croissant</option>
                <option value="price-high-low">Prix : Décroissant</option>
                <option value="rating">Évaluation</option>
              </select>
            </div>

            {/* Afficher */}
            <div className="flex items-center space-x-2">
              <label htmlFor="show" className="text-sm text-black">
                Afficher :
              </label>
              <select
                id="show"
                className="block px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="36">36</option>
              </select>
            </div>

            {/* Recherche */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Rechercher..."
                className="px-4 py-2 w-full max-w-xs text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Liste des produits */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col items-center">
                <div className="bg-[#F0EEED] rounded-md overflow-hidden shadow-lg w-full aspect-square mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-black">{product.name}</h3>
                <div className="flex items-center space-x-1 mt-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${index < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.44a1 1 0 00-.364 1.118l1.286 3.956c.3.921-.755 1.688-1.54 1.118l-3.366-2.44a1 1 0 00-1.175 0l-3.366 2.44c-.784.57-1.838-.197-1.54-1.118l1.286-3.956a1 1 0 00-.364-1.118L2.343 8.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.956z" />
                    </svg>
                  ))}
                </div>
                <div className="flex items-center mt-2">
                  <span className="font-bold text-lg">${product.price}</span>
                  {product.oldPrice && (
                    <span className="ml-2 text-sm line-through text-gray-500">${product.oldPrice}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
