"use client";

import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // if (!session || session.user.role !== "admin") {
  //   return <p>You are not authorized to view this page.</p>;
  // }
  
   return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome, Admin!</h1>
      {/* <p className="mb-6">You are logged in as {session.user.email}.</p> */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md" method="POST">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input type="text" id="title" name="title" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea id="description" name="description" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="startPrice" className="block text-sm font-medium text-gray-700">Start Price:</label>
          <input type="number" id="startPrice" name="startPrice" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="minIncr" className="block text-sm font-medium text-gray-700">Minimum Increment:</label>
          <input type="number" id="minIncr" name="minIncr" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create Auction</button>
      </form>
    </div>
  );

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());
    
    // conversion des valeurs en nombres décimaux
    body.startPrice = parseFloat(body.startPrice);
    body.minIncr = parseFloat(body.minIncr);

    const response = await fetch("/api/auctions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      form.reset();
      alert("Auction created successfully!");
    } else {
      alert("An error occurred while creating the auction.");
    }
  }
}
