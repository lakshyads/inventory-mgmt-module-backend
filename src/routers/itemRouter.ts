import express from 'express';
const itemRouter = express.Router();
import * as itemController from '../controllers/itemConroller'; 
import requireLogin from '../utils/middlewares/requireLogin'; 

itemRouter.use('/api/items', requireLogin);

itemRouter.route('/api/items')
    .get(itemController.findAll)
    .post(itemController.create);

itemRouter.route('/api/items/search')
    .post(itemController.searchItems);

itemRouter.route('/api/items/:assetId')
    .get(itemController.findOne)
    .put(itemController.update)
    .delete(itemController.remove);

// Exports ----------------------------------------------
export default itemRouter;



