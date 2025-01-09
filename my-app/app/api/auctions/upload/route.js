//app/api/auctions/upload/route.js

import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Configurer Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Fonction POST pour uploader les images
export async function POST(req) {
  try {
    const formData = await req.formData();
    const auctionId = formData.get("auctionId");
    const imageFile = formData.get("image"); // L'image envoyée depuis le frontend

    if (!auctionId || !imageFile) {
      return new Response(
        JSON.stringify({ error: "ID de l'enchère ou image manquants" }),
        { status: 400 }
      );
    }

    // Upload de l'image vers Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(imageFile, {
      folder: "auctions", // Dossier dans Cloudinary
    });

    // Enregistrer l'URL de l'image dans la base de données
    const updatedAuction = await prisma.auction.update({
      where: { id: auctionId },
      data: {
        images: { push: uploadedImage.secure_url }, // Ajoute l'URL à la liste d'images
      },
    });

    return new Response(JSON.stringify(updatedAuction), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image :", error);
    return new Response(
      JSON.stringify({ error: "Erreur lors de l'upload de l'image" }),
      { status: 500 }
    );
  }
}
