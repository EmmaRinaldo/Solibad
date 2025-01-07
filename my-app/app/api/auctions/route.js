import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fonction pour gérer les requêtes GET
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
        try {
            const auction = await prisma.auction.findUnique({
                where: { id: String(id) }
            });
            if (auction) {
                return new Response(JSON.stringify(auction), { status: 200 });
            } else {
                return new Response(JSON.stringify({ error: 'Enchère non trouvée' }), { status: 404 });
            }
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Erreur lors de la récupération de l\'enchère' }), { status: 500 });
        }
    } else {
        try {
            const auctions = await prisma.auction.findMany();
            return new Response(JSON.stringify(auctions), { status: 200 });
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des enchères' }), { status: 500 });
        }
    }
}

// Fonction pour gérer les requêtes POST
export async function POST(req) {
    // const session = await getSession({ req });
    // if (!session) {
    //     return new Response(JSON.stringify({ error: 'Non authentifié' }), { status: 401 });
    // }

    try {
        const body = await req.json();
        const newAuction = await prisma.auction.create({
            data: {
                title: body.title,
                description: body.description,
                startPrice: body.startPrice,
                minIncr: body.minIncr
            }
        });
        return new Response(JSON.stringify(newAuction), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Erreur lors de la création de l\'enchère' }), { status: 500 });
    }
}

// Fonction pour gérer les requêtes PUT
export async function PUT(req) {
    // const session = await getSession({ req });
    // if (!session) {
    //     return new Response(JSON.stringify({ error: 'Non authentifié' }), { status: 401 });
    // }

    try {
        const body = await req.json();
        const { auctionId, newBid } = body;

        const auction = await prisma.auction.findUnique({
            where: { id: auctionId },
        });

        if (!auction) {
            return new Response(JSON.stringify({ error: 'Enchère non trouvée' }), { status: 404 });
        }

        if (newBid <= auction.ActualBid) {
            return new Response(JSON.stringify({ error: 'La nouvelle enchère doit être supérieure à l\'enchère actuelle' }), { status: 400 });
        }

        const updatedAuction = await prisma.auction.update({
            where: { id: auctionId },
            data: { ActualBid: newBid },
        });

        return new Response(JSON.stringify(updatedAuction), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Erreur lors de la mise à jour de l\'enchère' }), { status: 500 });
    }
}
