import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // const session = await getSession({ req });
        // if (!session) {
        //     res.status(401).json({ error: 'Non authentifié' });
        //     return;
        // }

        const { userId, auctionId, bidAmount } = req.body;

        try {
            const auction = await prisma.auction.findUnique({
                where: { id: auctionId },
            });

            if (!auction) {
                res.status(404).json({ error: 'Enchère non trouvée' });
                return;
            }

            if (bidAmount <= auction.ActualBid) {
                res.status(400).json({ error: 'La nouvelle enchère doit être supérieure à l\'enchère actuelle' });
                return;
            } else if (bidAmount < auction.ActualBid + auction.minIncr) {
                res.status(400).json({ error: 'La nouvelle enchère doit être supérieure à l\'enchère actuelle plus l\'incrément minimal' });
                return;
            }

            const existingBid = await prisma.bid.findFirst({
                where: {
                    userId: userId,
                    auctionId: auctionId,
                },
            });

            console.log(existingBid)
            let newBid;
            if (existingBid) {
                newBid = await prisma.bid.update({
                    where: { id: existingBid.id },
                    data: {
                        lastBid: bidAmount
                    },
                });
            } else {
                console.log(userId, auctionId, bidAmount)
                newBid = await prisma.bid.create({
                    data: {
                        userId: userId,
                        auctionId: auctionId,
                        lastBid: bidAmount
                    },
                });
                console.log(newBid)
            }

            console.log(newBid)
            const updatedAuction = await prisma.auction.update({
                where: { id: auctionId },
                data: { ActualBid: bidAmount },
            });

            res.status(201).json({ newBid, updatedAuction });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la création de la surenchère' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Méthode ${req.method} non autorisée`);
    }
}