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
      return new Response(
        JSON.stringify(activeAuctions || []), // Assurez-vous que c'est un tableau
        { status: 200 }
      );
    }

    // Récupérer une enchère spécifique avec les bids
    if (id) {
      const auction = await prisma.auction.findUnique({
        where: { id: String(id) },
        include: {
          bids: {
            orderBy: { lastBid: "desc" }, // Trier les bids par montant décroissant
            include: {
              user: true, // Inclure les informations utilisateur pour chaque bid
            },
          },
        },
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
    console.error("Erreur lors de la récupération de l'enchère :", error);
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
    console.log("Body reçu pour PUT:", body);

    const auction = await prisma.auction.findUnique({
      where: { id: String(body.auctionId) },
    });

    if (!auction) {
      return new Response(
        JSON.stringify({ error: "Enchère non trouvée" }),
        { status: 404 }
      );
    }

    const updatedAuction = await prisma.auction.update({
      where: { id: String(body.auctionId) },
      data: {
        title: body.title,
        description: body.description,
        startPrice: body.startPrice,
        minIncr: body.minIncr,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
      },
    });

    return new Response(JSON.stringify(updatedAuction), { status: 200 });
  } catch (error) {
    console.error("Erreur dans la route PUT:", error);
    return new Response(
      JSON.stringify({
        error: "Erreur lors de la modification de l'enchère",
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { auctionId } = body;

    const auction = await prisma.auction.findUnique({
      where: { id: auctionId },
    });

    if (!auction) {
      return new Response(
        JSON.stringify({ error: "Enchère non trouvée" }),
        { status: 404 }
      );
    }

    await prisma.auction.delete({
      where: { id: auctionId },
    });

    return new Response(
      JSON.stringify({ message: "Enchère supprimée avec succès" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression de l'enchère :", error);
    return new Response(
      JSON.stringify({ error: "Erreur lors de la suppression de l'enchère" }),
      { status: 500 }
    );
  }
}

