//app/admin-dashboard/page.jsx

"use client";

import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

export default function AdminDashboard() {
  const [auctions, setAuctions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingAuction, setEditingAuction] = useState(null);

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

  // Soumission du formulaire
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());

    body.startPrice = parseFloat(body.startPrice);
    body.minIncr = parseFloat(body.minIncr);
    body.startDate = body.startDate ? new Date(body.startDate) : null;
    body.endDate = body.endDate ? new Date(body.endDate) : null;

    console.log("Données envoyées:", body);

    try {
      const method = editingAuction ? "PUT" : "POST";
      const url = editingAuction ? `/api/auctions` : "/api/auctions";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          auctionId: editingAuction?.id,
        }),
      });

      if (response.ok) {
        const updatedAuction = await response.json();
        if (editingAuction) {
          setAuctions((prev) =>
            prev.map((auction) =>
              auction.id === updatedAuction.id ? updatedAuction : auction
            )
          );
        } else {
          setAuctions((prev) => [...prev, updatedAuction]);
        }
        setShowPopup(false);
        setEditingAuction(null);
      } else {
        const errorData = await response.json();
        console.error("Erreur côté serveur:", errorData);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  }

  // Fonction pour gérer la suppression d'une enchère
  async function handleDelete(auctionId) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette enchère ?")) {
      try {
        const response = await fetch(`/api/auctions`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ auctionId }),
        });

        if (response.ok) {
          setAuctions((prev) => prev.filter((auction) => auction.id !== auctionId));
          alert("Enchère supprimée avec succès !");
        } else {
          const errorData = await response.json();
          console.error("Erreur côté serveur :", errorData);
          alert("Une erreur est survenue lors de la suppression.");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  }


  // Gestion de la modification d'une enchère
  function handleEdit(auction) {
    setEditingAuction(auction);
    setShowPopup(true);
  }

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold text-center ">
            Tableau de Bord Administrateur
          </h1>
          <button
            onClick={() => signOut({ callbackUrl: "/admin-login" })}
            className="text-gray-600 hover:text-gray-900 pl-3"
            title="Se déconnecter"
          >
            <LogOut className="h-6 w-6" />
          </button>
        </div>

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
                <td className="px-4 py-2">{auction.startPrice} €</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(auction)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
                  >
                    Modifier
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition ml-2"
                    onClick={() => handleDelete(auction.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup pour créer/modifier une enchère */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">
              {editingAuction ? "Modifier" : "Créer"} une Enchère
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title">Titre</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full p-2 border rounded"
                  required
                  defaultValue={editingAuction?.title || ""}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full p-2 border rounded"
                  required
                  defaultValue={editingAuction?.description || ""}
                />
              </div>
              <div>
                <label htmlFor="startPrice">Prix de départ</label>
                <input
                  type="number"
                  id="startPrice"
                  name="startPrice"
                  className="w-full p-2 border rounded"
                  required
                  defaultValue={editingAuction?.startPrice || ""}
                />
              </div>
              <div>
                <label htmlFor="minIncr">Incrémentation minimale</label>
                <input
                  type="number"
                  id="minIncr"
                  name="minIncr"
                  className="w-full p-2 border rounded"
                  required
                  defaultValue={editingAuction?.minIncr || ""}
                />
              </div>
              <div>
                <label htmlFor="startDate">Date de début</label>
                <input
                  type="datetime-local"
                  id="startDate"
                  name="startDate"
                  className="w-full p-2 border rounded"
                  required
                  defaultValue={
                    editingAuction?.startDate
                      ? new Date(editingAuction.startDate)
                        .toISOString()
                        .slice(0, 16)
                      : ""
                  }
                />
              </div>
              <div>
                <label htmlFor="endDate">Date de fin</label>
                <input
                  type="datetime-local"
                  id="endDate"
                  name="endDate"
                  className="w-full p-2 border rounded"
                  required
                  defaultValue={
                    editingAuction?.endDate
                      ? new Date(editingAuction.endDate).toISOString().slice(0, 16)
                      : ""
                  }
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPopup(false);
                    setEditingAuction(null);
                  }}
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
    </>
  );
}
