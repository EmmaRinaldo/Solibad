//app/api/auctions/route.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET toutes les enchères
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (id) {
      // Récupérer une enchère spécifique par son ID
      const auction = await prisma.auction.findUnique({
        where: { id },
      });

      if (!auction) {
        return new Response(
          JSON.stringify({ error: "Enchère non trouvée" }),
          { status: 404 }
        );
      }

      return new Response(JSON.stringify(auction), { status: 200 });
    }

    if (type === "active") {
      // Récupérer uniquement les enchères actives
      const now = new Date();
      const activeAuctions = await prisma.auction.findMany({
        where: {
          startDate: { lte: now },
          endDate: { gte: now },
        },
        orderBy: { startDate: "asc" },
      });
      return new Response(JSON.stringify(activeAuctions), { status: 200 });
    }

    // Récupérer toutes les enchères
    const auctions = await prisma.auction.findMany({
      orderBy: { startDate: "asc" },
    });
    return new Response(JSON.stringify(auctions), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erreur lors de la récupération des enchères" }),
      { status: 500 }
    );
  }
}

// Fonction pour gérer les requêtes POST
export async function POST(req) {
    
  try {
      const body = await req.json();
      const newAuction = await prisma.auction.create({
          data: {
          title: body.title,
          description: body.description,
          startPrice: body.startPrice,
          minIncr: body.minIncr,
          startDate: new Date(body.startDate),
          endDate: new Date(body.endDate),
          ActualBid: body.startPrice,
          images: body.images,
          }
      });
      return new Response(JSON.stringify(newAuction), { status: 201 });
  } catch (error) {
      return new Response(JSON.stringify({ error: 'Erreur lors de la création de l\'enchère' }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
      const body = await req.json();
      const auction = await prisma.auction.findUnique({
          where: { id: body.auctionId }
      });
      if (!auction) {
          return new Response(JSON.stringify({ error: 'Enchère non trouvée' }), { status: 404 });
      }

      const bid = await prisma.bid.findFirst({
          where: {
              auctionId: body.auctionId, lastBid: auction.ActualBid
          }
      });

      const winner = await prisma.user.findUnique({
          where: { id: bid.userId }
      });

      await prisma.auction.update({
          where: { id: body.auctionId },
          data: {
              winnerId: winner.id,
              FinishedBid: auction.ActualBid
          }
      });

      return new Response(JSON.stringify({ winner }), { status: 200 });
  } catch (error) {
      return new Response(JSON.stringify({ error: 'Erreur lors de la détermination du gagnant de l\'enchère' }), { status: 500 });
  }
}