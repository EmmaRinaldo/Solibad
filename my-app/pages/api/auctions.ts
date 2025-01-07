import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { id } = req.query;
        if (id) {
            try {
                const auction = await prisma.auction.findUnique({
                    where: { id: String(id) }
                });
                if (auction) {
                    res.status(200).json(auction);
                } else {
                    res.status(404).json({ error: 'Enchère non trouvée' });
                }
            } catch (error) {
                res.status(500).json({ error: 'Erreur lors de la récupération de l\'enchère' });
            }
        } else {
            try {
                const auctions = await prisma.auction.findMany();
                res.status(200).json(auctions);
            } catch (error) {
                res.status(500).json({ error: 'Erreur lors de la récupération des enchères' });
            }
        }
    } else if (req.method === 'POST') {
        // const session = await getSession({ req });
        // if (!session) {
        //     res.status(401).json({ error: 'Non authentifié' });
        //     return;
        // }
        try {
            const newAuction = await prisma.auction.create({
                data: {
                    title: req.body.title,
                    description: req.body.description,
                    startPrice: req.body.startPrice,
                    minIncr: req.body.minIncr
                }
            });
            res.status(201).json(newAuction);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la création de l\'enchère' });
        }
    } 

    // temp method
    else if (req.method === 'PUT') {
        // const session = await getSession({ req });
        // if (!session) {
        //     res.status(401).json({ error: 'Non authentifié' });
        //     return;
        // }

        const { auctionId, newBid } = req.body;

        try {
            const auction = await prisma.auction.findUnique({
                where: { id: auctionId },
            });

            if (!auction) {
                res.status(404).json({ error: 'Enchère non trouvée' });
                return;
            }

            if (newBid <= auction.ActualBid) {
                res.status(400).json({ error: 'La nouvelle enchère doit être supérieure à l\'enchère actuelle' });
                return;
            }

            const updatedAuction = await prisma.auction.update({
                where: { id: auctionId },
                data: { ActualBid: newBid },
            });

            res.status(200).json(updatedAuction);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'enchère' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        res.status(405).end(`Méthode ${req.method} non autorisée`);
    }
}
