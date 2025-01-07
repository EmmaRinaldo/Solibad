import { Router } from 'express';
import BidController from '../controllers/bidController';

const router = Router();
const bidController = new BidController();

const setBidRoutes = (app) => {
  router.post('/', bidController.createBid);
  router.get('/:id', bidController.getBid);
  router.put('/:id', bidController.updateBid);
  router.delete('/:id', bidController.deleteBid);

  app.use('/api/bids', router);
};

export default setBidRoutes;