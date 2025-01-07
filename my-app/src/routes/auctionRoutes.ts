import { Router, Express } from 'express';
import AuctionController from '../controllers/auctionController';

const router = Router();
const auctionController = new AuctionController();

const setAuctionRoutes = (app: Express) => {
  app.use('/api/auctions', router);

  router.post('/', auctionController.createAuction);
  router.get('/:id', auctionController.getAuction);
  router.put('/:id', auctionController.updateAuction);
  router.delete('/:id', auctionController.deleteAuction);
};

export default setAuctionRoutes;