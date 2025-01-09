//app/admin-dashboard/page.jsx

"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AdminDashboard() {
  const [auctions, setAuctions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newAuction, setNewAuction] = useState({
    title: "",
    description: "",
    startPrice: "",
    minIncr: "",
    startDate: "",
    endDate: "",
    image: null, // Image à uploader
  });
  const [error, setError] = useState("");

  // Charger les enchères existantes
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch("/api/auctions");
        const data = await response.json();
        setAuctions(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des enchères :", err);
      }
    };

    fetchAuctions();
  }, []);

  // Gestion de la création d'une enchère
  const handleCreateAuction = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Créer l'enchère sans image
      const auctionResponse = await fetch("/api/auctions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newAuction.title,
          description: newAuction.description,
          startPrice: newAuction.startPrice,
          minIncr: newAuction.minIncr,
          startDate: newAuction.startDate,
          endDate: newAuction.endDate,
          images:[],
        }),
      });

      if (!auctionResponse.ok) {
        const errorData = await auctionResponse.json();
        setError(errorData.error || "Une erreur est survenue.");
        return;
      }

      const createdAuction = await auctionResponse.json();

      // Si une image est attachée, uploader l'image
      if (newAuction.image) {
        const formData = new FormData();
        formData.append("auctionId", createdAuction.id);
        formData.append("image", newAuction.image);

        const imageResponse = await fetch("/api/auctions/upload", {
          method: "POST",
          body: formData,
        });

        if (!imageResponse.ok) {
          const errorData = await imageResponse.json();
          setError(errorData.error || "Erreur lors de l'upload de l'image.");
          return;
        }
      }

      // Actualiser la liste des enchères
      setAuctions((prev) => [...prev, createdAuction]);
      setShowPopup(false);
      setNewAuction({
        title: "",
        description: "",
        startPrice: "",
        minIncr: "",
        startDate: "",
        endDate: "",
        image: null,
      });
    } catch (err) {
      console.error("Erreur lors de la création de l'enchère :", err);
      setError("Une erreur est survenue.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Tableau de Bord Administrateur</h1>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Liste des Enchères</h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => setShowPopup(true)}
          >
            Créer une Enchère
          </button>
        </div>

        {/* Tableau des enchères */}
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-white">Photo</th>
              <th className="px-4 py-2 text-left text-white">Nom</th>
              <th className="px-4 py-2 text-left text-white">Prix de départ</th>
              <th className="px-4 py-2 text-left text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {auctions.map((auction) => (
              <tr key={auction.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={auction.images?.[0] || "/placeholder.png"}
                    alt={auction.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                </td>
                <td className="px-4 py-2">{auction.title}</td>
                <td className="px-4 py-2">${auction.startPrice}</td>
                <td className="px-4 py-2">
                  <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
                    Modifier
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition ml-2">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup pour créer une enchère */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Créer une Enchère</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleCreateAuction} className="space-y-4">
              <div>
                <label>Titre</label>
                <input
                  type="text"
                  value={newAuction.title}
                  onChange={(e) =>
                    setNewAuction({ ...newAuction, title: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label>Description</label>
                <textarea
                  value={newAuction.description}
                  onChange={(e) =>
                    setNewAuction({ ...newAuction, description: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label>Prix de départ</label>
                <input
                  type="number"
                  value={newAuction.startPrice}
                  onChange={(e) =>
                    setNewAuction({ ...newAuction, startPrice: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label>Incrémentation minimale</label>
                <input
                  type="number"
                  value={newAuction.minIncr}
                  onChange={(e) =>
                    setNewAuction({ ...newAuction, minIncr: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label>Date de début</label>
                <input
                  type="datetime-local"
                  value={newAuction.startDate}
                  onChange={(e) =>
                    setNewAuction({ ...newAuction, startDate: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label>Date de fin</label>
                <input
                  type="datetime-local"
                  value={newAuction.endDate}
                  onChange={(e) =>
                    setNewAuction({ ...newAuction, endDate: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewAuction({ ...newAuction, image: e.target.files[0] })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
