import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { NextApiRequest, NextApiResponse } from 'next';

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
    } else {
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
}
