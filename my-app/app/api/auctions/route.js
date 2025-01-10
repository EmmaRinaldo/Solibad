import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fonction pour gérer les requêtes GET
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type");

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

    if (id) {
      // Récupérer une enchère spécifique avec ses offres associées
      const auction = await prisma.auction.findUnique({
        where: { id: String(id) },
        include: { bids: true }, // Inclure les offres liées
      });
      if (auction) {
        return new Response(JSON.stringify(auction), { status: 200 });
      } else {
        return new Response(
          JSON.stringify({ error: "Enchère non trouvée" }),
          { status: 404 }
        );
      }
    }

    // Récupérer toutes les enchères
    const auctions = await prisma.auction.findMany({
      orderBy: { startDate: "asc" },
    });
    return new Response(JSON.stringify(auctions), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'enchère:", error);
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
        images: body.images || [], // Assurez-vous que `images` est un tableau
      },
    });
    return new Response(JSON.stringify(newAuction), { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'enchère:", error);
    return new Response(
      JSON.stringify({ error: "Erreur lors de la création de l'enchère" }),
      { status: 500 }
    );
  }
}

// Fonction pour gérer les requêtes PUT
export async function PUT(req) {
  try {
    const body = await req.json();
    const auction = await prisma.auction.findUnique({
      where: { id: String(body.auctionId) },
    });
    if (!auction) {
      return new Response(
        JSON.stringify({ error: "Enchère non trouvée" }),
        { status: 404 }
      );
    }

    const bid = await prisma.bid.findFirst({
      where: {
        auctionId: String(body.auctionId),
        lastBid: auction.ActualBid,
      },
    });

    if (!bid) {
      return new Response(
        JSON.stringify({ error: "Aucune offre trouvée pour cette enchère" }),
        { status: 404 }
      );
    }

    const winner = await prisma.user.findUnique({
      where: { id: bid.userId },
    });

    if (!winner) {
      return new Response(
        JSON.stringify({ error: "Utilisateur gagnant non trouvé" }),
        { status: 404 }
      );
    }

    const updatedAuction = await prisma.auction.update({
      where: { id: String(body.auctionId) },
      data: {
        winnerId: winner.id,
        FinishedBid: auction.ActualBid,
      },
    });

    return new Response(JSON.stringify(updatedAuction), { status: 200 });
  } catch (error) {
    console.error(
      "Erreur lors de la détermination du gagnant de l'enchère:",
      error
    );
    return new Response(
      JSON.stringify({
        error: "Erreur lors de la détermination du gagnant de l'enchère",
      }),
      { status: 500 }
    );
  }
}
