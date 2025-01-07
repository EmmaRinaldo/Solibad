import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

export default class AuctionController {
    async createAuction(req: Request, res: Response) {
      // Logique pour créer une enchère

      console.log('hello ?');
    const prisma = new PrismaClient();
    const newAuction = req.body;
    try {
      const createdAuction = await prisma.auction.create({
        data: newAuction,
      });
      res.status(201).json(createdAuction);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create auction' });
    }
    res.status(201).json(newAuction);
  }

  async getAuction(req: Request, res: Response) {
    // Logique pour récupérer une enchère par ID

    const prisma = new PrismaClient();
    const auctionId = parseInt(req.params.id);

    try {
      console.log(auctionId);
      const auction = await prisma.auction.findUnique({
        where: { id: auctionId.toString() },
      });
      if (!auction) {
        res.status(404).json({ error: 'Auction not found' });
      } else {
        res.status(200).json(auction);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to get auction' });
    }

    res.status(200).json({ id: auctionId });
  }

  async updateAuction(req: Request, res: Response) {
    // Logique pour mettre à jour une enchère par ID
  }

  async deleteAuction(req: Request, res: Response) {
    // Logique pour supprimer une enchère par ID
  }
}
