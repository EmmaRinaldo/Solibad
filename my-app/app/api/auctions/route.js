import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fonction pour gérer les requêtes GET
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (id) {
            const auction = await prisma.auction.findUnique({
                where: { id: String(id) },
                include: { bids: true }
            });
            if (auction) {
                return new Response(JSON.stringify({auction, bids: auction.bids}), { status: 200 });
            } else {
                return new Response(JSON.stringify({ error: 'Enchère non trouvée' }), { status: 404 });
            }
        } else {
            const auctions = await prisma.auction.findMany();
            return new Response(JSON.stringify(auctions), { status: 200 });
        }
    } catch (error) {
        // console.error('Erreur lors de la récupération de l\'enchère:', error);
        return new Response(JSON.stringify({ error: 'Erreur lors de la récupération de l\'enchère' }), { status: 500 });
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