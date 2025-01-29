//app/api/bids/route.js

import { PrismaClient } from '@prisma/client';
import { differenceInSeconds } from 'date-fns';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const auction = await prisma.auction.findUnique({
        where: { id: String(id) },
        include: { bids: true }
      });
      if (!auction) {
        return new Response(JSON.stringify({ error: 'Enchère non trouvée' }), { status: 404 });
      }

      if (auction.bids.length === 0) {
        return new Response(JSON.stringify({ error: 'Aucune surenchère trouvée' }), { status: 200 });
      }

      return new Response(JSON.stringify(auction.bids), { status: 200 });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'enchère:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération de l\'enchère' }), { status: 500 });
  }
}

// Fonction pour gérer les requêtes POST pour les enchères (bids)
export async function POST(req) {
    try {
        const body = await req.json();
        const { userId, auctionId, bidAmount } = body;

        const auction = await prisma.auction.findUnique({
            where: { id: auctionId },
        });

        if (!auction) {
            return new Response(JSON.stringify({ error: 'Enchère non trouvée' }), { status: 404 });
        }

        if (bidAmount < auction.ActualBid + auction.minIncr) {
            return new Response(JSON.stringify({ error: `La nouvelle enchère doit être supérieure de ${auction.minIncr} au prix actuel` }), { status: 400 });
        }

        if (differenceInSeconds(new Date(), auction.endDate) < 0) {
          const existingBid = await prisma.bid.findFirst({
              where: {
                  userId: userId,
                  auctionId: auctionId
              },
            });
          
          let newBid;
          if (existingBid) {
            newBid = await prisma.bid.update({
                where: { id: existingBid.id },
                data: {
                  lastBid: bidAmount,
                  bidedAt: new Date(),
                },
            });
        } else {
            newBid = await prisma.bid.create({
                data: {
                    userId: userId,
                    auctionId: auctionId,
                    lastBid: bidAmount,
                    bidedAt: new Date()
                },
            });
        }

          const updatedAuction = await prisma.auction.update({
              where: { id: auctionId },
              data: { ActualBid: bidAmount },
          });

          return new Response(JSON.stringify({ newBid, updatedAuction }), { status: 201 });
        }

        if (0 < differenceInSeconds(new Date(), auction.endDate) <= 300) {
          const existingBid = await prisma.bid.findFirst({
            where: {
                userId: userId,
                auctionId: auctionId,
                lastBid: auction.bidAmount
            },
          });
        
        let newBid;
        if (existingBid) {
          newBid = await prisma.bid.update({
              where: { id: existingBid.id },
              data: {
                lastBid: bidAmount,
                bidedAt: new Date(),
              },
          });
      } else {
          newBid = await prisma.bid.create({
              data: {
                  userId: userId,
                  auctionId: auctionId,
                  lastBid: bidAmount,
                  bidedAt: (new Date() - new Date().getTimezoneOffset() * 6000)
              },
          });
      }

        const updatedAuction = await prisma.auction.update({
            where: { id: auctionId },
            data: { ActualBid: bidAmount ,endDate: new Date() },
        });
        return new Response(JSON.stringify({ newBid, updatedAuction }), { status: 201 });
        }

        if (differenceInSeconds(new Date(), auction.endDate) > 300) {
          return new Response(JSON.stringify({ error: `l'enchère est finie` }), { status: 400 });
        }

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Erreur lors de la surenchère' }), { status: 500 });
    }
}